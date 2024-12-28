import { useState } from "react";
import ConfigSelect from "./config-select";
import { Button } from "../ui/button";

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

  const onListPorts = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({
      baudRate: Number(baudRate),
      dataBits: Number(dataBits),
      parity,
      stopBits: Number(stopBits),
      flowControl: "none",
      bufferSize: 255,
    });
    const writer = port.writable.getWriter();
    await writer.write(new Uint8Array([0x01, 0x03, 0x00, 0x00, 0x00]));

    const reader = port.readable.getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }
        console.log("rx:", value);
      }
    } catch (err) {
      console.error(err);
    } finally {
      reader.releaseLock();
    }

    await port.close();
  };

  return (
    <>
      <Button onClick={onListPorts}>List Ports</Button>
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
