import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { signIn } from "@/auth";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Keep the tunes,&nbsp;</span>
        <br />
        <span className={title({ color: "green" })}>pluc the noise.&nbsp;</span>
        <div className={subtitle({ class: "mt-4" })}>
          Playlist Utilities for Spotify
        </div>
      </div>

      <div className="flex gap-3">
        <form
          action={async () => {
            "use server";
            await signIn("spotify");
          }}
        >
          <button
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            type="submit"
          >
            Sign in with Spotify
          </button>
        </form>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
