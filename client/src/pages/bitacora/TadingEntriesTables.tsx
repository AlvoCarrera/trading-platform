/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Eye, Trash2, Pencil } from "lucide-react";
import {
  getTradingEntries,
  getTradingEntryById,
  updateTradingEntry,
  deleteTradingEntry,
} from "../../services/tradingEntryServices";
import Button from "../../components/ui/Button";
import { useNotification } from "../../context/NotificationContext";

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
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const { notify } = useNotification();

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

  const handleView = useCallback(async (entryId: string) => {
    try {
      const data = await getTradingEntryById(entryId);
      setSelectedEntry(data);
      setShowDetails(true);
    } catch (error) {
      console.error("Error al obtener detalle:", error);
    }
  }, []);

  const columns = useMemo<ColumnDef<Entry>[]>(
    () => [
      {
        accessorKey: "datetime",
        header: "Fecha",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString("es-EC"),
      },
      {
        accessorKey: "pair",
        header: "Par",
      },
      {
        accessorKey: "type",
        header: "Posición",
        cell: (info) => (info.getValue() as string).toUpperCase(),
      },
      {
        accessorKey: "result",
        header: "Estado",
      },
      {
        accessorKey: "profit",
        header: "Resultado",
        cell: (info) => `$${(info.getValue() as number).toFixed(2)}`,
      },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="actions">
            <button
              className="view"
              title="Ver"
              onClick={() => handleView(row.original.id)}
            >
              <Eye size={18} />
            </button>
            <button
              className="delete"
              title="Eliminar"
              onClick={() => setEntryToDelete(row.original.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    [handleView]
  );

  const table = useReactTable({
    data: entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="trading-entries-wrapper">
      <table className="trading-entries-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-pagination">
        <Button
          variant="secondary"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>

        <span>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>

        <Button
          variant="secondary"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>

      {showDetails && selectedEntry ? (
        <div className="modal-overlay">
          <div className="modal-box">
            <div
              className="bitacora-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="modal-title">Detalle de la Operación</h2>
              <div className="modal-edit-button-wrapper">
                {!isEditing && (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    <Pencil size={16} style={{ marginRight: "0.4rem" }} />
                    Editar
                  </Button>
                )}
              </div>
              <div className="modal-field">
                <strong>Fecha:</strong>{" "}
                <span>
                  {new Date(selectedEntry.datetime).toLocaleString("es-EC")}
                </span>
              </div>
              <div className="modal-field">
                <strong>Par:</strong> <span>{selectedEntry.pair}</span>
              </div>
              <div className="modal-field">
                <strong>Tipo:</strong>{" "}
                <span>{selectedEntry.type.toUpperCase()}</span>
              </div>
              <div className="modal-field">
                <strong>Entrada:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedEntry.entry}
                    onChange={(e) =>
                      setSelectedEntry({
                        ...selectedEntry,
                        entry: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span>{selectedEntry.entry}</span>
                )}
              </div>
              <div className="modal-field">
                <strong>Take Profit (TP):</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedEntry.tp}
                    onChange={(e) =>
                      setSelectedEntry({ ...selectedEntry, tp: e.target.value })
                    }
                  />
                ) : (
                  <span>{selectedEntry.tp}</span>
                )}
              </div>
              <div className="modal-field">
                <strong>Stop Loss (SL):</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedEntry.sl}
                    onChange={(e) =>
                      setSelectedEntry({ ...selectedEntry, sl: e.target.value })
                    }
                  />
                ) : (
                  <span>{selectedEntry.sl}</span>
                )}
              </div>
              <div className="modal-field">
                <strong>Duración:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedEntry.duration}
                    onChange={(e) =>
                      setSelectedEntry({
                        ...selectedEntry,
                        duration: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span>{selectedEntry.duration}</span>
                )}
              </div>
              <div className="modal-field">
                <strong>Resultado:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedEntry.result}
                    onChange={(e) =>
                      setSelectedEntry({
                        ...selectedEntry,
                        result: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span>{selectedEntry.result}</span>
                )}
              </div>
              <div className="modal-field">
                <strong>Tamaño de Lote:</strong>{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={selectedEntry.lot_size}
                    onChange={(e) =>
                      setSelectedEntry({
                        ...selectedEntry,
                        lot_size: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  <span>{selectedEntry.lot_size}</span>
                )}
              </div>
              <div className="modal-field">
                <strong>Pips Ganados:</strong>{" "}
                <span>{selectedEntry.pips_profit}</span>
              </div>
              <div className="modal-field">
                <strong>Pips Perdidos:</strong>{" "}
                <span>{selectedEntry.pips_stop}</span>
              </div>
              <div className="modal-field">
                <strong>Riesgo/Beneficio:</strong>{" "}
                <span>{selectedEntry.risk_reward_ratio}</span>
              </div>
              <div className="modal-field">
                <strong>Valor Total del Pip:</strong> $
                <span>{selectedEntry.pip_value_total}</span>
              </div>
              <div className="modal-field">
                <strong>Ganancia/Perdida:</strong> $
                <span>{selectedEntry.profit}</span>
              </div>
              <div className="modal-actions">
                {isEditing && (
                  <Button
                    variant="primary"
                    onClick={async () => {
                      try {
                        await updateTradingEntry(
                          selectedEntry.id,
                          selectedEntry
                        );
                        notify(
                          "Operación actualizada correctamente",
                          "success"
                        );
                        setShowDetails(false);
                        setIsEditing(false);
                      } catch (error) {
                        notify("Error al actualizar operación", "error");
                        console.error(error);
                      }
                    }}
                  >
                    Guardar Cambios
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowDetails(false);
                    setIsEditing(false);
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {entryToDelete && (
        <div
          className="delete-modal-overlay"
          onClick={() => setEntryToDelete(null)}
        >
          <div className="delete-modal-box">
            <div
              className="delete-confirmation-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">¿Deseas eliminar esta operación?</h3>
              <div className="delete-modal-actions">
                <Button
                  variant="primary"
                  onClick={async () => {
                    try {
                      await deleteTradingEntry(entryToDelete);
                      notify("Operación eliminada correctamente", "success");
                      setEntries((prev) =>
                        prev.filter((entry) => entry.id !== entryToDelete)
                      );
                    } catch (error) {
                      notify("Error al eliminar la operación", "error");
                      console.error(error);
                    } finally {
                      setEntryToDelete(null);
                    }
                  }}
                >
                  Sí, eliminar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setEntryToDelete(null)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
