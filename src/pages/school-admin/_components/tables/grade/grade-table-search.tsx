import { type Table } from "@tanstack/react-table";

import { Input } from "~/components/ui/input";

import { type ChangeEvent } from "react";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-10 w-48"
        />
      </div>
    </div>
  );
}
