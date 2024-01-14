import { atom } from "recoil";

const authState = atom({
  key: "authState",
  default: false,
});

const errorState = atom({
  key: "errorState",
  default: {
    status: false,
    message: "",
  },
});

const successState = atom({
  key: "successState",
  default: {
    status: false,
    message: "",
  },
});

const loadingState = atom({
  key: "loadingState",
  default: true,
});

export { authState, errorState, successState, loadingState };
