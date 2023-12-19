/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { cn } from '~/lib/utils'
import { type FC } from 'react'




const DataCard: FC<TDataCard> = ({title,data,icon:Icon,className}) => {
  return (
   <article className={cn('bg-background py-6 px-8 flex items-start justify-evenly gap-4 rounded shadow',className)}>
    <div className='icon bg-info/20 p-2 rounded-xl text-primary [&_svg]:h-10 [&_svg]:w-10 [&_svg]:text-info'>
      <Icon.type {...Icon.props} />
    </div>
    <div>
      <p className='title font-sans font-medium text-xl truncate capitalize'>{title}</p>
      <p className='data font-poppins font-semibold text-5xl truncate text-right capitalize text-info'>{data}</p>
    </div>
   </article>
  )
}

export default DataCard;