import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { PageLayout } from "~/components/layout";
import Navbar from "~/components/navbar";
import theme from "../styles/styles";
import { api } from "~/utils/api";

import { motion } from "framer-motion";

const Home: NextPage = () => {
  const user = useUser();

  // const { data, isLoading } = api.objects.getAll.useQuery();

  // if (isLoading) return <div>Loading...</div>;

  // if (!data) return <div>Something went wrong</div>;

  const Jumbotron = () => {
    return (
      <div className="relative mx-auto w-full">
        <div>hey</div>
      </div>
    );
  };

  return (
    <>
      <PageLayout>
        <Jumbotron />
      </PageLayout>
    </>
  );
};

export default Home;
