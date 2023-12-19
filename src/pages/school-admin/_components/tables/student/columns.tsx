

import { Student, type Teacher } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import { Badge } from "~/components/ui/badge"



// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const studentColumns: ColumnDef<Student>[] = [
    {
        accessorKey:"rollNumber",
        header:"Roll"
    },
    {
        id:"grade",
        accessorKey:"gradeId",
        header:"Grade",
        cell:({row})=>{
            return <p >
              {row.original.grade.name}
            </p>
          }
    },
  {
    id:"name",
    accessorKey:"firstName",
    header: "Student name",
    cell:({row})=>{
      return <p className="capitalize">
        {row.original.firstName+" "+row.original.lastName}
      </p>
    }
  },
  {
    accessorKey: "contactNumber",
    header: "Contact",
    cell:({row})=>{
      return <p>
        {row.original.contactNumber}
      </p>
    }
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      return row.original.active ? (
        <Badge variant="success">Active</Badge>
      ) : (
        <Badge variant="destructive">InActive</Badge>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Link
          prefetch={false}
          href={`/school-admin/student/${row.original.id}`}
          className="text-sm text-info inline-flex items-center gap-x-2"
        >
          <EyeIcon className="h-4 w-4"/> <span>Details</span>
        </Link>
      );
    },
  },
]
