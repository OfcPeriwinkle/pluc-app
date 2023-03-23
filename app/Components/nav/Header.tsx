"use client";

import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  links: { href: string; label: string }[];
}

export default function Header({ links }: HeaderProps) {
  // TODO: if user refreshes on non-home page, this state is incorrect
  // Likely fix: use React context, or lift up the state to layout!
  const [active, setActive] = useState(links[0].href);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      // TODO: having this as a flexbox is a little jank
      className={`${
        active === link.href
          ? "text-gray bg-green "
          : "text-white hover:text-gray-light"
      } flex justify-center items-center h-full px-4 text-2xl font-bold`}
      onClick={(event) => {
        setActive(link.href);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="flex justify-between items-center w-full h-16 mb-32 border-b-4 border-green">
      <div className="flex justify-start items-center h-full">{items}</div>
    </header>
  );
}
