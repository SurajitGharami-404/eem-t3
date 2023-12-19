
import { type FC } from "react";
import NavLinks from "./nav-links";
import ToggleHide from "./toggle-hide";
import { useHideStore } from "~/config/hide-store";
import { cn } from "~/lib/utils";


interface Props {
  links: TNavLink[];
}

const SideBar: FC<Props> = ({ links }) => {
  const { hide } = useHideStore();
  return (
    <aside
      className={cn(
        ` sticky top-16 z-20 hidden h-[calc(100vh-4rem)]
          basis-[20%] border-r border-r-border bg-background/80 
          py-6 px-3 shadow
          md:flex md:flex-col md:gap-y-10`,
        hide && "basis-[5%]",
      )}
    >
      <NavLinks links={links} />
      <div className="absolute bottom-4 left-4 right-4">
        <ToggleHide />
      </div>
    </aside>
  );
};

export default SideBar;
