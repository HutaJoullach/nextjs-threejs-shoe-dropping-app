import { SignUp } from "@clerk/nextjs";
import { type NextPage } from "next";

import { PageLayout } from "~/components/layout";

const Signup: NextPage = () => (
  <PageLayout>
    <div className="flex h-full w-full items-center justify-center">
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  </PageLayout>
);

export default Signup;
