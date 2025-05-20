// src/pages/Bitacora.tsx
import { useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext";

const Bitacora = () => {
  const { collapsed } = useMenu();
  const navigate = useNavigate();

  return (
    <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
      <div className="bitacora-wrapper">
        <h1>Bitácora de Trading</h1>
        <p>
          Aquí puedes registrar y analizar todas tus operaciones de trading.
          Llevar una bitácora te ayuda a mejorar tus decisiones y disciplina
          como trader.
        </p>

        <div className="bitacora-actions">
          <button onClick={() => navigate("/bitacora/crear")}>
            Nueva Entrada
          </button>
          <button onClick={() => navigate("/bitacora/ver")}>
            Ver Entradas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bitacora;
