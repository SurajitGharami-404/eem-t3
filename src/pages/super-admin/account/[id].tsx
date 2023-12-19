import Box from "~/components/box";
import Heading from "~/components/heading";
import MetaTags from "~/components/meta-tags";
import { layout } from "~/components/layouts/layout";
import SchoolAccountDetailsForm from "../_components/school-account-details-form";


const SchholAccountByIdPage = () => {
  return (
    <>
    <MetaTags title="Demo School Account"/>
      <Heading type="h1">School Account Details</Heading>
      <Box>
        <SchoolAccountDetailsForm/>
      </Box>
    </>
  );
};


SchholAccountByIdPage.getLayout = (SchholAccountByIdPage:React.ReactElement)=>layout(SchholAccountByIdPage,"SuperAdmin")


export default SchholAccountByIdPage