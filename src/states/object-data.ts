import { atom } from "jotai";

export const isDataRefetchedAtom = atom<boolean>(false);

interface objectDataToMutate {
  laces: string;
  mesh: string;
  caps: string;
  inner: string;
  sole: string;
  stripes: string;
  band: string;
  patch: string;
}

export const objectDataToMutateAtom = atom<objectDataToMutate | null>(null);
