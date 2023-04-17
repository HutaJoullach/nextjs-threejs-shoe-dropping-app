import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Link from "next/link";

import theme from "../styles/styles";
import { PageLayout } from "~/components/layout";
import { api } from "~/utils/api";

import { motion } from "framer-motion";
import DogCanvas from "~/components/canvas/dog";

const Home: NextPage = () => {
  const user = useUser();

  // const { data, isLoading } = api.objects.getAll.useQuery();

  // if (isLoading) return <div>Loading...</div>;

  // if (!data) return <div>Something went wrong</div>;

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
        <DogCanvas />
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
