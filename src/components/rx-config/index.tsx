import { Button } from "../ui/button";
import { Input } from "../ui/input";
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

export default function RxConfig() {
  return (
    <div className="m-4">
      <div className="flex items-center gap-2 mb-2">
        <Switch id="rx-hex-mode" />
        <Label className="text-sm">HEX</Label>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Switch id="rx-script" />
        <Label className="text-sm">Script</Label>
      </div>

      <div className="flex items-center justify-between mb-2">
        <Label>Color</Label>
        <Select value="unset">
          <SelectTrigger className="w-1/2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="unset">Default</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="green">Green</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between mb-2">
        <Label>Newline</Label>
        <Select value="\n">
          <SelectTrigger className="w-1/2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="\n">\n</SelectItem>
              <SelectItem value="\r">\r</SelectItem>
              <SelectItem value="\r\n">\r\n</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between mb-2">
        <Label>Break ms</Label>
        <Input className="w-1/2" type="number" value="10" />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="secondary">Pause</Button>
        <Button variant="secondary">Clear</Button>
      </div>
    </div>
  );
}
