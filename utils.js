import { Platform } from "react-native";

export const getDeepLink = (path = "") => {
  const scheme = "mobilepoc";
  const prefix =
    Platform.OS == "android" ? `${scheme}://my-host/` : `${scheme}://welcome`;
  return prefix + path;
};
