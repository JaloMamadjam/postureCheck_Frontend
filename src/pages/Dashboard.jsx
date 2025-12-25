import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { calibrateSensor } from "../api/postureApi";

// Componentes
import StatusCard from "../components/StatusCard";
import AngleChart from "../components/AngleChart";
import HistoryList from "../components/HistoryList";

// Estilos (mantive o import, mas limpei as classes visuais no JSX)
import '../styles/dashboard.css';

export default function Dashboard() {
  const [current, setCurrent] = useState({ angulo: 0, estado: "OK" });
  const [history, setHistory] = useState([]);

  // --- Lógica de Conexão MQTT ---
  useEffect(() => {
    const client = mqtt.connect("wss://4b0ca456ff7e462f88c310fffd260e40.s1.eu.hivemq.cloud:8884/mqtt", {
      username: "esp32",
      password: "Posture123"
    });

    client.on("connect", () => {
      client.subscribe("posture/esp32/data");
    });

    client.on("message", (topic, message) => {
      if (topic === "posture/esp32/data") {
        try {
          const data = JSON.parse(message.toString());
          setCurrent({ angulo: data.angulo, estado: data.estado });
          setHistory(prev => [data, ...prev].slice(0, 8));
        } catch (error) {
          console.error("Erro ao processar dados do MQTT:", error);
        }
      }
    });

    return () => client.end();
  }, []);

  // --- Handlers ---
  const handleCalibration = () => {
    calibrateSensor({ angulo: 0 });
  };

  return (
    <main className="dashboard-container">
      
      {/* Seção Superior: Título e Controles Rápidos */}
      <section className="dashboard-header">
        <h1>Posture-Check</h1>
        
        <div className="controls">
          <StatusCard angulo={current.angulo} estado={current.estado} />
          <button onClick={handleCalibration}>
            CALIBRAR SENSOR
          </button>
        </div>
      </section>

      <hr /> {/* Divisor simples no lugar da barra colorida */}

      {/* Conteúdo Principal: Grid de Dados */}
      <div className="dashboard-content">
        
        {/* Área do Gráfico */}
        <section className="data-panel">
          <h2>Telemetria em Tempo Real</h2>
          <AngleChart data={history} />
        </section>

        {/* Área do Histórico */}
        <aside className="data-panel">
          <h2>Logs Recentes</h2>
          <HistoryList data={history} />
        </aside>

      </div>

    </main>
  );
}