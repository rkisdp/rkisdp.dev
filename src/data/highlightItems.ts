export interface HighlightItem {
  title: string;
  description: string;
  delay: string;
}

export const highlightItems: HighlightItem[] = [
  {
    title: "Architecture Patterns",
    description:
      "Event-driven systems, microservices, workflow orchestration, sagas, eventual consistency patterns, multi-tenant isolation, and data partitioning strategies.",
    delay: "100ms",
  },
  {
    title: "Reliability Engineering",
    description:
      "Idempotency, deduplication, ordering controls, DLQ/replay, backpressure handling, rate limiting, circuit breakers, timeout strategies, and graceful degradation.",
    delay: "250ms",
  },
  {
    title: "Data Engineering",
    description:
      "Database optimization, schema migrations, bulk load strategies, reconciliation patterns, caching layers, materialized views, and data consistency verification.",
    delay: "400ms",
  },
  {
    title: "Cloud & Operations",
    description:
      "Observability (metrics, logs, traces), cost optimization, infrastructure as code, scheduled scaling, AWS serverless patterns, container orchestration, and incident response.",
    delay: "550ms",
  },
]; 