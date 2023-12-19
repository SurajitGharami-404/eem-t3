
import type { ReactElement } from "react";
import SuperAdminLayout from "./super-admin-layout";
import SchoolAdminLayout from "./school-admin-layout";
import TeacherLayout from "./teacher-layout";






const Layouts = {
  SuperAdmin: SuperAdminLayout,
  SchoolAdmin: SchoolAdminLayout,
  Teacher: TeacherLayout
};

type layoutKey = keyof typeof Layouts;

function layout(page: ReactElement, layoutKey: layoutKey) {
  const Layout = Layouts[layoutKey];

  return <Layout>{page}</Layout>
}

export { layout, type layoutKey };