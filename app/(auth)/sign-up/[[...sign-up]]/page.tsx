import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} routing="hash"/>;
}