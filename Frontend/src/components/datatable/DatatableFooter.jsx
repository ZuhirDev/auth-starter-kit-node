import React from "react";
import { ArrowBigLeft, ArrowBigRight, ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { Button } from "@/components/ui/button";

const DatatableFooter = ({ table }) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between py-4 gap-4">
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground w-full sm:w-auto mb-3 sm:mb-0">
        <span className="whitespace-nowrap">
          Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900
                     dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          aria-label="Rows per page"
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>

        <div className="whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} selected of{" "}
          {table.getFilteredRowModel().rows.length}
        </div>
      </div>

      <div className="flex flex-wrap items-center space-x-1 justify-start sm:justify-end w-full sm:w-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowBigLeftDash />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowBigLeft />
        </Button>

        {Array.from({ length: pageCount }).map((_, index) => {
          const isActive = index === pageIndex;
          if (
            index === 0 ||
            index === pageCount - 1 ||
            Math.abs(index - pageIndex) <= 1
          ) {
            return (
              <button
                key={index}
                onClick={() => table.setPageIndex(index)}
                className={`rounded px-2 py-1 text-sm ${
                  isActive
                    ? "bg-zinc-200 font-semibold dark:bg-zinc-700"
                    : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {index + 1}
              </button>
            );
          } else if (Math.abs(index - pageIndex) === 2) {
            return (
              <span
                key={index}
                className="px-1 text-sm text-muted-foreground dark:text-zinc-500"
              >
                …
              </span>
            );
          } else {
            return null;
          }
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowBigRight />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ArrowBigRightDash />
        </Button>
      </div>
    </div>
  );
};

export default DatatableFooter;
