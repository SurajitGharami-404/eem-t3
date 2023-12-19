
import { cn } from '~/lib/utils';
import { type FC } from 'react'
import { type TAttendanceItem } from '~/lib/types/types';



const AttendanceItem: FC<TAttendanceItem> = ({data,label,className}) => {
  return (
    <div className={cn("flex items-center justify-evenly gap-x-6",className)}>
        <div className='data w-10 h-10 p-2 rounded-lg grid place-items-center bg-info/20 text-info text-lg'>{data}</div>
        <p className='font-montserrat font-medium truncate text-primary text-sm xl:text-base'>{label}</p>
    </div>
  )
}

export default AttendanceItem;