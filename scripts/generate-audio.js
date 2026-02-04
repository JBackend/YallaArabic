#!/usr/bin/env node
/**
 * Generate Arabic audio files using ElevenLabs API
 *
 * Usage:
 *   ELEVENLABS_API_KEY=your_key node scripts/generate-audio.js
 *
 * Or add ELEVENLABS_API_KEY to your .env file and run:
 *   node -r dotenv/config scripts/generate-audio.js
 */

const fs = require('fs')
const path = require('path')

// Load .env file
const dotenv = require('dotenv')
const result = dotenv.config()
if (result.parsed) {
  console.log(`Loaded ${Object.keys(result.parsed).length} env vars from .env`)
}

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1'

// Arabic voice options on ElevenLabs
// Default: "Aria" - good multilingual voice
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pqHfZKP75CvOlQylNhV4'

// Audio settings
const MODEL_ID = 'eleven_multilingual_v2' // Best for non-English
const OUTPUT_FORMAT = 'mp3_44100_128' // MP3, 44.1kHz, 128kbps

// All phrases from the app (extracted from scenarios.ts)
const ALL_PHRASES = [
  // Greetings & Small Talk
  { arabic: 'السلام عليكم', audioFile: 'as-salamu-alaykum.mp3' },
  { arabic: 'وعليكم السلام', audioFile: 'wa-alaykum-as-salam.mp3' },
  { arabic: 'شلونك؟', audioFile: 'shlonak.mp3' },
  { arabic: 'شلونك؟', audioFile: 'shlonik.mp3' },
  { arabic: 'زين، الحمد لله', audioFile: 'zayn-alhamdulillah.mp3' },
  { arabic: 'أنا اسمي', audioFile: 'ana-ismi.mp3' },
  { arabic: 'تشرفنا', audioFile: 'tasharrafna.mp3' },
  { arabic: 'إنت من وين؟', audioFile: 'inta-min-wayn.mp3' },
  { arabic: 'أنا من', audioFile: 'ana-min.mp3' },
  { arabic: 'شنو شغلك؟', audioFile: 'shinu-shughlik.mp3' },
  { arabic: 'والله؟', audioFile: 'wallah.mp3' },
  { arabic: 'ما شاء الله', audioFile: 'mashallah.mp3' },
  { arabic: 'إن شاء الله', audioFile: 'inshallah.mp3' },
  { arabic: 'مع السلامة', audioFile: 'maasalama.mp3' },
  { arabic: 'الله يسلمك', audioFile: 'allah-yisalmak.mp3' },

  // Workplace
  { arabic: 'صباح الخير', audioFile: 'sabah-al-khayr.mp3' },
  { arabic: 'صباح النور', audioFile: 'sabah-an-nur.mp3' },
  { arabic: 'مساء الخير', audioFile: 'masa-al-khayr.mp3' },
  { arabic: 'مساء النور', audioFile: 'masa-an-nur.mp3' },
  { arabic: 'شكراً', audioFile: 'shukran.mp3' },
  { arabic: 'عفواً', audioFile: 'afwan.mp3' },
  { arabic: 'من فضلك', audioFile: 'min-fadlak.mp3' },
  { arabic: 'لو سمحت', audioFile: 'law-samaht.mp3' },
  { arabic: 'ما في مشكلة', audioFile: 'mafi-mushkila.mp3' },
  { arabic: 'تمام', audioFile: 'tamam.mp3' },
  { arabic: 'خلاص', audioFile: 'khalas.mp3' },
  { arabic: 'ممكن؟', audioFile: 'mumkin.mp3' },
  { arabic: 'أكيد', audioFile: 'akeed.mp3' },
  { arabic: 'يلّا', audioFile: 'yallah.mp3' },
  { arabic: 'مبروك', audioFile: 'mabrook.mp3' },

  // Coffee Shop
  { arabic: 'قهوة', audioFile: 'gahwa.mp3' },
  { arabic: 'شاي', audioFile: 'chai.mp3' },
  { arabic: 'شاي كرك', audioFile: 'chai-karak.mp3' },
  { arabic: 'موية', audioFile: 'moya.mp3' },
  { arabic: 'سكر', audioFile: 'sukkar.mp3' },
  { arabic: 'بدون سكر', audioFile: 'bidun-sukkar.mp3' },
  { arabic: 'كم؟', audioFile: 'kam.mp3' },
  { arabic: 'أبغى', audioFile: 'abgha.mp3' },
  { arabic: 'واحد', audioFile: 'wahid.mp3' },
  { arabic: 'تفضّل', audioFile: 'tafaddal.mp3' },

  // Common Expressions
  { arabic: 'حبيبي', audioFile: 'habibi.mp3' },
  { arabic: 'حبيبتي', audioFile: 'habibti.mp3' },
  { arabic: 'زين', audioFile: 'zain.mp3' },
  { arabic: 'مب زين', audioFile: 'mub-zain.mp3' },
  { arabic: 'شنو؟', audioFile: 'shinu.mp3' },
  { arabic: 'ليش؟', audioFile: 'laish.mp3' },
  { arabic: 'وين؟', audioFile: 'wayn.mp3' },
  { arabic: 'متى؟', audioFile: 'mata.mp3' },
  { arabic: 'شوي', audioFile: 'shway.mp3' },
  { arabic: 'وايد', audioFile: 'wayed.mp3' },
  { arabic: 'هلا', audioFile: 'hala.mp3' },
  { arabic: 'أهلاً', audioFile: 'ahlan.mp3' },
  { arabic: 'الله يعطيك العافية', audioFile: 'allah-yaatik-alaafiya.mp3' },
  { arabic: 'لا', audioFile: 'la.mp3' },
  { arabic: 'إي', audioFile: 'ee.mp3' },
  { arabic: 'نعم', audioFile: 'naam.mp3' },
  { arabic: 'ما أدري', audioFile: 'maa-adri.mp3' },
  { arabic: 'ما أفهم', audioFile: 'maa-afham.mp3' },
  { arabic: 'شوية شوية', audioFile: 'shwaya-shwaya.mp3' },
  { arabic: 'الحمد لله', audioFile: 'alhamdulillah.mp3' },
]

async function getVoices(apiKey) {
  const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
    headers: { 'xi-api-key': apiKey }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch voices: ${response.statusText}`)
  }

  const data = await response.json()
  console.log('\nAvailable voices:')
  console.log('─'.repeat(60))
  data.voices.forEach((voice) => {
    const labels = voice.labels ? Object.entries(voice.labels).map(([k, v]) => `${k}:${v}`).join(', ') : ''
    console.log(`  ${voice.voice_id} - ${voice.name} (${labels})`)
  })
  console.log('─'.repeat(60))
}

async function generateAudio(apiKey, text, outputPath, voiceId = VOICE_ID) {
  const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true
      }
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`ElevenLabs API error: ${response.status} - ${error}`)
  }

  const audioBuffer = await response.arrayBuffer()
  fs.writeFileSync(outputPath, Buffer.from(audioBuffer))
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!apiKey) {
    console.error('Error: ELEVENLABS_API_KEY environment variable is required')
    console.error('')
    console.error('Usage:')
    console.error('  ELEVENLABS_API_KEY=your_key node scripts/generate-audio.js')
    console.error('')
    console.error('Or add to .env file:')
    console.error('  ELEVENLABS_API_KEY=your_key')
    process.exit(1)
  }

  // Check for --list-voices flag
  if (process.argv.includes('--list-voices')) {
    await getVoices(apiKey)
    process.exit(0)
  }

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '..', 'public', 'audio')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Dedupe phrases by audioFile
  const uniquePhrases = new Map()
  ALL_PHRASES.forEach(p => {
    if (!uniquePhrases.has(p.audioFile)) {
      uniquePhrases.set(p.audioFile, p)
    }
  })

  console.log(`\n🎙️  ElevenLabs Audio Generator`)
  console.log(`─`.repeat(50))
  console.log(`Phrases to generate: ${uniquePhrases.size}`)
  console.log(`Output directory: ${outputDir}`)
  console.log(`Voice ID: ${VOICE_ID}`)
  console.log(`Model: ${MODEL_ID}`)
  console.log(`─`.repeat(50))

  let generated = 0
  let skipped = 0
  let failed = 0

  for (const [audioFile, phrase] of uniquePhrases) {
    const outputPath = path.join(outputDir, audioFile)

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping (exists): ${audioFile}`)
      skipped++
      continue
    }

    try {
      process.stdout.write(`🔊 Generating: ${audioFile}...`)
      await generateAudio(apiKey, phrase.arabic, outputPath)
      console.log(' ✅')
      generated++

      // Rate limiting: wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.log(` ❌ ${error.message}`)
      failed++
    }
  }

  console.log(`\n─`.repeat(50))
  console.log(`✅ Generated: ${generated}`)
  console.log(`⏭️  Skipped: ${skipped}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`─`.repeat(50))

  if (failed > 0) {
    console.log('\nSome files failed. Re-run the script to retry.')
  }
}

main().catch(console.error)
