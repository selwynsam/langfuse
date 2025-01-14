import { Button } from "@/src/components/ui/button";
import { ChatMessages } from "@/src/components/ChatMessages";
import { type MessagesContext } from "@/src/components/ChatMessages/types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { JSONView } from "@/src/components/ui/CodeJsonViewer";
import { CustomGenerationOutput } from "./CustomGenerationOutput";
import { useCustomPlaygroundContext } from "./context";

export const CustomMessages: React.FC<MessagesContext> = (props) => {
  const { tools } = useCustomPlaygroundContext();
  return (
    <div className="flex h-full flex-col space-y-4 pr-4">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel id="messages" minSize={10} order={1}>
          <ChatMessages {...props} />
        </ResizablePanel>

        {tools?.length > 0 && (
          <>
            <ResizableHandle className="bg-transparent" withHandle />
            <ResizablePanel id="tools" minSize={10} order={2}>
              <div className="flex h-full flex-col">
                <div className="mb-2 font-semibold">Tools</div>
                <div className="flex-1 overflow-auto scroll-smooth">
                  <div className="mb-4 flex-1 space-y-3">
                    <JSONView json={tools || []} />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </>
        )}

        <ResizableHandle className="bg-transparent" withHandle />
        <ResizablePanel
          minSize={10}
          defaultSize={20}
          className="flex flex-col space-y-4"
          id="output"
          order={3}
        >
          <CustomGenerationOutput />
        </ResizablePanel>
      </ResizablePanelGroup>
      <SubmitButton />
    </div>
  );
};

const SubmitButton = () => {
  const { handleSubmit, isStreaming } = useCustomPlaygroundContext();

  return (
    <Button
      className="flex-0"
      onClick={() => {
        handleSubmit().catch((err) => console.error(err));
      }}
      loading={isStreaming}
    >
      <p>Submit ({"\u2318"} + Enter)</p>
    </Button>
  );
};
