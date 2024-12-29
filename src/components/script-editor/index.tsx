import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UserScript {
  title: string;
  func: (raw: Uint8Array) => Uint8Array;
}

export default function ScriptEditor() {
  const [script, setScript] = useState(`
    if (raw[0] === 0x01) {
      raw[0] = 0x0F;
}
      return raw;`);

  const handleSaveScript = async () => {
    const userScript = new Function("raw", script);
    if (typeof userScript !== "function") {
      alert("Invalid script");
      return;
    }

    localStorage.setItem("script", script);
  };

  const handleRunScript = async () => {
    const userScript = new Function("raw", script);
    const processedData = userScript(new Uint8Array([0x01, 0x02, 0x03]));
    console.log(processedData);
  };

  useEffect(() => {
    const savedScript = localStorage.getItem("script");
    if (savedScript) {
      setScript(savedScript);
    }
  }, []);

  return (
    <>
      <Button onClick={handleSaveScript}>Save</Button>
      <Textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        className="terminal"
      />
      <Input placeholder="Title" value="A123" />
      <Button onClick={handleRunScript}>Run</Button>
    </>
  );
}
