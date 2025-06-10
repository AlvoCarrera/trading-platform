import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { getTradingEntries } from "../../services/tradingEntryServices";
import Button from "../../components/ui/Button";

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
        cell: () => (
          <div className="actions">
            <button className="view" title="Ver">
              <Eye size={18} />
            </button>
            <button className="edit" title="Editar">
              <Pencil size={18} />
            </button>
            <button className="delete" title="Eliminar">
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
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
    </div>
  );
};
