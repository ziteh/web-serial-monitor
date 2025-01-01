import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function TxConfig() {
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
    </div>
  );
}
