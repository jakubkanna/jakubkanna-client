import { staticData } from "../static/staticData";

const getSlug = (path: string, prefix: string) =>
  path.slice(prefix.length).replace(/^\//, "");

const stripQuery = (path: string) => path.split("?")[0].replace(/^\//, "");

export const resolveStaticData = (path: string) => {
  const cleanPath = stripQuery(path);

  if (cleanPath === "posts") return staticData.posts;
  if (cleanPath.startsWith("posts/")) {
    const slug = getSlug(cleanPath, "posts/");
    return staticData.posts.find((post) => post?.general?.slug === slug) ?? null;
  }

  if (cleanPath === "works") return staticData.works;
  if (cleanPath.startsWith("works/")) {
    const slug = getSlug(cleanPath, "works/");
    return staticData.works.find((work) => work?.general?.slug === slug) ?? null;
  }

  if (cleanPath.startsWith("profile")) return staticData.profile;

  if (cleanPath.startsWith("preferences")) return staticData.preferences;

  return null;
};
