export type FaqItem = {
  question: string;
  answer: string;
};

export default function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-8">
      <h2 id="faq-heading" className="text-lg font-bold text-sea-900">
        よくある質問
      </h2>
      <div className="mt-3 divide-y divide-sea-100 rounded-xl border border-sea-100 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-3">
            <summary className="cursor-pointer list-none font-medium text-sea-800 marker:content-none">
              <span className="flex items-start justify-between gap-3">
                <span>{item.question}</span>
                <span className="shrink-0 text-sea-400 transition-transform group-open:rotate-45">
                  ＋
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-sea-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
