import { title, subtitle } from "@/components/primitives";

import UtilityCard from "@/components/dashboard/utility-card";
import { playlistUtilities } from "@/config/utilities";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Available Utilities&nbsp;</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Click or tap a utility to get started.
        </div>
      </div>

      <ul className="flex flex-col items-center gap-4 md:grid md:grid-cols-3 md:gap-8 md:mt-8">
        {playlistUtilities.map(({ title, description, href }) => (
          <li key={title}>
            <UtilityCard title={title} description={description} href={href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
