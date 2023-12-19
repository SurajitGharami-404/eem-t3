

import { useHideStore } from "~/config/hide-store";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC,memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";





const NavLink: FC<TNavLink> = ({
  label,
  icon: Icon,
  href,
  active:activeLink
}) => {
  const { hide } = useHideStore();
  const pathname = usePathname();
  const active = pathname?.includes(activeLink);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            prefetch={false}
            className={cn(
              `
                w-full h-max
                inline-flex items-center gap-6
                font-poppins font-medium text-sm text-slate-400 capitalize p-3 rounded-md
                transition
                [&-svg]:text-2xl
                hover:text-success/90
               `,
              active && `text-success bg-success/10`,
              hide && "justify-center"
            )}
          >
            <Icon.type {...Icon.props} />
            <span hidden={hide} className="truncate">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent 
        side="left"
        className={cn(
          "hidden",
          hide&&"block"
        )}>
          <p className="capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default memo(NavLink);
