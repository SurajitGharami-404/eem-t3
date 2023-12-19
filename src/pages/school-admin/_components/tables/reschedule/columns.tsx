
import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExtraSchedule = {
  substitute:string,
  main:string,
  startTime:string,
  endTime:string,
  grade:string,
  subject:string
}

export const rescheduleColumns: ColumnDef<ExtraSchedule>[] = [
  {
    accessorKey: "main",
    header: "Absent teacher",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    id:"period",
    header: "Period Time",
    cell:({row})=>{
        return(
            <p>{row.original.startTime} to {row.original.endTime}</p>
        )
    }
  },
  {
    accessorKey:"subject",
    header:"Subject"
  },
  {
    accessorKey:"substitute",
    header:"Substitute teacher avilable"
  }
]
