export default function HistoryList({ data }) {
  return (
    <div>
      <h2>Histórico</h2>
      <ul>
        {data.slice(0, 10).map((item, i) => (
          <li key={i}>
            {item.angulo.toFixed(2)}° — {item.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}
