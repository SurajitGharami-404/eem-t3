import { LogOutIcon } from "lucide-react";
import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import { Button } from "~/components/ui/button";

const SchoolAccountListPage = () => {
  return (
    <>
      <MetaTags title="All School Accounts" />
      <div className="flex items-center justify-between">
        <Heading type="h1">School Account List</Heading>
        {/* <Button variant="info" asChild>
          <Link
            href="/super-admin/school/add"
            prefetch={false}
            className="inline-flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add School
          </Link>
        </Button> */}
      </div>
      <Box>
        <div className="flex items-center justify-between">
          <Heading type="h2">All School Accounts</Heading>
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
  );
};

SchoolAccountListPage.getLayout = (SchoolAccountListpage: React.ReactElement) =>
  layout(SchoolAccountListpage, "SuperAdmin");

export default SchoolAccountListPage;