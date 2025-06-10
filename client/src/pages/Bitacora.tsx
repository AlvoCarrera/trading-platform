import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import { TradingEntryForm } from "./bitacora/TradingEntryForm";
import { TradingEntriesTable } from "./bitacora/TadingEntriesTables";
import Button from "../components/ui/Button";
import { NotebookPen, PlusCircle, Eye } from "lucide-react";

const Bitacora = () => {
  const { collapsed } = useMenu();
  const [view, setView] = useState<"form" | "table" | null>(null);

  const handleToggle = (mode: "form" | "table") => {
    setView((prev) => (prev === mode ? null : mode));
  };

  return (
    <div className={`bitacora-page ${collapsed ? "collapsed" : ""}`}>
      <h1 className="title">
        <NotebookPen size={24} /> Bitácora de Trading
      </h1>
      <p className="description">
        Aquí puedes registrar y analizar todas tus operaciones de trading.
        Llevar una bitácora te ayuda a mejorar tus decisiones y disciplina como
        trader.
      </p>

      <div className="bitacora-actions">
        <Button variant="primary" onClick={() => handleToggle("form")}>
          <PlusCircle size={18} /> Nueva Entrada
        </Button>

        <Button variant="secondary" onClick={() => handleToggle("table")}>
          <Eye size={18} /> Ver Operaciones
        </Button>
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
  );
};

export default Bitacora;
