'use client'

import { Button } from "~/components/ui/button";
import { useHideStore } from "~/config/hide-store";
import { cn } from "~/lib/utils";
import { PanelRight } from "lucide-react";


 
const ToggleHide = () => {
    const { hide,toggleHide } = useHideStore();
    return ( 
        <Button 
        onClick={toggleHide} 
        className={cn(
            "w-full gap-2 capitalize font-poppins transition text-slate-700 bg-success hover:bg-success-hover dark:bg-secondary dark:text-success",
        )} 
        >
            <span><PanelRight className="text-2xl"/></span> 
            <span hidden={hide}>close</span>
        </Button>
     );
}
 
export default ToggleHide;