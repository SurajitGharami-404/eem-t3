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
        />
        <Input
          placeholder="Search by contact number"
          value={(table.getColumn("contactNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn("contactNumber")?.setFilterValue(event.target.value)
          }
        />
        <Input
          placeholder="Search by email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
        />
      </div>
    </div>
  );
}
