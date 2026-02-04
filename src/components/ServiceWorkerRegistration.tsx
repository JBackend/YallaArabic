'use client'

import { useServiceWorker } from '@/hooks'

export function ServiceWorkerRegistration() {
  useServiceWorker()
  return null
}
