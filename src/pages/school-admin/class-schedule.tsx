import { Grade, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/utils/api";


// const totalSchedule = [
//     {
//         day:"Mon",
//         period:"8:00",
//         teacher:"John Jha",
//         grade:"5A"
//     },
//     {
//         day:"Mon",
//         period:"9:00",
//         teacher:"Dinga Das",
//         grade:"5A"
//     },
//     {
//         day:"Mon",
//         period:"10:00",
//         teacher:"John Das",
//         grade:"5A"
//     },
//     {
//         day:"Mon",
//         period:"11:00",
//         teacher:"Dinga Jha",
//         grade:"5A"
//     },
//     {
//         day:"Mon",
//         period:"12:00",
//         teacher:"John Jha",
//         grade:"5A"
//     },
// ]

const ClassSchedule = () => {
  const [data, setData] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState<unknown[]>([]);

  const [selectGrade, setSelectGrade] = useState("");

  const [gradeSchedule, setGradeSchedule] = useState([]);

  const tempTeacherList = [];


//  if(selectGrade){
//     for(let day=0; day<7;day++){
//         data.forEach(d=>{
//             if(selectGrade.includes(d.grades)){
//                 tempTeacherList.push(d.firstName)
//             }
//         })
    
//         for(let time=0; time<9; time++){
//             if(tempTeacherList.length<1){
//                 data.forEach(d=>{
//                     if(selectGrade.includes(d.grades)){
//                         tempTeacherList.push(d.firstName)
//                     }
//                 })
//             }
    
//             const rand = Math.floor(Math.random()*tempTeacherList.length) +1;
    
    
//             const obj = {
//                 teacher:tempTeacherList[rand],
//                 grade:selectGrade,
//                 period:time,
//                 day:day
//             }
    
//             setGradeSchedule((prev)=>[...prev,obj])
//             tempTeacherList.splice(rand,1)
//         }
//       }
//  }

  const {
    data: teachers,
    isSuccess: teacherSuccess,
    error: tecaherError,
  } = api.teacher.findAllTeachers.useQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(teachers);
    }
    if (error) {
      toast.error(error.data?.code);
    }
  }, [tecaherError, teacherSuccess, teachers]);

  console.log({ data });

  const {
    data: subjects,
    isSuccess,
    error,
  } = api.subject.findAllSubjects.useQuery();
  useEffect(() => {
    if (isSuccess) {
      setSubject(subjects);
    }
    if (error) {
      toast.error(error?.data?.code);
    }
  }, [isSuccess, error, data, subjects]);
  console.log({ subject });

  const [grades, setGrades] = useState<Grade[]>([]);

  const {
    data: grade,
    isSuccess: gradesSuccess,
    error: gradesError,
  } = api.grade.findAllGrades.useQuery();

  useEffect(() => {
    if (gradesSuccess) {
      setGrades(grade);
    }
    if (gradesError) {
      toast.error(gradesError.data?.code);
    }
  }, [data, grades, gradesSuccess, gradesError]);

  return (
    <>
      <Heading type="h1">Class Schedule</Heading>

      <Box>
        <div className="flex items-center justify-between">
          <Heading type="h2">{selectGrade ?? "select grade"}</Heading>
          <Select onValueChange={(e) => setSelectGrade(e.name)}>
            <SelectTrigger className="w-[200px] ">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem value={grade}>{grade.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Box className="grid grid-cols-12 gap-x-4">
          <div className="col-span-3">
            <div className="h-[300px] space-y-4 overflow-y-scroll border border-ring ">
              <p className="bg-gray-100 p-4">Subjects</p>
              <div className="flex flex-col">
                {subject.map((sub) => (
                  <span
                    key={sub.id}
                    className="my-1 border-x-2 bg-info/30 p-4 text-center"
                  >
                    {sub.name} {sub.type}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-[300px] space-y-4 overflow-y-scroll border border-ring ">
              <p className="bg-gray-100 p-4">Teachers</p>
              <div className="flex flex-col">
                {data.map((sub) => (
                  <span
                    key={sub.id}
                    className="my-1 border-x-2 bg-success/30 p-4 text-center"
                  >
                    {sub.firstName} {sub.lastName}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/*** Table */}

          <Box className="col-span-9 h-[80svh] w-full !space-y-0 overflow-y-auto ">
            <div className="grid h-[4svh] w-full grid-cols-7 text-center">
              <div className="col-span-1"></div>
              <div className="col-span-1">Mon</div>
              <div className="col-span-1  ">Tues</div>
              <div className="col-span-1  ">Wed</div>
              <div className="col-span-1  ">Thurs</div>
              <div className="col-span-1   ">Fri</div>
              <div className="col-span-1   ">Sat</div>
            </div>
            <div className="grid  h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">8:00</div>
              <div id="0_0" className="col-span-1  border border-ring "></div>
              <div id="0_1" className="col-span-1  border border-ring "></div>
              <div id="0_2" className="col-span-1 border border-ring  "></div>
              <div id="0_3" className="col-span-1 border border-ring  "></div>
              <div id="0_4" className="col-span-1 border border-ring   "></div>
              <div id="0_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">9:00</div>
              <div id="1_0" className="col-span-1 border border-ring "></div>
              <div id="1_1" className="col-span-1  border border-ring "></div>
              <div id="1_2" className="col-span-1 border border-ring  "></div>
              <div id="1_3" className="col-span-1 border border-ring  "></div>
              <div id="1_4" className="col-span-1 border border-ring   "></div>
              <div id="1_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">10:00</div>
              <div id="3_0" className="col-span-1  border border-ring "></div>
              <div id="3_1" className="col-span-1  border border-ring "></div>
              <div id="3_2" className="col-span-1 border border-ring  "></div>
              <div id="3_3" className="col-span-1 border border-ring  "></div>
              <div id="3_4" className="col-span-1 border border-ring   "></div>
              <div id="3_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">11:00</div>
              <div id="3_0" className="col-span-1  border border-ring "></div>
              <div id="3_1" className="col-span-1  border border-ring "></div>
              <div id="3_2" className="col-span-1 border border-ring  "></div>
              <div id="3_3" className="col-span-1 border border-ring  "></div>
              <div id="3_4" className="col-span-1 border border-ring   "></div>
              <div id="3_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">12:00 </div>
              <div id="4_0" className="col-span-1  border border-ring "></div>
              <div id="4_1" className="col-span-1  border border-ring "></div>
              <div id="4_2" className="col-span-1 border border-ring  "></div>
              <div id="4_3" className="col-span-1 border border-ring  "></div>
              <div id="4_4" className="col-span-1 border border-ring   "></div>
              <div id="4_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">13:00</div>
              <div id="5_0" className="col-span-1  border border-ring "></div>
              <div id="5_1" className="col-span-1  border border-ring "></div>
              <div id="5_2" className="col-span-1 border border-ring  "></div>
              <div id="5_3" className="col-span-1 border border-ring  "></div>
              <div id="5_4" className="col-span-1 border border-ring   "></div>
              <div id="5_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">14:00</div>
              <div id="6_0" className="col-span-1  border border-ring "></div>
              <div id="6_1" className="col-span-1  border border-ring "></div>
              <div id="6_2" className="col-span-1 border border-ring  "></div>
              <div id="6_3" className="col-span-1 border border-ring  "></div>
              <div id="6_4" className="col-span-1 border border-ring   "></div>
              <div id="6_5" className="col-span-1 border border-ring   "></div>
            </div>
            <div className="grid h-[10svh] w-full grid-cols-7">
              <div className="col-span-1 grid place-items-center">15:00</div>
              <div id="7_0" className="col-span-1  border border-ring "></div>
              <div id="7_1" className="col-span-1  border border-ring "></div>
              <div id="7_2" className="col-span-1 border border-ring  "></div>
              <div id="7_3" className="col-span-1 border border-ring  "></div>
              <div id="7_4" className="col-span-1 border border-ring   "></div>
              <div id="7_5" className="col-span-1 border border-ring   "></div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

ClassSchedule.getLayout = (ClassSchedule: React.ReactElement) =>
  layout(ClassSchedule, "SchoolAdmin");
export default ClassSchedule;
