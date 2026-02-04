'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import type { AudioState } from '@/types'

interface UseAudioReturn extends AudioState {
  play: () => Promise<void>
  stop: () => void
}

export function useAudio(audioFile: string): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(`/audio/${audioFile}`)
    audioRef.current = audio

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setError('Audio unavailable')
      setIsLoading(false)
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplaythrough', handleCanPlay)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.pause()
      audioRef.current = null
    }
  }, [audioFile])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      setIsLoading(true)
      setError(null)

      // Reset to beginning if already played
      audio.currentTime = 0

      await audio.play()
      setIsPlaying(true)
      setIsLoading(false)
    } catch (err) {
      setError('Audio unavailable')
      setIsLoading(false)
      setIsPlaying(false)
    }
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
  }, [])

  return {
    isPlaying,
    isLoading,
    error,
    play,
    stop,
  }
}
