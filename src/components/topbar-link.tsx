"use client";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FC,
  memo,
} from "react";

interface Props {
  icon:React.ReactElement
  href: string;
  className?: string;
}
const TopbarLink: FC<Props> = ({
  href,
  className,
  icon:Icon,
}) => {
  const pathname = usePathname();
  const active = pathname===href;

  
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        `
            text-2xl text-slate-400 
            transition
            hover:text-success
        `,
        active &&
          `
        [&-svg]:text-success [&-svg]:fill-success
        `,
        className
      )}
    >
      <Icon.type {...Icon.props}/>
    </Link>
  );
};

export default memo(TopbarLink)