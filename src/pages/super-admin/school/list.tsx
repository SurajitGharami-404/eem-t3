import { LogOutIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import { Button } from "~/components/ui/button";
import { schoolColumns } from "../_components/table/school/columns";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { type School } from "@prisma/client";
import { toast } from "react-toastify";
import SchoolTable from "../_components/table/school/school-table";

const SchoolListPage = () => {

  const [data, setData] = useState<School[]>([]);


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
      <MetaTags title="All Schools" />
      <div className="flex items-center justify-between">
        <Heading type="h1">School List</Heading>
        <Button variant="info" asChild>
          <Link
            href="/super-admin/school/add"
            prefetch={false}
            className="inline-flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add School
          </Link>
        </Button>
      </div>
      <Box>
        <div className="flex items-center justify-between">
          <Heading type="h2">All Schools List</Heading>
          <Button variant="secondary" className="gap-x-2 text-base">
            <LogOutIcon className="h-4 w-4" /> Export
          </Button>
        </div>
        <div className="space-y-6">
          <SchoolTable data={data} columns={schoolColumns}/>
        </div>
      </Box>
    </>
  );
};

SchoolListPage.getLayout = (SchoolListpage: React.ReactElement) =>
  layout(SchoolListpage, "SuperAdmin");

export default SchoolListPage;
