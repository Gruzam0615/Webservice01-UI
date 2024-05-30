import { atom } from "recoil";

export const signState = atom({
    key: "signInState",
    default: {
      username: null,
      Authorization: null,
      status: false,
      passwordInputStatus: true,
    }
})