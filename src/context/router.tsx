import React, { createContext, useContext, useState } from "react";

interface RouterContextType {
  currentRoute: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<string>(
    window.location.pathname,
  );

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentRoute(path);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}
