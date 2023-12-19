
import { type Grade } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"



export const gradeColumns: ColumnDef<Grade>[] = [
  {
    accessorKey: "name",
    header: "Grade",
  },
  {
    id:"creatorBy",
    header:"Created by",
    cell:({row})=>{
      return <p>
        {row.original.createdBy.name}
      </p>
    }
  },
  {
    accessorKey:"createdAt",
    header:"Created at",
    cell:({row})=>{
      return <p>
        {row.original.createdAt.toLocaleDateString()}
      </p>
    }
  }
]
