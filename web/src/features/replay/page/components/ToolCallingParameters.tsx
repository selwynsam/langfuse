// @ts-nocheck
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/src/components/ui/select";
import * as Switch from "@radix-ui/react-switch";
import { cn } from "@/src/utils/tailwind";
import { useCustomPlaygroundContext } from "../context";

const TOOL_CALLING_OPTIONS = [
  { label: "auto", value: "auto" },
  { label: "null", value: null },
  { label: "required", value: "required" },
];

const SelectParameter = ({
  title,
  disabled = false,
  options,
  value,
  onChange,
}: {
  title: string;
  disabled: boolean;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-2">
      <p
        className={cn(
          "text-xs font-semibold",
          disabled && "text-muted-foreground",
        )}
      >
        {title}
      </p>
      <Select disabled={disabled} onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const SwitchParameter = ({
  title,
  disabled = false,
  checked = false,
  onCheckedChange,
}: {
  title: string;
  disabled: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <label
        className={cn(
          "text-xs font-semibold",
          disabled && "text-muted-foreground",
        )}
      >
        {title}
      </label>
      <Switch.Root
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-muted-foreground",
        )}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Switch.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          )}
        />
      </Switch.Root>
    </div>
  );
};

export const ToolCallingParameters = () => {
  const { toolCallingParams, setToolCallingParams, tools } =
    useCustomPlaygroundContext();

  if (tools?.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="font-semibold">Tool calling</p>
      <div className="mt-4">
        <SelectParameter
          title="Tool choice"
          options={TOOL_CALLING_OPTIONS}
          value={toolCallingParams?.toolChoice || "auto"}
          disabled={false}
          onChange={(value) => {
            setToolCallingParams({
              ...toolCallingParams,
              toolChoice: value,
            });
          }}
        />
      </div>
      <div className="mt-4">
        <SwitchParameter
          title={`Parallel tool calling`}
          disabled={false}
          checked={toolCallingParams?.parallelToolCalling || false}
          onCheckedChange={(checked) => {
            setToolCallingParams({
              ...toolCallingParams,
              parallelToolCalling: checked,
            });
          }}
        />
      </div>
      <div className="mt-4">
        <SwitchParameter
          title={`Strict`}
          disabled={false}
          checked={toolCallingParams?.strict || false}
          onCheckedChange={(checked) => {
            setToolCallingParams({
              ...toolCallingParams,
              strict: checked,
            });
          }}
        />
      </div>
    </div>
  );
};
