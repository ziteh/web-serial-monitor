import { useEffect } from "react";
import Terminal from "./components/terminal";
import { SerialPort } from "./lib/serialport";

export default function App() {
  useEffect(() => {
    if (!SerialPort.isSupported) {
      alert("This browser does not support Web Serial API");
    }
  }, []);

  return (
    <>
      <Terminal />
    </>
  );
}
