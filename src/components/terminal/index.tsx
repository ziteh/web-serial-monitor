import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SerialPortManager } from "@/lib/serialport";
import { useEffect, useState } from "react";
import MessageBlock from "./message-block";

export default function Terminal() {
  const [port] = useState(SerialPortManager.getInstance());
  const [rxMessage, setRxMessage] = useState<string[]>([]);
  const [txMessage, setTxMessage] = useState("");

  const handleSend = async () => {
    await port.write(txMessage);
  };

  const handleReceive = (v: Uint8Array) => {
    setRxMessage((prev) => [...prev, new TextDecoder().decode(v)]);
  };

  useEffect(() => {
    port.registerObserver(handleReceive);
    return () => port.removeObserver(handleReceive);
  }, [port]);

  return (
    <div className="flex flex-col h-screen gap-2 p-4">
      <ScrollArea className=" rounded-md border w-full flex-grow h-4/5">
        {rxMessage?.map((v, i) => (
          <MessageBlock key={i} type="rx" message={v} />
        ))}
      </ScrollArea>
      <div className="flex w-full gap-2 h-1/5">
        <Textarea
          value={txMessage}
          onChange={(e) => setTxMessage(e.target.value)}
          placeholder="Send message"
          className="flex-grow resize-none terminal"
        />
        <Button className=" h-full" onClick={handleSend}>
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
          {/* Send */}
        </Button>
      </div>
    </div>
  );
}
