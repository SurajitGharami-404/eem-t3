
import { type FC } from "react";
import AttendanceItem from "./attendance-item";
import Heading from "./heading";
import { Separator } from "./ui/separator";


interface Props{
  present:number,
  absent:number,
}

const AttendanceBox: FC<Props> = ({ present, absent }) => {
  return (
    <div className="h-full space-y-4 rounded border border-border bg-background/80 py-4 px-2 shadow dark:bg-secondary">
      <Heading type="p" className="text-center text-primary">
        Attendance
      </Heading>
      <Separator />
      <AttendanceItem label="Teachers Present" data={present}/>
      <AttendanceItem label="Teachers Absent" data={absent} className="[&_.data]:bg-destructive/30 [&_.data]:text-destructive"/>
    </div>
  );
};

export default AttendanceBox;