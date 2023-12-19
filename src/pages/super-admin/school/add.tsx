
import Box from "~/components/box";
import Heading from "~/components/heading";
import MetaTags from "~/components/meta-tags";
import AddSchoolForm from "../_components/add-school-form";
import { layout } from "~/components/layouts/layout";

const AddSchoolPage = () => {
  return (
    <>
    <MetaTags title="Add school page"/>
      <Heading type="h1">Add School</Heading>
      <Box>
        <AddSchoolForm />
      </Box>
    </>
  );
};


AddSchoolPage.getLayout = (AddSchoolpage:React.ReactElement)=>layout(AddSchoolpage,"SuperAdmin")


export default AddSchoolPage