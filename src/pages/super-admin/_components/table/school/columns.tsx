import { type School } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";


export const schoolColumns: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <p>{new Date(row.original.createdAt).toLocaleDateString()}</p>;
    },
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
          href={`/super-admin/school/${row.original.id}`}
          className="text-sm text-info inline-flex items-center gap-x-2"
        >
          <EyeIcon className="h-4 w-4"/> <span>Details</span>
        </Link>
      );
    },
  },
];
