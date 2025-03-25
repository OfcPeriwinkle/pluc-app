import { PlaylistUtility } from "@/types/dashboard";

export const playlistUtilities: PlaylistUtility[] = [
  {
    title: "Duplicate Remover",
    description:
      "Find duplicate tracks in your playlists and choose which ones to remove.",
    href: "/utilities/duplicate_remover",
  },
  {
    title: "Playlist Generator",
    description: "Describe your vibe and generate a playlist to match it.",
    href: "/utilities/playlist_generator",
  },
  {
    title: "Blogify",
    description:
      "Sometimes a song is worth a thousand words, what about playlists?",
    href: "/utilities/blogify",
  },
  {
    title: "Memory Lane",
    description: "See what your soundtrack was like in days gone by.",
    href: "/utilities/memory_lane",
  },
  {
    title: "Seasonify",
    description: "Generate a playlist based on what you liked each season.",
    href: "/utilities/seasonify",
  },
];

export const playlistUtilityLookup = playlistUtilities.reduce(
  (lookup, utility) => {
    lookup[utility.title] = utility.description;
    return lookup;
  },
  {} as Record<string, string>,
);
