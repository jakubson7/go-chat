import { atom } from "recoil";

export interface ClientState {
  ID: string
  name: string | null
}

export const clientState = atom<ClientState>({
  key: "client",
  default: {
    // @ts-ignore
    ID: toString(Math.random()),
    name: null,
  },
})
