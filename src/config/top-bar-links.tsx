import { BellIcon, MailPlusIcon } from "lucide-react";
import { type TNavLink } from "~/lib/types/nav";


export const superAdminTopBarLinks:TNavLink[] = [
    {
        href: "/super-admin/create-mail",
        icon: <MailPlusIcon/>,
      },
      {
        href: "/super-admin/notifications",
        icon: <BellIcon/>,
      },
]
export const teacherTopBarLinks:TNavLink[] = [
    {
        href: "/teacher/create-mail",
        icon: <MailPlusIcon/>,
      },
      {
        href: "/teacher/notifications",
        icon: <BellIcon/>,
      },
]
export const schoolAdminTopBarLinks:TNavLink[] = [
    {
        href: "/teacher/create-mail",
        icon: <MailPlusIcon/>,
      },
      {
        href: "/teacher/notifications",
        icon: <BellIcon/>,
      },
]
