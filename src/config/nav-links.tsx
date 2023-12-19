import {
    LayoutDashboardIcon,
    FileClockIcon,
    SchoolIcon,
    UserCogIcon,
    CalendarDaysIcon,
    FileIcon,
    Users2,
    UserSquare2,
    ListOrdered,
    ListChecks,
    BookMarkedIcon,
    LogOut
  } from "lucide-react";
import { type TNavLink } from "~/lib/types/types";



  export const superAdminNavLinks: TNavLink[] = [
    {
      label: "dashboard",
      href: "/super-admin/dashboard",
      icon: <LayoutDashboardIcon/>,
      active:"/dashboard"
    },
    {
      label: "school",
      href: "/super-admin/school/list",
      icon: <SchoolIcon/>,
      active:"/school"
    },
    {
      label: "account management",
      href: "/super-admin/account/list",
      icon: <UserCogIcon/>,
      active:"/account"
    },
    {
      label: "payment history",
      href: "/super-admin/payment/list",
      icon: <FileClockIcon/>,
      active:"/payment"
    },
    {
      label:"log out",
      href:"/auth/sign-out",
      icon:<LogOut/>
    }
  ];
  
  
  export const teacherNavLinks: TNavLink[] = [
    {
      label: "dashboard",
      href: "/teacher/dashboard",
      icon: <LayoutDashboardIcon/>,
      active:"/dashboard"
    },
    {
      label: "My schedule",
      href: "/teacher/schedule",
      icon: <CalendarDaysIcon/>,
      active:"/schedule"
    },
    {
      label: "notes",
      href: "/teacher/note/list",
      icon: <FileIcon/>,
      active:"/note"
    },
    {
      label: "requests",
      href: "/teacher/request/list",
      icon: <BookMarkedIcon/>,
      active:"/request"
    },
    {
      label:"log out",
      href:"/auth/sign-out",
      icon:<LogOut/>
    }
  ];
  export const schoolAdminNavLinks: TNavLink[] = [
    {
      label: "dashboard",
      href: "/school-admin/dashboard",
      icon: <LayoutDashboardIcon/>,
      active:"/dashboard"
    },
    
    {
      label: "students",
      href: "/school-admin/student/list",
      icon: <Users2/>,
      active:"/student"
    },
    {
      label: "teachers",
      href: "/school-admin/teacher/list",
      icon: <UserSquare2/>,
      active:"/teacher"
    },
    {
      label: "subject list",
      href: "/school-admin/subject/add",
      icon: <ListChecks/>,
      active:"/subject"
    },
    
    {
      label: "grade list",
      href: "/school-admin/grade/add",
      icon: <ListOrdered/>,
      active:"/grade"
    },
    {
      label: "class schedule",
      href: "/school-admin/class-schedule",
      icon: <CalendarDaysIcon/>,
      active:"/class-schedule"
    },
    {
      label:"log out",
      href:"/auth/sign-out",
      icon:<LogOut/>
    }
  ];