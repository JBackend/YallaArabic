import { scenarios } from '@/data/scenarios'
import LearnClient from './LearnClient'

// Generate static params for all scenarios
export function generateStaticParams() {
  return scenarios.map((scenario) => ({
    scenarioId: scenario.id,
  }))
}

export default function LearnPage({ params }: { params: { scenarioId: string } }) {
  return <LearnClient scenarioId={params.scenarioId} />
}
