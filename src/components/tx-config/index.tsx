import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";

export default function TxConfig() {
  const [checksumMode, setChecksumMode] = useState("crc16");

  return (
    <div className="m-4">
      <div className="flex items-center gap-2 mb-2">
        <Switch id="tx-hex-mode" />
        <Label className="text-sm">HEX</Label>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Switch id="tx-script" />
        <Label className="text-sm">Script</Label>
      </div>
      <div className="flex items-center justify-between mb-2">
        <Label>Checksum</Label>
        <Select value={checksumMode} onValueChange={setChecksumMode}>
          <SelectTrigger className="w-1/2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">None</SelectItem>
              {/* <SelectItem value="crc8">CRC-8</SelectItem> */}
              <SelectItem value="crc16">CRC-16</SelectItem>
              {/* <SelectItem value="crc32">CRC-32</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {checksumMode === "crc16" && (
        <>
          <div className="flex items-center justify-between mb-2">
            <Label>Poly</Label>
            <Input className="w-1/2" value="0x8005" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <Label>Init</Label>
            <Input className="w-1/2" value="0xFFFF" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <Label>XOR Out</Label>
            <Input className="w-1/2" value="0x0000" />
          </div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 mb-2">
              <Switch />
              <Label>Ref In</Label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Switch />
              <Label>Ref Out</Label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
