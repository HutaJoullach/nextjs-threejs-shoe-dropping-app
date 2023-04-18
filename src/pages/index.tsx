import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Link from "next/link";

import theme from "../styles/styles";
import { PageLayout } from "~/components/layout";
import { api } from "~/utils/api";

import { motion } from "framer-motion";
import StagCanvas from "~/components/canvas/stag";

const Home: NextPage = () => {
  const user = useUser();

  const Jumbotron = () => {
    return (
      <div className="relative mx-auto h-full w-full">
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
        <div className="h-3/4">
          <StagCanvas />
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className={`${theme.bg.navbarBackground}`} w-full>
        <div className="flex items-center justify-center py-2 text-white">
          <span>©2023 @hutajoullach</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageLayout>
        <Jumbotron />
        <Footer />
      </PageLayout>
    </>
  );
};

export default Home;
