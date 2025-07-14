"use client";
import { motion } from "framer-motion";
import { MessageSquare, PencilLine, Settings } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useTranslation } from "@/context/i18n-store";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("how_it_work.steps.step1"),
      description: t("how_it_work.step_descriptions.step1"),
      icon: <MessageSquare />,
    },
    {
      title: t("how_it_work.steps.step2"),
      description: t("how_it_work.step_descriptions.step2"),
      icon: <Settings />,
    },
    {
      title: t("how_it_work.steps.step3"),
      description: t("how_it_work.step_descriptions.step3"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 11 19-9-9 19-2-8-8-2z"></path>
        </svg>
      ),
    },
    {
      title: t("how_it_work.steps.step4"),
      description: t("how_it_work.step_descriptions.step4"),
      icon: <PencilLine />,
    },
  ];

  return (
    <section id="how-it-works" className="py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("how_it_work.title")}</h2>
          <p className="text-muted-foreground">
            {t("how_it_work.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-background border border-border/50 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
