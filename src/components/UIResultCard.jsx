function UIResultCard({ result }) {
  if (!result?.length) return null;

  return (
    <section className="results-list" aria-live="polite">
      {result.map((item) => (
        <article className={`result-card result-${item.tone}`} key={item.name}>
          <div className="result-emoji" aria-hidden="true">
            {item.emoji}
          </div>
          <div>
            <p className="result-label mb-1">Seu resultado</p>
            <h2 className="h4 mb-1">
              {item.name} {item.value}
              {item.name === "TMB" && " kcal"}
            </h2>
            <p className="mb-0">{item.message}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default UIResultCard;
