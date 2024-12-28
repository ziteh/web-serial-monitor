import { useEffect, useState } from "react";
import ConfigSelect from "./config-select";
import { Button } from "../ui/button";
import { SerialPort } from "@/lib/serialport";

const baudRateItems = [
  { value: "9600" },
  { value: "19200" },
  { value: "38400" },
  { value: "57600" },
  { value: "115200" },
  { value: "921600" },
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

  const handleOpenPort = async () => {
    const port = SerialPort.getInstance();
    port.open(Number(baudRate), Number(dataBits), parity, Number(stopBits));
  };

  const handleClosePort = async () => {
    const port = SerialPort.getInstance();
    port.close();
  };

  const handleTest = async () => {
    console.log("tx: T");
    const port = SerialPort.getInstance();
    await port.write("T");
  };

  return (
    <>
      <Button onClick={handleOpenPort}>Open</Button>
      <Button onClick={handleClosePort}>Close</Button>
      <Button onClick={handleTest}>T</Button>
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
