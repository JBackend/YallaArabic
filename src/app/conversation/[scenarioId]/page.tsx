import { scenarios } from '@/data/scenarios'
import ConversationClient from './ConversationClient'

// Generate static params for all scenarios
export function generateStaticParams() {
  return scenarios.map((scenario) => ({
    scenarioId: scenario.id,
  }))
}

export default function ConversationPage({ params }: { params: { scenarioId: string } }) {
  return <ConversationClient scenarioId={params.scenarioId} />
}
