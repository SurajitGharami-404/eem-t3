import { layout } from "~/components/layouts/layout";
import MetaTags from "~/components/meta-tags";
import Heading from "~/components/heading";
import Box from "~/components/box";
import DataCards from "~/components/data-cards";
import { CalendarDaysIcon, FileIcon, UserSquareIcon } from "lucide-react";
import AttendanceBox from "~/components/attendance-box";
import { DataTable } from "~/components/ui/data-table";

import { Separator } from "~/components/ui/separator";
import { type TDataCard } from "~/lib/types/types";
import { extraScheduleColumns } from "./_components/tables/schedule/columns";
import { requestColumns } from "./_components/tables/request/columns";

const DashboardPage = () => {
  const cards: TDataCard[] = [
    {
      title: "Total class",
      data: 0,
      icon: <UserSquareIcon />,
    },
    {
      title: "Total notes",
      data: 0,
      icon: <FileIcon />,
    },
    {
      title: "Total leaves",
      data: 0,
      icon: <CalendarDaysIcon />,
    },
  ];

  return (
    <>
      <MetaTags title={`School Admin - Dashboard`} />
      <Heading type="h1">School Admin Dashboard</Heading>
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
            <Heading type="h4" className="text-primary">
              Schedule Affected
            </Heading>
            <DataTable columns={extraScheduleColumns} data={[]} />
          </Box>
        </div>
      </div>

      {/**
       * second grid
       */}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <Box>
            <Heading type="h4" className="text-primary">
              Requests
            </Heading>
            <DataTable columns={requestColumns} data={[]} />
          </Box>
        </div>
        <div className="col-span-4">
          <Box className="h-full">
            <Heading type="h4">Notice</Heading>
            <Separator />
            <p>No notice available</p>
          </Box>
        </div>
      </div>
    </>
  );
};

DashboardPage.getLayout = (Dashboardpage: React.ReactElement) =>
  layout(Dashboardpage, "Teacher");

export default DashboardPage;
