"use client"
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/context/i18n-store'


export default function HeroSection() {

    const router = useRouter()
    const { t } = useTranslation()

    return (
        <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background to-secondary/5">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider rounded-full bg-primary/10 text-primary mb-6 uppercase"
                    >
                        {t('hero.tagline')}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold leading-tight mb-6"
                    >
                        {t("hero.title")} <br />
                        <span className="text-primary">{t('hero.subtitle')}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                    >
                        {t('hero.description')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href='/builder'>
                            <Button size="lg" className="px-8">
                                {t('hero.cta_primary')}
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="px-8">
                            {t('hero.cta_secondary')}
                        </Button>
                    </motion.div>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
}