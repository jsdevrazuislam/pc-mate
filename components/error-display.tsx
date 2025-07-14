"use client";

import type { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, X } from "lucide-react";
import { useEffect } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorDisplayProps = {
  title: string;
  message: string | ReactNode;
  type?: "default" | "destructive" | "success" | "warning";
  onDismiss?: () => void;
  className?: string;
  showIcon?: boolean;
  autoDismiss?: boolean;
  dismissTime?: number;
};

const variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const alertVariants = {
  default: "border-border bg-background",
  destructive: "border-destructive/50 bg-destructive/10 text-destructive",
  success: "border-emerald-500/50 bg-emerald-500/10 text-emerald-600",
  warning: "border-amber-500/50 bg-amber-500/10 text-amber-600",
};

export function ErrorDisplay({
  title,
  message,
  type = "default",
  onDismiss,
  className = "",
  showIcon = true,
  autoDismiss = false,
  dismissTime = 5000,
}: ErrorDisplayProps) {
  useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, dismissTime);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTime, onDismiss]);

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className={cn("w-full", className)}
      >
        <Alert className={`${alertVariants[type]} py-4 relative`}>
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 p-0.5"
              onClick={onDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <div className="flex items-start gap-3 w-full">
            {showIcon && (
              <div className="mt-0.5">
                {type === "destructive" && (
                  <CircleAlert />
                )}
              </div>
            )}

            <div className="flex-1">
              <AlertTitle className="font-semibold text-sm">
                {title}
              </AlertTitle>
              <AlertDescription className="text-sm mt-1">
                {typeof message === "string"
                  ? (
                      <p>{message}</p>
                    )
                  : (
                      message
                    )}
              </AlertDescription>
            </div>
          </div>

          {autoDismiss && (
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: dismissTime / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-current opacity-20"
            />
          )}
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
}
