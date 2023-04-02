import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
export const CanvasContainer = (props: ObjectWithUser) => {
  const { object, author } = props;
  return (
    <div key={object.id} className="flex gap-2 p-2">
      <span>{object.objectType}</span>
      <div className="flex items-center gap-1 rounded-md bg-zinc-700 p-1">
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
      </div>
    </div>
  );
};
