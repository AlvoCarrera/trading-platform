import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import { TradingEntryForm } from "./bitacora/TradingEntryForm";
import { TradingEntriesTable } from "./bitacora/TadingEntriesTables";

const Bitacora = () => {
  const { collapsed } = useMenu();
  const [view, setView] = useState<"form" | "table" | null>(null);

  const handleToggle = (mode: "form" | "table") => {
    setView((prev) => (prev === mode ? null : mode));
  };

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
          <button onClick={() => handleToggle("form")}>
            {view === "form" ? "Cerrar Formulario" : "Nueva Entrada"}
          </button>
          <button onClick={() => handleToggle("table")}>
            {view === "table" ? "Ocultar Operaciones" : "Ver Operaciones"}
          </button>
        </div>

        {view === "form" && (
          <div className="form-wrapper">
            <TradingEntryForm onClose={() => setView(null)} />
          </div>
        )}

        {view === "table" && (
          <div className="table-wrapper">
            <TradingEntriesTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bitacora;
