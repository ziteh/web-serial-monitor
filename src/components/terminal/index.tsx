import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SerialPortManager } from "@/lib/serialport";
import { useEffect, useState } from "react";
import MessageBlock from "./message-block";
import ScriptEditor from "@/components/script-editor";

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-send-2"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
      <path d="M6.5 12h14.5" />
    </svg>
  );
}

interface Massage {
  type: "tx" | "rx";
  message: string;
}

export default function Terminal() {
  const [port] = useState(SerialPortManager.getInstance());
  const [txMessage, setTxMessage] = useState("");
  const [msgHistory, setMsgHistory] = useState<Massage[]>([]);
  const [userScript, setUserScript] = useState("return raw;");
  const [rxCount, setRxCount] = useState(0);
  const [txCount, setTxCount] = useState(0);

  const handleSend = async () => {
    try {
      const scriptFunction = new Function("raw", userScript);
      const processedData = scriptFunction(new TextEncoder().encode(txMessage));
      await port.write(processedData);
      setMsgHistory((prev) => [...prev, { type: "tx", message: txMessage }]);
    } catch (err) {
      console.log(err);
    }

    setTxCount(port.txCount);
  };

  const handleClearCounter = () => {
    port.clearCount();
    setRxCount(0);
    setTxCount(0);
  };

  useEffect(() => {
    setRxCount(port.rxCount);
    setTxCount(port.txCount);

    const handleReceive = (v: Uint8Array) => {
      const newMessage = new TextDecoder().decode(v);
      setMsgHistory((prev) => [...prev, { type: "rx", message: newMessage }]);
      setRxCount(port.rxCount);
    };

    port.registerObserver(handleReceive);
    return () => port.removeObserver(handleReceive);
  }, [port]);

  return (
    <div className="flex flex-col h-screen gap-2 p-4">
      <ScrollArea className=" rounded-md border w-full flex-grow h-3/5">
        {msgHistory?.map((m, i) => (
          <MessageBlock key={i} type={m.type} message={m.message} />
        ))}
      </ScrollArea>
      <div className="flex w-full gap-2 h-1/5">
        <ScriptEditor onUserScriptChange={(s) => setUserScript(s)}>
          <Button className="h-full" variant="secondary">
            Script
          </Button>
        </ScriptEditor>
        <Textarea
          value={txMessage}
          onChange={(e) => setTxMessage(e.target.value)}
          placeholder="Send message"
          className="flex-grow resize-none terminal"
        />
        <Button className="h-full w-32" onClick={handleSend}>
          <SendIcon />
        </Button>
      </div>
      <div className="terminal flex w-full gap-14 justify-end items-stretch h-4  select-none">
        <div className="flex items-center text-sm">Rx: {rxCount}</div>
        <div className="flex items-center text-sm">Tx: {txCount}</div>
        <Button
          onClick={handleClearCounter}
          variant="ghost"
          className="h-full text-sm"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
