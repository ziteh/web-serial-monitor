import { useEffect } from "react";
import { useRouter } from "./context/router";
import { SerialPortManager } from "./lib/serialport";
import ScriptsPage from "./pages/scripts";
import TerminalPage from "./pages/terminal";

export default function App() {
  const { currentRoute } = useRouter();

  useEffect(() => {
    if (!SerialPortManager.isSupported) {
      alert("This browser does not support Web Serial API");
    }
  }, []);

  return (
    <>
      {currentRoute === "/" && <TerminalPage />}
      {currentRoute === "/page2" && <ScriptsPage />}
    </>
  );
}
