
import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Request = {
  name:string,
  date:string,
  status:string,
}

export const requestColumns: ColumnDef<Request>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey:"status",
    header:"Status"
  }
]