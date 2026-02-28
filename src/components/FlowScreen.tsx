import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type FlowStatusItem = {
  label: string;
  value: string;
};

type FlowScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  highlights: string[];
  backLabel?: string;
  children?: ReactNode;
  statusItems?: FlowStatusItem[];
};

const DEFAULT_STATUS_ITEMS: FlowStatusItem[] = [
  { label: "Home", value: "Ativa" },
  { label: "Rotas base", value: "Prontas" },
  { label: "Mapa hexagonal", value: "Proximo" },
];

export function FlowScreen({
  backLabel = "Voltar ao inicio",
  children,
  description,
  detail,
  eyebrow,
  highlights,
  statusItems = DEFAULT_STATUS_ITEMS,
  title,
}: FlowScreenProps) {
  return (
    <div className="screen-shell">
      <div className="screen-shell__blur screen-shell__blur--left" />
      <div className="screen-shell__blur screen-shell__blur--right" />

      <main className="route-layout">
        <section className="route-card">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="route-card__title">{title}</h1>
          <p className="route-card__description">{description}</p>

          <div className="route-card__highlights">
            {highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>

          {children}

          <div className="route-actions">
            <Link className="nav-link-button nav-link-button--primary" to="/">
              {backLabel}
            </Link>
          </div>
        </section>

        <aside className="route-aside" aria-label="Status da estrutura">
          <p className="eyebrow">Estrutura Inicial</p>
          <h2 className="route-aside__title">Fluxo desacoplado da home</h2>
          <p className="route-aside__description">{detail}</p>

          <div className="route-list">
            {statusItems.map((statusItem) => (
              <div className="route-list__item" key={`${statusItem.label}-${statusItem.value}`}>
                <span>{statusItem.label}</span>
                <span className="pill">{statusItem.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
