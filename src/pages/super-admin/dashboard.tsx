import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import Heading from "~/components/heading";
import Box from "~/components/box";
import DataCards from "~/components/data-cards";
import { LogOutIcon, School2Icon, SchoolIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type TDataCard } from "~/lib/types/types";
import { api } from "~/utils/api";;
import { schoolColumns } from "./_components/table/school/columns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SchoolTable from "./_components/table/school/school-table";
import { type School } from "@prisma/client";

const DashboardPage = () => {

  const [data, setData] = useState<School[]>([]);

  const [count,setCount] = useState({
    totalCount:0,
    activeCount:0,
    inactiveCount:0,
  })

  const {data:schoolCount,error:schoolCountError,isSuccess:schoolCountSuccess} = api.school.getSchoolAllCount.useQuery()

  const cards: TDataCard[] = [
    {
      title: "Total Schools",
      data: count.totalCount,
      icon: <School2Icon />,
    },
    {
      title: "Active Schools",
      data: count.activeCount,
      icon: <SchoolIcon />,
      className: "[&_.data]:text-success",
    },
    {
      title: "Inactive Schools",
      data: count.inactiveCount,
      icon: <SchoolIcon />,
      className: "[&_.data]:text-destructive",
    },
  ];

  useEffect(()=>{
    if(schoolCountSuccess){
      setCount({
        totalCount:schoolCount.totalCount,
        activeCount:schoolCount.activeCount,
        inactiveCount:schoolCount.inActiveCount
      })
    }
    if(schoolCountError){
      toast.error(schoolCountError.message)
    }
  },[schoolCountSuccess,schoolCountError, schoolCount])

  
  


  const {data:schools,isSuccess:schoolsSuccess, error:schoolsError} = api.school.getAllSchool.useQuery()

  useEffect(() => {
    if (schoolsSuccess) {
      setData(schools);
    }
    if (schoolsError) {
      toast.error(schoolsError.data?.code)
    }
  }, [schools, schoolsError, schoolsSuccess]);

  return (
    <>
      <MetaTags title={`Super Admin - Dashboard`} />
      <Heading type="h1">Super Admin Dashboard</Heading>
      <DataCards cards={cards} />
      <Box>
        <div className="flex items-center justify-between">
          <Heading type="h2">All Schools List</Heading>
          <Button variant="secondary" className="text-base gap-x-2">
            <LogOutIcon className="h-4 w-4"/> Export
          </Button>
        </div>
        <div className="space-y-6">
          <SchoolTable data={data} columns={schoolColumns}/>
        </div>
      </Box>
     
    </>
  );
};

DashboardPage.getLayout = (Dashboardpage: React.ReactElement) =>
  layout(Dashboardpage, "SuperAdmin");

export default DashboardPage;
