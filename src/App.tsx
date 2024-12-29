import { useEffect } from "react";
import { SerialPortManager } from "./lib/serialport";
import Terminal from "./components/terminal";
import { useRouter } from "./context/router";
import ScriptsPage from "./pages/scripts";

export default function App() {
  const { currentRoute } = useRouter();

  useEffect(() => {
    if (!SerialPortManager.isSupported) {
      alert("This browser does not support Web Serial API");
    }
  }, []);

  return (
    <>
      {currentRoute === "/" && <Terminal />}
      {currentRoute === "/page2" && <ScriptsPage />}
    </>
  );
}
