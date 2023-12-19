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
          placeholder="Search by roll"
          value={(table.getColumn("rollNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn("rollNumber")?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Search by grade"
          value={(table.getColumn("grade")?.getFilterValue() as string) ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn("grade")?.setFilterValue(event.target.value)
          }
        />
      </div>
    </div>
  );
}
