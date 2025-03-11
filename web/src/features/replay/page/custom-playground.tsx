import { ModelParameters } from "@/src/components/ModelParameters";
import { useCustomPlaygroundContext } from "./context";
import { CustomVariables } from "./components/CustomVariables";
import { CustomMessages } from "./components/CustomMessages";
import { ToolCallingParameters } from "./components/ToolCallingParameters";

export default function CustomPlayground() {
  const playgroundContext = useCustomPlaygroundContext();

  return (
    <div className="flex h-full flex-row space-x-8">
      <div className="h-full basis-3/4 overflow-auto">
        <CustomMessages {...playgroundContext} />
      </div>
      <div className="max-h-full min-h-0 basis-1/4 pr-2">
        <div className="grid h-full grid-rows-[minmax(20dvh,max-content),minmax(20dvh,auto)] overflow-auto">
          <div className="mb-4 max-h-[80dvh] min-h-[20dvh] overflow-y-auto">
            <ModelParameters {...playgroundContext} />
          </div>
          <div className="mb-4 max-h-[80dvh] min-h-[20dvh] overflow-y-auto">
            <ToolCallingParameters />
          </div>
          <div className="min-h-[20dvh]">
            <CustomVariables />
          </div>
        </div>
      </div>
    </div>
  );
}
