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
        <div
          className={`${theme.p.x.sm} mx-auto flex flex-row items-start gap-5`}
        >
          <div>
            <h2
              className={`${theme.font.customTypography.heroHeaderText} text-white`}
            >
              Hi, I'm{" "}
              <span className={`${theme.font.color.keyword}`}>huta</span>
            </h2>
            <p
              className={`${theme.font.customTypography.heroSubText} ${theme.font.color.primary} pt-2`}
            >
              I develop React, React Native <br className="hidden sm:block" />
              web applications and Node.js, Go backend
            </p>
          </div>
        </div>

        <div>3d model here</div>
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
