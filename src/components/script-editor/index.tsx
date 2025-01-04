import React, { useEffect, useRef, useState } from "react";
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

const defaultScript = `// JavaScript
// "raw" is type of "Uint8Array"

const checksum = raw.reduce((sum, val) => (sum + val) & 0xFF, 0);

const result = new Uint8Array(raw.length + 1);
result.set(raw);
result[raw.length] = checksum;

return result;
`;

interface Props {
  children: React.ReactNode;
  onUserScriptChange?: (script: string) => void;
}

export default function ScriptEditor(props: Props) {
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [script, setScript] = useState(defaultScript);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSaveScript = () => {
    localStorage.setItem("script", script);
    if (props.onUserScriptChange) {
      props.onUserScriptChange(script);
    }
  };

  const handleRunScript = () => {
    if (!iframeRef.current) return;

    // Send test data and script
    const encodedInput = new TextEncoder().encode(testInput);
    iframeRef.current.contentWindow?.postMessage(
      { script, input: encodedInput },
      "*",
    );
  };

  const handleResetUserScript = () => {
    setScript(defaultScript);
    localStorage.setItem("script", defaultScript);
  };

  useEffect(() => {
    const savedScript = localStorage.getItem("script");
    if (savedScript) {
      setScript(savedScript);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "result") {
        try {
          const decodedOutput = new TextDecoder().decode(event.data.output);
          setTestOutput(decodedOutput);
        } catch (err) {
          setTestOutput(`Error decoding output. ${err}`);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Script Editor</DialogTitle>
          </DialogHeader>
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="terminal min-h-64"
          />
          <Input
            placeholder="Input"
            onChange={(e) => setTestInput(e.target.value)}
          />
          <Input placeholder="Output" value={testOutput} readOnly />
          <Button onClick={handleRunScript}>Test</Button>
          <Button onClick={handleSaveScript}>Save</Button>
          <Button onClick={handleResetUserScript}>Reset</Button>

          {/* Sandboxed iframe */}
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts"
            srcDoc={`
              <script>
                window.addEventListener('message', (event) => {
                  const { script, input } = event.data;
                  try {
                    const userFunction = new Function('raw', script);
                    const result = userFunction(new Uint8Array(input));
                    parent.postMessage({ type: 'result', output: result }, '*');
                  } catch (error) {
                    parent.postMessage({ type: 'result', output: 'Error: ' + error.message }, '*');
                  }
                });
              </script>
            `}
            style={{ display: "none" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
