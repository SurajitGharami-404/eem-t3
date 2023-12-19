import { type FC,memo } from "react";
import { type TNavLink } from "~/lib/types/nav";
import TopbarLink from "./topbar-link";


interface Props {
    links:TNavLink[]
}
 
const TopbarLinks: FC<Props> = ({links}) => {
    return ( 
        <div className="flex items-center gap-4">
            {
                links.map(({icon:Icon,...props},idx)=>(
                    <TopbarLink key={idx} icon={Icon} {...props}/>
                ))
            }
        </div>
     );
}
 
export default memo(TopbarLinks);