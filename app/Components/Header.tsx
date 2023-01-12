"use client";

import { useState } from "react";

interface HeaderProps {
  links: { link: string; label: string }[];
}

export default function Header({ links }: HeaderProps) {
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      // TODO: having this as a flexbox is a little jank
      className={`${
        active === link.link
          ? "text-gray bg-green"
          : "text-gray-light hover:text-white"
      } flex justify-center items-center h-full px-4 text-2xl font-bold`}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="flex justify-between items-center w-full h-16 mb-32 border-b-4 border-green">
      <div className="flex justify-start items-center h-full">{items}</div>
    </header>
  );
}
