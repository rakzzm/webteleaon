"use client";

const GooeyFilter = ({ id = "goo-filter", strength = 10 }: { id?: string; strength?: number }) => {
  return (
    <svg className="absolute hidden" aria-hidden="true">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

export function GooeyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <GooeyFilter id="how-it-works-goo" strength={14} />
      <div className="how-gooey-field absolute inset-[-12%]" style={{ filter: "url(#how-it-works-goo)" }}>
        <span className="how-gooey-blob how-gooey-blob-1" />
        <span className="how-gooey-blob how-gooey-blob-2" />
        <span className="how-gooey-blob how-gooey-blob-3" />
        <span className="how-gooey-blob how-gooey-blob-4" />
        <span className="how-gooey-blob how-gooey-blob-5" />
      </div>
    </div>
  );
}
