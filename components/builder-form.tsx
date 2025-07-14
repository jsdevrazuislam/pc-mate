import type * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/context/i18n-store";
import { formSchema } from "@/validation";

const usageOptions = [
  { id: "gaming", label: "Gaming", icon: "🎮", color: "bg-purple-100 text-purple-800" },
  { id: "design", label: "Design", icon: "🎨", color: "bg-blue-100 text-blue-800" },
  { id: "coding", label: "Coding", icon: "💻", color: "bg-green-100 text-green-800" },
  { id: "office", label: "Office", icon: "📊", color: "bg-yellow-100 text-yellow-800" },
  { id: "video", label: "Video Editing", icon: "🎥", color: "bg-red-100 text-red-800" },
  { id: "streaming", label: "Streaming", icon: "📡", color: "bg-indigo-100 text-indigo-800" },
];

type BuildFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  generateBuild: (request: PCBuilderRequest) => Promise<void>;
  isLoading: boolean;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
};

function BuilderForm({
  setProgress,
  setStep,
  generateBuild,
  isLoading,
  setCurrency,
}: BuildFormProps) {
  const { t, language } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 10000,
      currency: "BDT",
      location: "",
      usage: [],
      buildType: "pc",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setProgress(0);
    setStep(2);

    await generateBuild({
      budget: Number(values.budget),
      currency: values.currency,
      location: values.location,
      usages: values.usage as ("gaming" | "video-editing" | "3d-rendering" | "development" | "office" | "general")[],
      additionalNotes: values.notes,
      preference: values.buildType as "pc" | "laptop" | "both",
      language,
    });

    setCurrency(values.currency);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("builder_page.form.currency.label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("builder_page.form.currency.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BDT">৳ BDT</SelectItem>
                      <SelectItem value="USD">$ USD</SelectItem>
                      <SelectItem value="EUR">€ EUR</SelectItem>
                      <SelectItem value="GBP">£ GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("builder_page.form.budget.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("builder_page.form.location.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("builder_page.form.location.placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>{t("builder_page.form.usage.label")}</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {usageOptions.map(option => (
                <motion.div
                  key={option.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full h-full flex-col ${form.watch("usage").includes(option.id)
                      ? "border-primary bg-primary/10 dark:bg-primary/50"
                      : ""
                    }`}
                    onClick={() => {
                      const currentUsage = form.getValues("usage");
                      const newUsage = currentUsage.includes(option.id)
                        ? currentUsage.filter(id => id !== option.id)
                        : [...currentUsage, option.id];
                      form.setValue("usage", newUsage, { shouldValidate: true });
                    }}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            {form.formState.errors.usage && (
              <p className="text-sm font-medium text-destructive mt-1">
                {form.formState.errors.usage.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="buildType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("builder_page.form.build_type.label")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("builder_page.form.build_type.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pc">Desktop PC Build</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="both">Let AI Decide</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("builder_page.form.notes.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={`${t("builder_page.form.notes.placeholder")}...`}
                    maxLength={200}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}
                  /200
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm"
            >
              {form.formState.errors.root.message}
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Build"}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default BuilderForm;
