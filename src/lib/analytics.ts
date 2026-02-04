// Google Analytics 4 - Full Product Analytics Implementation

const GA_MEASUREMENT_ID = 'G-VS56S49FNK'

// Extend window for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// ============================================
// VIRTUAL PAGEVIEWS
// ============================================

export const virtualPageview = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title,
    })
  }
}

// ============================================
// CUSTOM EVENTS
// ============================================

type EventParams = Record<string, string | number | boolean | undefined>

export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params)
  }
}

// ============================================
// USER PROPERTIES
// ============================================

export const setUserProperties = (properties: Record<string, string | number | boolean>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('set', 'user_properties', properties)
  }
}

// ============================================
// PREDEFINED TRACKING FUNCTIONS
// ============================================

export const analytics = {
  // ------------------------------------
  // VIRTUAL PAGEVIEWS
  // ------------------------------------

  // Learn mode pages
  learnStart: (scenarioId: string, scenarioTitle: string) => {
    virtualPageview(`/learn/${scenarioId}`, `Learn: ${scenarioTitle}`)
    trackEvent('scenario_start', {
      scenario_id: scenarioId,
      mode: 'learn',
    })
  },

  learnPhrase: (scenarioId: string, phraseIndex: number, totalPhrases: number, phraseId: string) => {
    virtualPageview(
      `/learn/${scenarioId}/phrase/${phraseIndex + 1}`,
      `Phrase ${phraseIndex + 1}/${totalPhrases}`
    )
    trackEvent('phrase_view', {
      scenario_id: scenarioId,
      phrase_id: phraseId,
      phrase_index: phraseIndex + 1,
      total_phrases: totalPhrases,
      progress_pct: Math.round(((phraseIndex + 1) / totalPhrases) * 100),
    })
  },

  learnComplete: (scenarioId: string, totalPhrases: number) => {
    virtualPageview(`/learn/${scenarioId}/complete`, 'Learn Complete')
    trackEvent('scenario_complete', {
      scenario_id: scenarioId,
      mode: 'learn',
      total_phrases: totalPhrases,
    })
  },

  // Conversation mode pages
  conversationStart: (scenarioId: string, scenarioTitle: string) => {
    virtualPageview(`/conversation/${scenarioId}`, `Conversation: ${scenarioTitle}`)
    trackEvent('scenario_start', {
      scenario_id: scenarioId,
      mode: 'conversation',
    })
  },

  conversationStep: (scenarioId: string, stepIndex: number, totalSteps: number, stepId: string) => {
    virtualPageview(
      `/conversation/${scenarioId}/step/${stepIndex + 1}`,
      `Step ${stepIndex + 1}/${totalSteps}`
    )
    trackEvent('dialogue_reveal', {
      scenario_id: scenarioId,
      step_id: stepId,
      step_index: stepIndex + 1,
      total_steps: totalSteps,
      progress_pct: Math.round(((stepIndex + 1) / totalSteps) * 100),
    })
  },

  conversationComplete: (scenarioId: string, totalSteps: number) => {
    virtualPageview(`/conversation/${scenarioId}/complete`, 'Conversation Complete')
    trackEvent('scenario_complete', {
      scenario_id: scenarioId,
      mode: 'conversation',
      total_steps: totalSteps,
    })
  },

  // ------------------------------------
  // AUDIO EVENTS
  // ------------------------------------

  audioPlay: (phraseId: string, scenarioId: string, isReplay: boolean = false) => {
    trackEvent('audio_play', {
      phrase_id: phraseId,
      scenario_id: scenarioId,
      is_replay: isReplay,
    })
  },

  audioComplete: (phraseId: string, durationMs: number) => {
    trackEvent('audio_complete', {
      phrase_id: phraseId,
      duration_ms: durationMs,
    })
  },

  audioError: (phraseId: string, errorType: string) => {
    trackEvent('audio_error', {
      phrase_id: phraseId,
      error_type: errorType,
    })
  },

  // ------------------------------------
  // NAVIGATION / EXIT EVENTS
  // ------------------------------------

  flowExit: (scenarioId: string, mode: 'learn' | 'conversation', exitPoint: number, totalSteps: number) => {
    trackEvent('flow_exit', {
      scenario_id: scenarioId,
      mode,
      exit_point: exitPoint,
      total_steps: totalSteps,
      progress_pct: Math.round((exitPoint / totalSteps) * 100),
    })
  },

  // ------------------------------------
  // USER ENGAGEMENT
  // ------------------------------------

  themeChange: (newTheme: 'light' | 'dark' | 'system') => {
    trackEvent('theme_change', {
      theme: newTheme,
    })
  },

  // ------------------------------------
  // USER PROPERTIES (call on app load)
  // ------------------------------------

  updateUserProperties: (props: {
    scenariosCompleted: number
    totalPhrasesLearned: number
    isPwaUser?: boolean
  }) => {
    setUserProperties({
      scenarios_completed: props.scenariosCompleted,
      total_phrases_learned: props.totalPhrasesLearned,
      is_pwa_user: props.isPwaUser ?? false,
    })
  },
}

// Legacy exports for backward compatibility (will remove after migration)
export const trackEvents = {
  scenarioLearnClick: (scenarioId: string) => {
    trackEvent('learn_start', { scenario_id: scenarioId })
  },
  scenarioConversationClick: (scenarioId: string) => {
    trackEvent('conversation_start', { scenario_id: scenarioId })
  },
  phraseViewed: (scenarioId: string, phraseIndex: number, totalPhrases: number) => {
    trackEvent('phrase_viewed', {
      scenario_id: scenarioId,
      phrase_index: phraseIndex + 1,
      total_phrases: totalPhrases,
    })
  },
  learnCompleted: (scenarioId: string) => {
    trackEvent('learn_completed', { scenario_id: scenarioId })
  },
  dialogueStepRevealed: (scenarioId: string, stepIndex: number, totalSteps: number) => {
    trackEvent('dialogue_revealed', {
      scenario_id: scenarioId,
      step_index: stepIndex + 1,
      total_steps: totalSteps,
    })
  },
  conversationCompleted: (scenarioId: string) => {
    trackEvent('conversation_completed', { scenario_id: scenarioId })
  },
  audioPlayed: (phraseId: string) => {
    trackEvent('audio_played', { phrase_id: phraseId })
  },
  audioError: (phraseId: string) => {
    trackEvent('audio_error', { phrase_id: phraseId })
  },
}
