import { FullScreenPage } from "@/src/components/layouts/full-screen-page";
import Header from "@/src/components/layouts/header";
import CustomPlayground from "@/src/ee/features/playground/page/components/custom-playground";
import { CustomSaveToPromptButton } from "@/src/ee/features/playground/page/components/custom-playground/CustomSaveToPromptButton";
import { ResetPlaygroundButton } from "@/src/ee/features/playground/page/components/ResetPlaygroundButton";
import { CustomPlaygroundProvider } from "@/src/ee/features/playground/page/components/custom-playground/context";
import { useHasEntitlement } from "@/src/features/entitlements/hooks";

export default function CustomPlaygroundPage() {
  const available = useHasEntitlement("playground");
  if (!available) return null;
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
              <ResetPlaygroundButton />
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
