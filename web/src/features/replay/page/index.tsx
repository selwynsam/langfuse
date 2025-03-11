import Page from "@/src/components/layouts/page";
import CustomPlayground from "./custom-playground";
import { CustomSaveToPromptButton } from "./components/CustomSaveToPromptButton";
import { CustomResetButton } from "./components/CustomResetButton";
import { CustomPlaygroundProvider } from "./context";

export default function ReplayPage() {
  return (
    <CustomPlaygroundProvider>
      <Page
        headerProps={{
          title: "Custom Playground",
          help: {
            description: "A sandbox to test and iterate your prompts",
            href: "https://langfuse.com/docs/playground",
          },
          actionButtonsRight: (
            <>
              <CustomSaveToPromptButton />
              <CustomResetButton />
            </>
          ),
        }}
      >
        <div className="flex-1 overflow-auto">
          <CustomPlayground />
        </div>
      </Page>
    </CustomPlaygroundProvider>
  );
}
