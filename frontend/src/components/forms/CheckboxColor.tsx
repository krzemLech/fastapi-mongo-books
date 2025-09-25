import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CheckboxColorProps = {
  id: string;
  label: string;
  name: string;
  defaultChecked?: boolean;
  checked?: boolean;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export const CheckboxColor = ({ className, ...props }: CheckboxColorProps) => (
  <Label
    className={cn(
      "hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950",
      "w-full cursor-pointer transition-colors",
      className
    )}
  >
    <Checkbox
      className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
      {...props}
    />
    <div className="grid gap-1.5 font-normal">
      <p className="text-sm leading-none font-medium">{props.label}</p>
    </div>
  </Label>
);
CheckboxColor.displayName = "CheckboxColor";
