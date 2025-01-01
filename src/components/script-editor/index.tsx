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

type userScript = (raw: Uint8Array) => Uint8Array;

interface Props {
  children: React.ReactNode;
  onUserScriptChange?: (script: string) => void;
}

export default function ScriptEditor(props: Props) {
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [script, setScript] = useState(`
if (raw && raw[0] === 0x41) {
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
    const scriptFunction = new Function("raw", script);
    const input = new TextEncoder().encode(testInput);
    const processedData = scriptFunction(input);
    setTestOutput(new TextDecoder().decode(processedData));

    if (props.onUserScriptChange) {
      props.onUserScriptChange(script);
    }
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
        <DialogTrigger>{props.children}</DialogTrigger>
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
