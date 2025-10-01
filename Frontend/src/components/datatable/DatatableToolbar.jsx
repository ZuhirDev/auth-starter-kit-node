import React, { useState } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnsIcon, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DatatableToolbar = ({
  table,
  handleExportCSV,
  onAddRowClick,
  options,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  const { showSearch: showSearchOption, showExport, showColumnVisibility, showAddButton } = options;

  return (
    <div className="w-full flex flex-wrap justify-end items-center gap-2 mb-4 dark:text-zinc-200">
      {showSearchOption && (
        !showSearch ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="flex items-center dark:border-zinc-700 dark:text-zinc-200"
          >
            <Search className="h-4 w-4" />
          </Button>
        ) : (
          <div className="relative w-full max-w-sm sm:w-auto">
            <Input
              autoFocus
              placeholder="Search..."
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              onBlur={() => {
                if (!table.getState().globalFilter) setShowSearch(false);
              }}
              className="pr-8 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-700"
            />
            {table.getState().globalFilter && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground dark:text-zinc-400"
                onClick={() => {
                  table.setGlobalFilter("");
                  setShowSearch(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )
      )}

      {showExport && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          className="dark:border-zinc-700 dark:text-zinc-200"
        >
          Export CSV
        </Button>
      )}

      {showColumnVisibility && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-zinc-700 dark:text-zinc-200"
            >
              <ColumnsIcon className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="dark:bg-zinc-900 dark:text-zinc-200"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize dark:text-zinc-200"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.columnDef.header}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {showAddButton && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAddRowClick}
          className="dark:border-zinc-700 dark:text-zinc-200"
        >
          <Plus />
          Add
        </Button>
      )}
    </div>
  );
};

export default DatatableToolbar;
