"use client";

import { useRouter } from "next/navigation";
import Button from "@/shared/components/ui/atoms/Button";
import TextButton from "@/shared/components/ui/atoms/TextButton";
import Text from "@/shared/components/ui/atoms/Text";
import type { ErrorPageProps } from "./ErrorPage.types";

const ErrorPage = ({
  title = "Something went wrong",
  message = "Please try again or return to the homepage.",
  primaryAction,
  secondaryAction,
  className = "",
}: ErrorPageProps) => {
  const router = useRouter();
  const primary = primaryAction ?? { label: "Go to homepage", href: "/" };

  const handleAction = (action?: typeof primary) => {
    if (!action) return;
    if (action.href) {
      router.push(action.href);
      return;
    }
    action.onClick?.();
  };

  return (
    <main className={`bg-white min-h-screen flex mt-10 justify-center bg-bg px-4 ${className}`}>
      <div className="w-full max-w-xl rounded-4xl border border-border-secondary bg-surface p-8 shadow-lg shadow-black/5">
        <div className="space-y-6 text-center">

          <Text variant="heading" className="text-3xl sm:text-4xl">
            {title}
          </Text>

          <Text variant="body" className="mx-auto max-w-2xl text-secondary">
            {message}
          </Text>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => handleAction(primary)} className="w-full sm:w-auto">
              {primary.label}
            </Button>

            {secondaryAction && (
              <TextButton
                onClick={() => handleAction(secondaryAction)}
                color="muted"
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </TextButton>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
