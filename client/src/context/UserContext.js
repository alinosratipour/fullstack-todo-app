import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();
function UserContext() {
  const [user, setUser] = useState([]);
}

export default UserContext;
