// UserContext.tsx
import { User } from "@/app/types/user";
import React, { createContext } from "react";

const UserContext = createContext<User | null>(null);

export default UserContext;
