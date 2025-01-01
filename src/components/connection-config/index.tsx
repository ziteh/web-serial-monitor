import { useState } from "react";
import { useRouter } from "@/context/router";
import { SerialPortManager } from "@/lib/serialport";
import { Button } from "@/components/ui/button";
import ConfigSelect from "./config-select";

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

  const { navigate } = useRouter();

  const handleOpenPort = async () => {
    const port = SerialPortManager.getInstance();
    port.open(Number(baudRate), Number(dataBits), parity, Number(stopBits));
  };

  const handleClosePort = async () => {
    const port = SerialPortManager.getInstance();
    port.close();
  };

  return (
    <>
      <Button onClick={handleOpenPort}>Open</Button>
      <Button onClick={handleClosePort}>Close</Button>
      <Button onClick={() => navigate("/")}>Go to Page 1</Button>
      <Button onClick={() => navigate("/page2")}>Go to Page 2</Button>

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
