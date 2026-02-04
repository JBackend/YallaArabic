import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserSettings } from '@/types'

interface SettingsStore extends UserSettings {
  // Actions
  setTheme: (theme: UserSettings['theme']) => void
}

const initialState: UserSettings = {
  theme: 'system',
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialState,

      setTheme: (theme: UserSettings['theme']) => {
        set({ theme })
      },
    }),
    {
      name: 'gulf-arabic-settings',
    }
  )
)
