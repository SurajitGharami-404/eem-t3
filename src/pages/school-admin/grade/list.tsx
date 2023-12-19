import { LogOutIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import { Button } from "~/components/ui/button";

const SchoolGradeListPage= () => {
  return (
    <>
    <MetaTags title="Grades" />
    <div className="flex items-center justify-between">
      <Heading type="h1">Grade List</Heading>
      <Button variant="info" asChild>
        <Link
          href="/school-admin/grade/add"
          prefetch={false}
          className="inline-flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Grade
        </Link>
      </Button>
    </div>
    <Box>
      <div className="flex items-center justify-between">
        <Heading type="h2">All Grade List</Heading>
        <Button variant="secondary" className="gap-x-2 text-base">
          <LogOutIcon className="h-4 w-4" /> Export
        </Button>
      </div>
      <div className="space-y-6">
        {/* <TableSearch />
       {schoolLoading?(
        <Skeleton className="h-12 w-full"/>
       ):(
         <DataTable columns={columns} data={schools??[]}/>
       )}
        <TablePagination count={maximumPageNumber} /> */}
      </div>
    </Box>
  </>
  )
}

SchoolGradeListPage.getLayout = (SchoolGradeListPage: React.ReactElement) =>
  layout(SchoolGradeListPage, "SchoolAdmin");

export default SchoolGradeListPage;