import { scenarios } from '@/data/scenarios'
import PracticeClient from './PracticeClient'

// Generate static params for all scenarios
export function generateStaticParams() {
  return scenarios.map((scenario) => ({
    scenarioId: scenario.id,
  }))
}

export default function PracticePage({ params }: { params: { scenarioId: string } }) {
  return <PracticeClient scenarioId={params.scenarioId} />
}
