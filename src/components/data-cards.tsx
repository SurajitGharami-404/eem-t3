import { type FC } from 'react'
import DataCard from './data-card';


interface Props {
cards:TDataCard[]
}

const DataCards: FC<Props> = ({cards}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-6">
        {
            cards.map((card,key)=>(
                <DataCard {...card} key={key}/>
            ))
        }
    </div>
  )
}

export default DataCards;