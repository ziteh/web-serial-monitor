import { useEffect } from "react";
import { SerialPortManager } from "./lib/serialport";
import Terminal from "./components/terminal";

export default function App() {
  useEffect(() => {
    if (!SerialPortManager.isSupported) {
      alert("This browser does not support Web Serial API");
    }
  }, []);

  return (
    <>
      <Terminal />
    </>
  );
}
