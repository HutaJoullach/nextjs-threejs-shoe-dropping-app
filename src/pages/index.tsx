import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { PageLayout } from "~/components/layout";
import Navbar from "~/components/navbar";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  // const { data, isLoading } = api.objects.getAll.useQuery();

  // if (isLoading) return <div>Loading...</div>;

  // if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <PageLayout>
        <div className="">
          <Navbar />
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
