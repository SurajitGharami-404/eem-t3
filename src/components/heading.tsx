import { cn } from "~/lib/utils";
import { type ReactNode, type FC } from "react";

interface Props {
  type: string;
  className?: string;
  children: ReactNode;
}

const Heading: FC<Props> = ({ type, className, children }) => {
  switch (type) {
    case "h1":
      return <h1 className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</h1>;
    case "h2":
      return <h2 className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</h2>;
    case "h3":
      return <h3 className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</h3>;
    case "h4":
      return <h4 className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</h4>;
    case "h5":
      return <h5 className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</h5>;
    case "p":
      return <p className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</p>;
    default:
      return <p className={cn("font-medium font-poppins text-info text-lg tracking-wide truncate capitalize",className)}>{children}</p>;
  }
};

export default Heading;
