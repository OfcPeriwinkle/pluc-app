"use client";

import { useSession } from "next-auth/react";

import Login from "./Login";
import Search from "./Search";

export default function SearchOrLogin() {
  const { data: session } = useSession();
  console.log(session);

  return session ? <Search /> : <Login />;
}
