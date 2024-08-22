import { createContext, useState } from "react";
export const Menu = createContext("");
export default function MenuContext({ children }) {
  const [isOpen, SetOpen] = useState(true);

  return <Menu.Provider value={{ isOpen, SetOpen }}>{children}</Menu.Provider>;
}
