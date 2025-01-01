import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ScriptEditor() {
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [script, setScript] = useState(`
if (raw[0] === 0x41) {
  raw[0] = 0x42;
}
return raw;
`);

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
    const processedData = userScript(new TextEncoder().encode(testInput));
    setTestOutput(new TextDecoder().decode(processedData));
  };

  useEffect(() => {
    const savedScript = localStorage.getItem("script");
    if (savedScript) {
      setScript(savedScript);
    }
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Script Editor</DialogTitle>
          </DialogHeader>
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="terminal"
          />
          <Input
            placeholder="Input"
            onChange={(e) => setTestInput(e.target.value)}
          />
          <Input placeholder="Output" value={testOutput} readOnly />
          <Button onClick={handleRunScript}>Test</Button>
          <Button onClick={handleSaveScript}>Save</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
