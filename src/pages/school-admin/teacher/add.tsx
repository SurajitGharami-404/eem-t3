import { layout } from "~/components/layouts/layout";
import AddTeacherForm from "../_components/forms/add-teacher-form";
import Box from "~/components/box";
import Heading from "~/components/heading";

const AddTeacherPage = () => {
  return (
    <>
      <Heading type="h1">Add Teacher</Heading>
      <Box>
        <AddTeacherForm />
      </Box>
    </>
  );
};

AddTeacherPage.getLayout = (AddTeacherPage: React.ReactElement) =>
  layout(AddTeacherPage, "SchoolAdmin");

export default AddTeacherPage;
