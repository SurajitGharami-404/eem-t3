import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import AddRequestForm from "../_components/forms/add-request-form";

const TeacherAddRequestPage= () => {
  return (
    <>
    <Heading type="h1">Add Request</Heading>
    <Box>
        <AddRequestForm/>
    </Box>
    </>
  )
}
TeacherAddRequestPage.getLayout = (TeacherAddRequestPage: React.ReactElement) =>
  layout(TeacherAddRequestPage, "Teacher");
export default TeacherAddRequestPage;