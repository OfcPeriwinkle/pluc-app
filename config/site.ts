export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Pluc",
  description: "Spotify Playlist Utilities Collection.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/OfcPeriwinkle/pluc-app",
  },
};
