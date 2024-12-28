import { useEffect } from "react";
import { SerialPort } from "./lib/serialport";
import Terminal from "./components/terminal";

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
