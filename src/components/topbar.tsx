import { type FC,memo } from "react";
import TopbarLinks from "~/components/topbar-links";
import { type TNavLink } from "~/lib/types/nav";
import Image from "~/assets/Original on Transparent.png";
import Logo from "./logo";



interface Props {
  links:TNavLink[],
}

const Topbar: FC<Props> = ({links}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center py-4 px-6">
      <Logo imageUrl={Image} url="/super-admin/dashboard"/>
        <div className="flex-1 flex items-center justify-end gap-x-4">
          <TopbarLinks links={links} />
        </div>
      </nav>
    </header>
  );
};

export default memo(Topbar);