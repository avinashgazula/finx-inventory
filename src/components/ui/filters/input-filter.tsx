import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function InputFilter({
  label,
  value,
  onChange,
  placeholder,
}: InputFilterProps) {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
