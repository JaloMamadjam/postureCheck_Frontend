export default function StatusCard({ angulo, estado }) {
  const colors = {
    OK: "green",
    ATENCAO: "orange",
    CRITICO: "red",
  };

  return (
    <div style={{ borderLeft: `8px solid ${colors[estado]}`, padding: 16 }}>
      <h2>Ângulo Atual</h2>
      <p>{angulo.toFixed(2)}°</p>
      <h3>Status: {estado}</h3>
    </div>
  );
}
