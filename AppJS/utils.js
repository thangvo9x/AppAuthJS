import { Platform } from "react-native";

export const getDeepLink = (path = "") => {
  const scheme = "mobilepoc";
  const prefix = `${scheme}://welcome`;
  return prefix + path;
};