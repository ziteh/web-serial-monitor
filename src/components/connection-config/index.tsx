import { useState } from "react";
import { SerialPortManager } from "@/lib/serialport";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ConfigSelect from "./config-select";

const baudRateItems = [
  { value: "9600" },
  { value: "14400" },
  { value: "19200" },
  { value: "38400" },
  { value: "57600" },
  { value: "115200" },
  { value: "128000" },
  { value: "230400" },
  { value: "256000" },
  { value: "460800" },
  { value: "921600" },
  { value: "1500000" },
];

const dataBitsItems = [{ value: "7" }, { value: "8" }];

const parityItems = [
  { value: "none", label: "None" },
  { value: "even", label: "Even" },
  { value: "odd", label: "Odd" },
];

const stopBitsItems = [{ value: "1" }, { value: "2" }];

export default function ConnectionConfig() {
  const [baudRate, setBaudRate] = useState("9600");
  const [dataBits, setDataBits] = useState("8");
  const [parity, setParity] = useState("none");
  const [stopBits, setStopBits] = useState("1");
  const [connection, setConnection] = useState<"Open" | "Close">("Open");

  const handleConnection = () => {
    const port = SerialPortManager.getInstance();
    if (port.isConnected) {
      setConnection("Open");
      port.close();
    } else {
      setConnection("Close");
      port.open(Number(baudRate), Number(dataBits), parity, Number(stopBits));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 m-4">
        <Button onClick={handleConnection}>{connection}</Button>

        <div className="flex flex-col gap-2">
          <Label>Baud Rate</Label>
          <ConfigSelect
            value={baudRate}
            onValueChange={setBaudRate}
            items={baudRateItems}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Data Bits</Label>
          <ConfigSelect
            value={dataBits}
            onValueChange={setDataBits}
            items={dataBitsItems}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Parity</Label>
          <ConfigSelect
            value={parity}
            onValueChange={setParity}
            items={parityItems}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Stop Bits</Label>
          <ConfigSelect
            value={stopBits}
            onValueChange={setStopBits}
            items={stopBitsItems}
          />
        </div>
      </div>
    </>
  );
}
