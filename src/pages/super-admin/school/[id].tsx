import Box from "~/components/box";
import { layout } from "~/components/layouts/layout";
import EditSchoolForm from "../_components/school-details-form";
import { type GetServerSidePropsContext } from "next";
import { db } from "~/server/db";
import MetaTags from "~/components/meta-tags";
import Heading from "~/components/heading";

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id as string;

  const school = await db.school.findUnique({
    where: {
      id,
    },
    include: {
      address: true,
    },
  });

  const details = {
    id:school?.id,
    name: school?.name,
    email: school?.email,
    contactNumber: school?.contactNumber,
    address: school?.address.address,
    city: school?.address.city,
    state: school?.address.state,
    country: school?.address.country,
    pinCode: school?.address.pinCode,
  };

  return {
    props: {
      details,
    },
  };
};

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const schools = await db.school.findMany();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = schools.map((school) => ({
    params: { id: school.id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

type Details = {
  id?:string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  pinCode: string;
};

const SchoolDetailsByIdPage = ({ details }: { details: Details }) => {
  return (
    <>
      <MetaTags title={details.name} />
      <Heading type="h1" className="col-span-6">
        School Name: {details.name}
      </Heading>
      <Box>
        <EditSchoolForm defaultValues={details} />
      </Box>
    </>
  );
};

SchoolDetailsByIdPage.getLayout = (SchoolDetailsByIdPage: React.ReactElement) =>
  layout(SchoolDetailsByIdPage, "SuperAdmin");

export default SchoolDetailsByIdPage;
