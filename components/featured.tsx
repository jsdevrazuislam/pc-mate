"use client";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { useTranslation } from "@/context/i18n-store";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("features.items.budget"),
      description: t("features.descriptions.budget"),
      icon: "💰",
      color: "text-green-500",
    },
    {
      title: t("features.items.pricing"),
      description: t("features.descriptions.pricing"),
      icon: "🌐",
      color: "text-blue-500",
    },
    {
      title: t("features.items.usage"),
      description: t("features.descriptions.usage"),
      icon: "🎯",
      color: "text-purple-500",
    },
    {
      title: t("features.items.future"),
      description: t("features.descriptions.future"),
      icon: "🔮",
      color: "text-amber-500",
    },
    {
      title: t("features.items.compatibility"),
      description: t("features.descriptions.compatibility"),
      icon: "✅",
      color: "text-emerald-500",
    },
    {
      title: t("features.items.benchmark"),
      description: t("features.descriptions.benchmark"),
      icon: "📊",
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-muted-foreground">
            {t("features.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.color}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-background border border-border/50 hover:shadow-sm transition-all">
                <div className={`text-3xl ${feature.color}`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
