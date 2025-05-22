import React, { useEffect, useState } from "react";
import DataTable, { type TableStyles } from "react-data-table-component";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { getTradingEntries } from "../../services/tradingEntryServices";

const customStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: "#FF0000",
      borderRadius: "8px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f1f5f9",
      color: "#334155",
      fontWeight: 600,
      fontSize: "0.85rem",
      borderBottom: "1px solid #e2e8f0",
      textTransform: "uppercase",
    },
  },
  headCells: {
    style: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
      color: "#1e293b",
      fontSize: "0.875rem",
      minHeight: "56px",
      borderBottom: "1px solid #f1f5f9",
      transition: "background-color 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "#f9fafb",
      },
    },
  },
  cells: {
    style: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#f8fafc",
      color: "#334155",
      borderTop: "1px solid #e2e8f0",
    },
  },
};
interface Entry {
  id: string;
  datetime: string;
  pair: string;
  type: string;
  result: string;
  profit: number;
}

export const TradingEntriesTable: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getTradingEntries();
        setEntries(data);
      } catch (error) {
        console.error("Error al obtener entradas:", error);
      }
    };

    fetchEntries();
  }, []);

  const columns = [
    {
      name: "Fecha",
      selector: (row: Entry) =>
        new Date(row.datetime).toLocaleDateString("es-EC"),
      sortable: true,
    },
    {
      name: "Par",
      selector: (row: Entry) => row.pair,
      sortable: true,
    },
    {
      name: "Posición",
      selector: (row: Entry) => row.type.toUpperCase(),
    },
    {
      name: "Estado",
      selector: (row: Entry) => row.result,
    },
    {
      name: "Resultado",
      selector: (row: Entry) => `$${row.profit.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: () => (
        <div className="flex gap-3 justify-center">
          <button title="Ver">
            <Eye size={18} className="text-blue-600 hover:text-blue-800" />
          </button>
          <button title="Editar">
            <Pencil
              size={18}
              className="text-yellow-500 hover:text-yellow-600"
            />
          </button>
          <button title="Eliminar">
            <Trash2 size={18} className="text-red-500 hover:text-red-600" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="mt-6">
      <DataTable
        title="Operaciones Registradas"
        columns={columns}
        data={entries}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
        noDataComponent="No se encontraron operaciones."
      />
    </div>
  );
};
