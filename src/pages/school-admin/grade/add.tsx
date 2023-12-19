import { layout } from "~/components/layouts/layout";
import AddGradeForm from "../_components/forms/add-grade-form";
import Heading from "~/components/heading";
import { gradeColumns } from "../_components/tables/grade/columns";
import { useEffect, useState } from "react";
import { type Grade } from "@prisma/client";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import GradeTable from "../_components/tables/grade/grade-table";

const AddGradePage = () => {

  const [data,setData] = useState<Grade[]>([])

  const {data:grades,isSuccess,error} = api.grade.findAllGrades.useQuery() 

  useEffect(()=>{
    if(isSuccess){
      setData(grades)
    }
    if(error){
      toast.error(error.data?.code)
    }
  },[data,grades,isSuccess,error])



  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 space-y-3 rounded-md bg-background p-4 shadow">
          <Heading type="h1">Add Grade</Heading>
          <AddGradeForm/>
        </div>
        <div className="col-span-7 space-y-3 rounded-md bg-background p-4 shadow">
          <Heading type="h2">Grade List</Heading>
          <GradeTable columns={gradeColumns} data={data} />
        </div>
      </div>
    </>
  );
};

AddGradePage.getLayout = (AddGradePage: React.ReactElement) =>
  layout(AddGradePage, "SchoolAdmin");

export default AddGradePage;
