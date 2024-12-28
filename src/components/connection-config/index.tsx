import { use, useEffect, useState } from "react";
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

  const [serialPort, setSerialPort] = useState();
  const [reader, setReader] = useState();
  const [writer, setWriter] = useState();

  const handleOpenPort = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({
      baudRate: Number(baudRate),
      dataBits: Number(dataBits),
      parity,
      stopBits: Number(stopBits),
      flowControl: "none",
      bufferSize: 255,
    });

    setSerialPort(port);
    setReader(port.readable.getReader());
    setWriter(port.writable.getWriter());

    // handleReadStream();
  };

  const handleClosePort = async () => {
    reader.cancel();
  };

  useEffect(() => {
    const fn = async () => {
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
      }

      reader.releaseLock();
      await serialPort.close();
    };

    fn();
  }, [reader]);

  const handleTest = async () => {
    console.log("tx: T");
    await writer.write(new TextEncoder().encode("T"));
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
