import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DatatableToolbar from '@/components/datatable/DatatableToolbar';
import DatatableColumnFilter from '@/components/datatable/DatatableColumnFilter';
import DatatableFooter from '@/components/datatable/DatatableFooter';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDown, ArrowUp, ChevronsUpDown, Loader2 } from 'lucide-react';
import { get } from '@/utils/xhr';
import { useDebounce } from 'use-debounce';
import Papa from 'papaparse';
import { format } from 'date-fns';
import useModal from '@/hooks/useModal';

const Datatable = ({ columns, remote, initialSorting, onCreateRow = () => {}, onUpdateRow = () => {}, onDeleteRow = () => {}, renderRowActions, options = {} }) => {
  const { isOpen, open, close, data: deleteData } = useModal(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState(initialSorting || []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [newRow, setNewRow] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [creatingRow, setCreatingRow] = useState(false);


  const [debouncedGlobalFilter] = useDebounce(globalFilter, 300);
  const [debouncedColumnFilters] = useDebounce(columnFilters, 300);
  const [debouncedSorting] = useDebounce(sorting, 0);

  const tableOptions =  {
    tableName: 'Table',
    showSearch: true,
    showExport: true,
    showColumnVisibility: true,
    showAddButton: false,
    enableColumnSelection: true,
    enableHeader: true,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    ...options,
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        globalSearch: {
          search: debouncedGlobalFilter ?? '',
          columns: columns
            .filter(col => col.searchable !== false)
            .map(col => ({ field: col.id, title: col.header })),
        },
        filters: debouncedColumnFilters.map(filter => ({
          field: filter.id,
          value: filter.value,
        })),
        orderByCollection: debouncedSorting.map(sort => ({
          column: sort.id,
          direction: sort.desc ? 'desc' : 'asc',
        })),
      };

      const response = await get({ url: remote, params });
      setData(response.data.data);
      setRowCount(response.data.totalCount);
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  }, [remote, pagination, debouncedSorting, debouncedGlobalFilter, debouncedColumnFilters, columns]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExportCSV = () => {
    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter(col => col.columnDef.enableExport !== false);

    const headers = visibleColumns.map(col => col.columnDef.header);

    const sourceRows =
      table.getSelectedRowModel().rows.length > 0
        ? table.getSelectedRowModel().rows
        : table.getRowModel().rows;

    const rows = sourceRows.map(row =>
      visibleColumns.reduce((acc, column) => {
        const cell = row.getValue(column.id);
        return { ...acc, [column.columnDef.header]: cell };
      }, {})
    );

    const csv = Papa.unparse({ fields: headers, data: rows });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${tableOptions.tableName}_${format(new Date(), 'dd-MM-yyyy')}.csv`;
    link.click();
  };


  const dynamicColumns = useMemo(() => {
    const cols = [];

    if (tableOptions.enableColumnSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableExport: false,
        searchable: false,
      });
    }

    cols.push(...columns);

    if (renderRowActions) {
      cols.push({
        id: "actions",
        header: "Acciones",
        enableSorting: false,
        enableExport: false,
        searchable: false,
        cell: ({ row, table }) => renderRowActions({ row, table }),
      });
    }

    return cols;
  }, [columns, renderRowActions, tableOptions.enableColumnSelection]);

  const table = useReactTable({
    data,
    columns: dynamicColumns,
    rowCount,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, globalFilter, columnVisibility, rowSelection, pagination },
  });

  table.setCreatingRow = (bool) => {
    setCreatingRow(bool);
    if (bool) setNewRow({});
  };

  table.updateNewRow = (updates) => {
    setNewRow((prev) => ({ ...prev, ...updates }));
  };

  table.cancelCreatingRow = () => {
    setCreatingRow(false);
    setNewRow(null);
  };

  table.saveCreatingRow = async () => {
    await onCreateRow(newRow);
    table.cancelCreatingRow();
    await fetchData();
  };

  table.setEditingRow = (row) => {
    setEditingRowId(row.id);
    setEditedRow(row.original);
  };

  table.updateEditedRow = (updates) => {
    setEditedRow((prev) => ({ ...prev, ...updates }));
  };

  table.cancelEditing = () => {
    setEditingRowId(null);
    setEditedRow({});
  };

  table.saveEditingRow = async () => {
    const row = table.getRowModel().rows.find((r) => r.id === editingRowId);
    if (!row) return;

    await onUpdateRow({ id: row.original.id ?? row.original._id, ...editedRow });
    table.cancelEditing();
    await fetchData();
  };

  table.deleteRow = async (row) => {
    const id = row.original.id ?? row.original._id;
    if (!id) return;

    open(id);
  };

  return (
    <div className="space-y-4">
      <DatatableToolbar 
        table={table} 
        handleExportCSV={handleExportCSV}   
        onAddRowClick={() => table.setCreatingRow(true)}
        options={tableOptions}
      />

      <div className="rounded-md border border-gray-200 dark:border-zinc-700 overflow-auto">
        <Table className="min-w-full">

          {tableOptions.enableHeader && (
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {!header.isPlaceholder && (
                          <div
                            className={`${
                              tableOptions.enableSorting && header.column.getCanSort()
                                ? "flex cursor-pointer select-none items-center"
                                : "flex items-center"
                            }`}
                            onClick={tableOptions.enableSorting ? header.column.getToggleSortingHandler() : undefined}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {tableOptions.enableSorting && header.column.getCanSort() && (
                              <span className="ml-1">
                                {header.column.getIsSorted() === "asc" ? (
                                  <ArrowUp className="h-4 w-4" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ArrowDown className="h-4 w-4" />
                                ) : (
                                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                        {tableOptions.enableFiltering && header.column.getCanFilter() && (
                          <DatatableColumnFilter column={header.column} />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          )}

          <TableBody>
            {newRow && (
              <TableRow>
                {table.getVisibleLeafColumns().map((column) => {
                  if (["actions", "select"].includes(column.id)) {
                    return <TableCell key={column.id} />;
                  }

                  return (
                    <TableCell key={column.id}>
                      <input
                        className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 dark:border-zinc-700 dark:text-white"
                        placeholder={column.columnDef.header}
                        value={newRow[column.id] || ""}
                        onChange={(e) => table.updateNewRow({ [column.id]: e.target.value })}
                      />
                    </TableCell>
                  );
                })}

                <TableCell colSpan={1}>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => table.saveCreatingRow()}>Guardar</Button>
                    <Button variant="ghost" size="sm" onClick={() => table.cancelCreatingRow()}>Cancelar</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin h-8 w-8 text-white-500 dark:text-zinc-400" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? 
            (
              table.getRowModel().rows.map((row) => {
                const isEditing = editingRowId === row.id;

                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const columnId = cell.column.id;

                      if (columnId === "actions") {
                        return (
                          <TableCell key={cell.id}>
                            {isEditing ? (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => table.saveEditingRow()}>
                                  Guardar
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => table.cancelEditing()}>
                                  Cancelar
                                </Button>
                              </div>
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={cell.id}>
                          {isEditing ? (
                            <input
                              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 dark:border-zinc-700 dark:text-white"
                              value={editedRow[columnId] ?? ""}
                              onChange={(e) => table.updateEditedRow({ [columnId]: e.target.value })}
                            />
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-600 dark:text-zinc-400">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      { tableOptions.enablePagination && (
        <DatatableFooter table={table} />
      )}

      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Row Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this row? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={async () => {
                await onDeleteRow(deleteData);
                await fetchData();
                close();
              }}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );

};

export default Datatable;
