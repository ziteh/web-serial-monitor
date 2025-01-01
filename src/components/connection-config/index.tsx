import { useState } from "react";
import { SerialPortManager } from "@/lib/serialport";
import { Button } from "@/components/ui/button";
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
      <Button onClick={handleConnection}>{connection}</Button>

      <ConfigSelect
        value={baudRate}
        onValueChange={setBaudRate}
        items={baudRateItems}
      />
      <ConfigSelect
        value={dataBits}
        onValueChange={setDataBits}
        items={dataBitsItems}
      />
      <ConfigSelect
        value={parity}
        onValueChange={setParity}
        items={parityItems}
      />
      <ConfigSelect
        value={stopBits}
        onValueChange={setStopBits}
        items={stopBitsItems}
      />
    </>
  );
}
