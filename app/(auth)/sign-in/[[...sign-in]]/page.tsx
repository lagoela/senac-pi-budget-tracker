import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL} routing="hash"/>;
}