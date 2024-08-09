"use client";

import { useContext } from "react";
import UserContext from "./UserContext";

// UserContext.tsx

export const getContextUserClient = () => {
  return useContext(UserContext);
};
