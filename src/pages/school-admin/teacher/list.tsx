import { type Teacher } from "@prisma/client";
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
import TeacherTable from "../_components/tables/teacher/teacher-table";
import { teacherColumns } from "../_components/tables/teacher/columns";

const SchoolTeacherListPage= () => {
  const [data,setData] = useState<Teacher[]>([])

  const {data:teachers,isSuccess,error} = api.teacher.findAllTeachers.useQuery()

  useEffect(()=>{
    if(isSuccess){
      setData(teachers)
    }
    if(error){
      toast.error(error.data?.code)
    }
  },[error,isSuccess,teachers])

  return (
    <>
      <MetaTags title="Teachers" />
      <div className="flex items-center justify-between">
        <Heading type="h1">Teacher List</Heading>
        <Button variant="info" asChild>
          <Link
            href="/school-admin/teacher/add"
            prefetch={false}
            className="inline-flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Teacher
          </Link>
        </Button>
      </div>
      <Box>
        <div className="flex items-center justify-between">
          <Heading type="h2">All Teacher List</Heading>
          <Button variant="secondary" className="gap-x-2 text-base">
            <LogOutIcon className="h-4 w-4" /> Export
          </Button>
        </div>
        <div className="space-y-6">
          <TeacherTable columns={teacherColumns} data={data}/>
        </div>
      </Box>
    </>
  )
}

SchoolTeacherListPage.getLayout = (SchoolTeacherListPage: React.ReactElement) =>
  layout(SchoolTeacherListPage, "SchoolAdmin");

export default SchoolTeacherListPage;