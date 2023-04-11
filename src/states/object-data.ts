import { atom } from "jotai";

export const isDataRefetchedAtom = atom<boolean>(false);

// interface objectDataToMutate {
//   laces: string;
//   mesh: string;
//   caps: string;
//   inner: string;
//   sole: string;
//   stripes: string;
//   band: string;
//   patch: string;
// }

// export const objectDataToMutateAtom = atom<objectDataToMutate>({
//   laces: "",
//   mesh: "",
//   caps: "",
//   inner: "",
//   sole: "",
//   stripes: "",
//   band: "",
//   patch: "",
// });

export const objectDataToMutateAtom = atom({ laces: "" });
