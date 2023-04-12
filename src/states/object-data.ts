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

// export const bandDataToMutateAtom = atom({ band: "" });
// export const capsDataToMutateAtom = atom({ caps: "" });
// export const innerDataToMutateAtom = atom({ inner: "" });
// export const lacesDataToMutateAtom = atom({ laces: "" });
// export const meshDataToMutateAtom = atom({ mesh: "" });
// export const patchDataToMutateAtom = atom({ patch: "" });
// export const soleDataToMutateAtom = atom({ sole: "" });
// export const stripesDataToMutateAtom = atom({ stripes: "" });

export const bandDataToMutateAtom = atom("");
export const capsDataToMutateAtom = atom("");
export const innerDataToMutateAtom = atom("");
export const lacesDataToMutateAtom = atom("");
export const meshDataToMutateAtom = atom("");
export const patchDataToMutateAtom = atom("");
export const soleDataToMutateAtom = atom("");
export const stripesDataToMutateAtom = atom("");

export const isCowOpenedAtom = atom<boolean>(false);
export const isMainCanvasMountedAtom = atom<boolean>(true);
