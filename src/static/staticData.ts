import posts from "./posts.json";
import works from "./works.json";
import profile from "./profile.json";
import preferences from "./preferences.json";

export const staticData = {
  posts,
  works,
  profile,
  preferences,
} as const;

export type StaticData = typeof staticData;
