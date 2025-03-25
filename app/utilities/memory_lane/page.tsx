import { playlistUtilityLookup } from "@/config/utilities";

export default function Page() {
  const description = playlistUtilityLookup["Memory Lane"];

  return (
    <div>
      <h1>Memory Lane</h1>
      <p>{description}</p>
    </div>
  );
}
