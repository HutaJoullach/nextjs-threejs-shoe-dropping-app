import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "~/utils/api";
import theme from "../styles/styles";
import { DogCanvas } from "~/components/canvas";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type ObjectWrapperProps = {
  objectType: string;
};

const ObjectWrapper = ({ objectType }: ObjectWrapperProps) => {
  const renderSwitch = () => {
    switch (objectType) {
      case "dog":
        return <DogCanvas />;
        break;
      case "cat":
        // return <CatCanvas />;
        break;
      default:
        return <div />;
        break;
    }
  };

  return <div className="">{renderSwitch()}</div>;
};

type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
export const ObjectContainer = (props: ObjectWithUser) => {
  const { object, author } = props;

  return (
    <div key={object.id} className="flex gap-2 p-2">
      {/* <span>{object.objectType}</span> */}
      <ObjectWrapper objectType={object.objectType} />
      {/* <div
        className={`${theme.rounded.utilityCardBorder} ${theme.bg.utilityCardBackground} flex h-[44px] items-center gap-1 p-1`}
      >
        <Image
          src={author.profileImageUrl}
          className="h-7 w-7 rounded-full"
          alt={`@${author.username}'s profile pic`}
          width={56}
          height={56}
        />
        <div className="flex flex-col text-xs font-bold text-slate-300">
          <Link href={`/sandbox/@${author.username}`}>
            <span>{`@${author.username}`}</span>
          </Link>
          <span className="flex justify-center font-thin">{`${dayjs(
            object.createdAt
          ).fromNow()}`}</span>
        </div>
      </div> */}
    </div>
  );
};
