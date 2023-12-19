import { type Table } from "@tanstack/react-table";

import { Input } from "~/components/ui/input";

import { type ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import InputGroup from "~/components/input-group";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <InputGroup>
          <Input
            placeholder="Search by name"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          <Select
            onValueChange={(value) =>
              table
                .getColumn("active")
                ?.setFilterValue(value === "active" ? true : false)
            }
            defaultValue={
              (table.getColumn("active")?.getFilterValue() as string) ?? ""
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </InputGroup>
      </div>
    </div>
  );
}
