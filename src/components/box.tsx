import { cn } from "~/lib/utils";
import React, { type ComponentPropsWithoutRef } from "react";


const Box = React.forwardRef<HTMLDivElement,ComponentPropsWithoutRef<"div">>(
    ({className,...props},ref)=>{
        return (
            <div className={cn("h-auto w-full space-y-6 p-6 shadow rounded bg-background dark:bg-secondary",className)} {...props} ref={ref}/>
        )
    })

Box.displayName = "Box"

export default Box;