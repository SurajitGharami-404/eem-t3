import { type StaticImageData } from "next/image";



type TAttendanceItem = {
  data: number;
  label: string;
  className?: string;
};

type TNavLink = {
  label?: string;
  href: string;
  active?: string;
  icon: React.ReactElement;
};

type TDataCard = {
  title: string;
  data: number;
  icon: ReactElement;
  className?: string;
};


type TImageSrc = string|StaticImageData;