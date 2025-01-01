import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  items: {
    value: string;
    label?: string;
  }[];
}

export default function ConfigSelect(props: Props) {
  return (
    <Select value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label ?? item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
