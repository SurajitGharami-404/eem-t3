import Box from "~/components/box";
import Heading from "~/components/heading";
import MetaTags from "~/components/meta-tags";
import { layout } from "~/components/layouts/layout";
import SchoolPaymentDetailsForm from "../_components/school-payment-details-form";



const SchholPaymentByIdPage = () => {
  return (
    <>
    <MetaTags title="Demo School Payment"/>
      <Heading type="h1">School Payment Details</Heading>
      <Box>
        <SchoolPaymentDetailsForm/>
      </Box>
    </>
  );
};


SchholPaymentByIdPage.getLayout = (SchholPaymentByIdPage:React.ReactElement)=>layout(SchholPaymentByIdPage,"SuperAdmin")


export default SchholPaymentByIdPage