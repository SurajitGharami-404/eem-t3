import { type Student } from "@prisma/client";
import { LogOutIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import StudentTable from "../_components/tables/student/student-table";
import { studentColumns } from "../_components/tables/student/columns";

const SchoolStudentListPage= () => {
  const [data,setData] = useState<Student[]>([])

  const {data:students,isSuccess,error} = api.student.findAllStudents.useQuery()

  useEffect(()=>{
    if(isSuccess){
      setData(students)
    }
    if(error){
      toast.error(error.data?.code)
    }
  },[error,isSuccess,students])
  return (
    <>
      <MetaTags title="Students" />
      <div className="flex items-center justify-between">
        <Heading type="h1">Students List</Heading>
        <Button variant="info" asChild>
          <Link
            href="/school-admin/student/add"
            prefetch={false}
            className="inline-flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Students
          </Link>
        </Button>
      </div>
      <Box>
        <div className="flex items-center justify-between">
          <Heading type="h2">All Student List</Heading>
          <Button variant="secondary" className="gap-x-2 text-base">
            <LogOutIcon className="h-4 w-4" /> Export
          </Button>
        </div>
        <div className="space-y-6">
          <StudentTable columns={studentColumns} data={data}/>
        </div>
      </Box>
    </>
  )
}

SchoolStudentListPage.getLayout = (SchoolStudentListPage: React.ReactElement) =>
  layout(SchoolStudentListPage, "SchoolAdmin");

export default SchoolStudentListPage;