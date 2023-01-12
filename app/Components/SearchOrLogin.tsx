"use client";

import { useState } from "react";
import Login from "./Login";
import Search from "./Search";

export default function SearchOrLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle search bar or login button based on auth status
  return isLoggedIn ? <Search /> : <Login hasSignedIn={setIsLoggedIn} />;
}
