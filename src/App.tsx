import { useEffect } from "react";
import Terminal from "./components/terminal";

export default function App() {
  useEffect(() => {
    if (!("serial" in navigator)) {
      alert("This browser does not support Web Serial API");
    }
  }, []);

  return (
    <>
      <Terminal />
    </>
  );
}
