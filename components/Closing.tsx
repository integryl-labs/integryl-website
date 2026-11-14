import type { ReactNode } from "react";

type ClosingProps = {
  label: string;
  title: string;
  body?: string;
  /** Draw a hairline above when the section follows another navy section. */
  rule?: boolean;
  children: ReactNode;
};

/** The navy closing call to action at the foot of a page. */
export function Closing({ label, title, body, rule, children }: ClosingProps) {
  return (
    <section className={`closing on-dark${rule ? " closing--rule" : ""}`}>
      <div className="wrap closing-inner">
        <p className="label">{label}</p>
        <h2>{title}</h2>
        {body ? <p className="lede muted-on-dark">{body}</p> : null}
        <div className="btn-row">{children}</div>
      </div>
    </section>
  );
}
