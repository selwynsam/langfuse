import { ListRestartIcon } from "lucide-react";
import { useRouter } from "next/router";

import { Button } from "@/src/components/ui/button";
import useCustomPlaygroundCache from "../hooks/useCustomPlaygroundCache";

export const CustomResetButton: React.FC = () => {
  const router = useRouter();
  const { setPlaygroundCache } = useCustomPlaygroundCache();

  const handleClick = () => {
    setPlaygroundCache(null);

    router.reload();
  };

  return (
    <Button
      variant={"outline"}
      title="Reset playground state"
      onClick={handleClick}
    >
      <ListRestartIcon className="mr-1 h-4 w-4" />
      <span>Reset playground</span>
    </Button>
  );
};
