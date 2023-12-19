import { layout } from "~/components/layouts/layout";
import AddStudentForm from "../_components/forms/add-student-form";
import Box from "~/components/box";
import Heading from "~/components/heading";

const AddStudentPage = () => {
  return (
    <>
      <Heading type="h1">Add Student</Heading>
      <Box>
        <AddStudentForm />
      </Box>
    </>
  );
};

AddStudentPage.getLayout = (AddStudentPage: React.ReactElement) =>
  layout(AddStudentPage, "SchoolAdmin");

export default AddStudentPage;
