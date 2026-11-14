/* eslint-disable @next/next/no-img-element -- brand SVG, served as-is */

/** The diagonal band geometry from the Intelligence covers. Decorative. */
export function Bands() {
  return (
    <div className="bands" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

type CoverProps = {
  series: string;
  eyebrow: string;
  title: string;
  deck: string;
  foot: string;
  /** Use the smaller title size for long titles. */
  long?: boolean;
};

/**
 * A publication cover drawn in CSS so the title stays live text.
 * It is illustrative: the surrounding card carries the accessible content.
 */
export function Cover({ series, eyebrow, title, deck, foot, long }: CoverProps) {
  return (
    <div className="cover" aria-hidden="true">
      <div className="cover-top">
        <img src="/img/header-logo-light-background.svg" alt="" />
        <span className="cover-series">{series}</span>
      </div>
      <p className="cover-eyebrow">{eyebrow}</p>
      <p className={`cover-title${long ? " cover-title--long" : ""}`}>{title}</p>
      <p className="cover-deck">{deck}</p>
      <Bands />
      <div className="cover-foot">
        <span>Integryl Intelligence</span>
        <span>{foot}</span>
      </div>
    </div>
  );
}
