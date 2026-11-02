/** Une page de texte (mentions légales, CGU, confidentialité) : un titre et son contenu. */
export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section className="max-w-site mx-auto px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
      <h1 className="display text-[clamp(36px,5vw,60px)] leading-[1.05]">{title}</h1>
      <div className="mt-12 text-[16px] leading-relaxed">{children}</div>
    </section>
  );
}
