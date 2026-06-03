export default function AnalysisCard({
  title,
  borderColor,
  titleColor,
  children,
}) {

  return (
    <div
      className={`glass rounded-2xl p-5 border ${borderColor}`}
    >

      <h2
        className={`text-xl font-bold mb-3 ${titleColor}`}
      >
        {title}
      </h2>

      {children}

    </div>
  );
}