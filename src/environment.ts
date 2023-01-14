import { homeDir } from "@tauri-apps/api/path";

const homeDirPath = await homeDir();

export const environment = {
  homeDirPath,
};
