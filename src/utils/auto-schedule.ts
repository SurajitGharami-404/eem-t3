import { scheduler } from "timers/promises"
import { subjectColumns } from "~/pages/school-admin/_components/tables/subject/columns"

totalSchedule=[data fetch from schedule database]
gradeSchedule=[]
grade=input value from user
teacherList=[]
day=[1,2,3,4,5,6]
time=[1,2,3,4,5,6,7,8]
teacher=null

grade-subject

grade-teacher



for(day=1; day<7; day++)
{
	teacherList=[fetch teacher data from teacher table where grade value is grade]
	for(time=1; time<9; time++)
	{
		if(teacherList.isEmpty())
		{
			teacherList=[fetch teacher data from teacher table where grade value is grade]
		}
		teacher=random(teacherList)
		if(totalSchedule)
		{
for(i=0; i<totalSchedule.length; I++)
			{
				if(totalSchedule[I].time==time && totalSchedule[I].day==day && totalSchedule[I].teacher==teacher)
				{
					while()
					{
						teacher=random(teacherList)
						if(totalSchedule[I].teacher!=teacher)
						{
							break;
						}
					}
				}
			}
		} 
		gradeSchedule.add(grade, teacher, subject, day, time)
		teacherList.remove(teacher)
	}
}