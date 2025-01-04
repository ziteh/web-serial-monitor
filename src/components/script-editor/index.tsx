import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children: React.ReactNode;
  onUserScriptChange?: (script: string) => void;
}

export default function ScriptEditor(props: Props) {
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [script, setScript] = useState(`
// JavaScript
// "raw" is type of "Uint8Array"

const checksum = raw.reduce((sum, val) => (sum + val) & 0xFF, 0);

const result = new Uint8Array(raw.length + 1);
result.set(raw);
result[raw.length] = checksum;

return result;
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
