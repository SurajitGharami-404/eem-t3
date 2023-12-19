
import { type Subject } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const subjectColumns: ColumnDef<Subject>[] = [
  {
    accessorKey: "name",
    header: "Subject name",
    cell:({row})=>{
      return <p className="capitalize">
        {row.original.name}
      </p>
    }
  },
  {
    accessorKey: "type",
    header: "Subject type",
    cell:({row})=>{
      return <p>
        {row.original.type}
      </p>
    }
  }
]
