import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import Heading from "~/components/heading";
import Box from "~/components/box";
import DataCards from "~/components/data-cards";
import {
  ListOrderedIcon,
  UserSquareIcon,
  Users2Icon,
} from "lucide-react";
import AttendanceBox from "~/components/attendance-box";
import { DataTable } from "~/components/ui/data-table";
import { rescheduleColumns } from "./_components/tables/reschedule/columns";
import { requestColumns } from "./_components/tables/request/columns";
import { Separator } from "~/components/ui/separator";
import { type TDataCard } from "~/lib/types/types";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";



const DashboardPage = () => {

  const [gradeCount,setGradeCount] = useState(0)
  const [teacherCount,setTeacherCount] = useState(0)
  const [studentCount,setStudentCount] = useState(0)

  const {data:grade,isSuccess:gradeSuccess, error:gradeError} = api.grade.getGradesCount.useQuery()
  const {data:student,isSuccess:studentSuccess, error:studentError} = api.student.getStudentsCount.useQuery();
  const {data:teacher,isSuccess:teacherSuccess, error:teacherError} = api.teacher.getTeachersCount.useQuery();

  useEffect(()=>{
    
    if(gradeSuccess){
      setGradeCount(grade)
    }
    if(studentSuccess){
      setStudentCount(student)
    }
    if(teacherSuccess){
      setTeacherCount(teacher)
    }
    if(gradeError){
      toast.error(gradeError.data?.code)
    }
    if(teacherError){
      toast.error(teacherError.data?.code)
    }
    if(studentError){
      toast.error(studentError.data?.code)
    }
  },[gradeSuccess,gradeError,studentError, studentSuccess, teacherError, teacherSuccess])


  const cards: TDataCard[] = [
    {
      title: "Teacher",
      data: teacherCount??0,
      icon: <UserSquareIcon />,
    },
    {
      title: "Students",
      data: studentCount??0,
      icon: <Users2Icon />,
    },
    {
      title: "Grades",
      data: gradeCount??0,
      icon: <ListOrderedIcon />,
    },
  ];

  const session = useSession()

  return (
    <>
      <MetaTags title={session.data?.user.name??""} />
      <Heading type="h1">{session.data?.user.name}</Heading>
      <DataCards cards={cards} />

      {/**
       * first grid
       */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <AttendanceBox present={0} absent={0} />
        </div>
        <div className="col-span-9">
          <Box>
          <Heading type="h4" className="text-primary">Schedule Affected</Heading>
            <DataTable columns={rescheduleColumns} data={[]} />
          </Box>
        </div>
      </div>

      {/**
       * second grid
       */}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Box>
            <Heading type="h4" className="text-primary">Pending Requests</Heading>
            <DataTable columns={requestColumns} data={[]} />
          </Box>
        </div>
        <div className="col-span-4">
          <Box className="h-full">
            <Heading type="h4">Notice</Heading>
            <Separator/>
            <p>No notice available</p>
          </Box>
        </div>
      </div>
      
    </>
  );
};

DashboardPage.getLayout = (Dashboardpage: React.ReactElement) =>
  layout(Dashboardpage, "SchoolAdmin");

export default DashboardPage;
