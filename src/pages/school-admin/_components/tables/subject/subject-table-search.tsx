import { type Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SubjectType } from "@prisma/client";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
          <Select
            onValueChange={(value) =>
              table
                .getColumn("type")
                ?.setFilterValue(value === "THEORY" ? SubjectType.THEORY : SubjectType.PRACTICAL)
            }
            defaultValue={
              (table.getColumn("type")?.getFilterValue() as string) ?? ""
            }
          >
            <SelectTrigger className="h-[40px] w-[200px]">
              <SelectValue placeholder="Select Subject type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="THEORY">Theory</SelectItem>
              <SelectItem value="PRACTICAL">Practical</SelectItem>
            </SelectContent>
          </Select>
      </div>
    </div>
  );
}