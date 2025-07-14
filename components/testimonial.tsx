"use client";
import { useTranslation } from "@/context/i18n-store";

const testimonials = [
  {
    quote: "The AI recommended a build that was perfect for my video editing needs and saved me $200 compared to what I was planning to buy.",
    author: "Sarah K., Video Editor",
  },
  {
    quote: "As a first-time builder, I had no idea where to start. The step-by-step guide made the process so easy!",
    author: "Michael T., Student",
  },
  {
    quote: "I've built PCs for years, but the AI found component combinations I hadn't considered that gave me better performance.",
    author: "David R., IT Professional",
  },
];

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="py-10 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-muted-foreground">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.author} className="bg-card p-6 rounded-lg border border-border">
              <blockquote className="text-body-md italic mb-4">
                "
                {testimonial.quote}
                "
              </blockquote>
              <p className="text-body-sm font-semibold">
                —
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
