import { FullScreenPage } from "@/src/components/layouts/full-screen-page";
import Header from "@/src/components/layouts/header";
import CustomPlayground from "./custom-playground";
import { CustomSaveToPromptButton } from "./components/CustomSaveToPromptButton";
import { CustomResetButton } from "./components/CustomResetButton";
import { CustomPlaygroundProvider } from "./context";

export default function ReplayPage() {
  return (
    <CustomPlaygroundProvider>
      <FullScreenPage>
        <Header
          title="Custom Playground"
          help={{
            description: "A sandbox to test and iterate your prompts",
            href: "https://langfuse.com/docs/playground",
          }}
          actionButtons={
            <>
              <CustomSaveToPromptButton />
              <CustomResetButton />
            </>
          }
        />
        <div className="flex-1 overflow-auto">
          <CustomPlayground />
        </div>
      </FullScreenPage>
    </CustomPlaygroundProvider>
  );
}
