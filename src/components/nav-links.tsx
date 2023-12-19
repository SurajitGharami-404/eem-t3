
import { type FC } from "react";
import { cn } from "~/lib/utils";
import NavLink from "./nav-link";

interface Props {
    links:TNavLink[]
}
 
const NavLinks: FC<Props> = ({links}) => {
    return ( 
        <ul className="h-[70svh] overflow-y-auto">
            {
                links.map(({label,icon:Icon,...props})=>(
                    <li 
                    key={label} 
                    className={cn(
                        "group cursor-pointer"
                    )}>
                        <NavLink label={label} icon={Icon} {...props}/>
                    </li>
                ))
            }
        </ul>
     );
}
 
export default NavLinks;