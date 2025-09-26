import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const PageSizeSelect = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      className={className}
      value={String(value)}
      onValueChange={val => onChange(val ? Number(val) : value)}
      size="sm"
    >
      <ToggleGroupItem value="5">5</ToggleGroupItem>
      <ToggleGroupItem value="10">10</ToggleGroupItem>
      <ToggleGroupItem value="20">20</ToggleGroupItem>
    </ToggleGroup>
  );
};
