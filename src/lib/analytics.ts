// Google Analytics 4 event tracking

type GTagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

// Extend window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Track custom events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Predefined events for the app
export const trackEvents = {
  // Home page
  scenarioLearnClick: (scenarioId: string) => {
    event({ action: 'learn_start', category: 'engagement', label: scenarioId })
  },
  scenarioConversationClick: (scenarioId: string) => {
    event({ action: 'conversation_start', category: 'engagement', label: scenarioId })
  },

  // Learn mode
  phraseViewed: (scenarioId: string, phraseIndex: number, totalPhrases: number) => {
    event({
      action: 'phrase_viewed',
      category: 'learn',
      label: `${scenarioId}:${phraseIndex + 1}/${totalPhrases}`,
      value: phraseIndex + 1
    })
  },
  learnCompleted: (scenarioId: string) => {
    event({ action: 'learn_completed', category: 'learn', label: scenarioId })
  },

  // Conversation mode
  dialogueStepRevealed: (scenarioId: string, stepIndex: number, totalSteps: number) => {
    event({
      action: 'dialogue_revealed',
      category: 'conversation',
      label: `${scenarioId}:${stepIndex + 1}/${totalSteps}`,
      value: stepIndex + 1
    })
  },
  conversationCompleted: (scenarioId: string) => {
    event({ action: 'conversation_completed', category: 'conversation', label: scenarioId })
  },

  // Audio
  audioPlayed: (phraseId: string) => {
    event({ action: 'audio_played', category: 'audio', label: phraseId })
  },
  audioError: (phraseId: string) => {
    event({ action: 'audio_error', category: 'audio', label: phraseId })
  },
}
