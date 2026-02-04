// Core domain types for Gulf Arabic Basics

/**
 * A phrase in Gulf Arabic with translations and audio
 */
export interface Phrase {
  id: string
  arabic: string
  transliteration: string
  meaning: string
  audioFile: string
}

/**
 * A step in a dialogue/conversation practice
 */
export interface DialogueStep {
  id: string
  speaker: 'user' | 'local'
  phraseId: string
  prompt: string
}

/**
 * A learning scenario containing phrases and dialogue
 */
export interface Scenario {
  id: string
  title: string
  description: string
  icon: string
  phrases: Phrase[]
  dialogue: DialogueStep[]
}

/**
 * User's learning progress (persisted to localStorage)
 */
export interface UserProgress {
  completedScenarios: string[]
  currentScenario: string | null
  currentPhraseIndex: number
  lastActiveAt: number
  learnedPhrases: Record<string, string[]>
}

/**
 * User preferences (persisted to localStorage)
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
}

/**
 * Audio playback state
 */
export interface AudioState {
  isPlaying: boolean
  isLoading: boolean
  error: string | null
}

/**
 * Tally popup options
 */
export interface TallyPopupOptions {
  layout?: 'default' | 'modal'
  width?: number
  emoji?: {
    text: string
    animation: 'none' | 'wave' | 'tada' | 'heart-beat' | 'spin' | 'flash' | 'bounce' | 'rubber-band' | 'head-shake'
  }
  autoClose?: number
  hiddenFields?: Record<string, string>
  onOpen?: () => void
  onClose?: () => void
  onSubmit?: (payload: unknown) => void
}

/**
 * Global Tally object (loaded via external script)
 */
declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: TallyPopupOptions) => void
      closePopup: (formId: string) => void
    }
  }
}
