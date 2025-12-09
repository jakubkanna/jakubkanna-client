import { resolveStaticData } from "./staticData";

export const fetchData = async <T>(path: string): Promise<T> => {
  const data = resolveStaticData(path);
  if (data === null || data === undefined) {
    throw new Error(`No static data found for path "${path}".`);
  }
  return data as T;
};
