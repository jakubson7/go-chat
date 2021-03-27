import { atom } from "recoil"
import { User } from "src/types/auth"

export const userState = atom<User>({
  key: "client",
  default: {
    // @ts-ignore
    ID: toString(Math.random()),
    roomID: null,
    name: null,
  },
})
