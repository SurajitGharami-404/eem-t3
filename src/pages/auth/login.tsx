import Heading from "~/components/heading";
import SignInForm from "./_components/sign-in-form";
import AuthTemplate from "./_components/template";

const SignInPage= () => {
  return (
    <>
    <AuthTemplate>
      <Heading type="h1" className="text-2xl text-center mb-8">LOG IN</Heading>
      <SignInForm/>
    </AuthTemplate>
    </>
  )
}

export default SignInPage;