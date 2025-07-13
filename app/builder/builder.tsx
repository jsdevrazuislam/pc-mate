"use client"


import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { usePCBuilder } from "@/hooks/usePCBuilder";
import BuilderForm from "@/components/builder-form";
import BuilderResult from "@/components/builder-result";
import { ErrorDisplay } from "@/components/error-display";
import { useTranslation } from "@/context/i18n-store";



const getPerformanceLabel = (rating: number) => {
    if (rating >= 9) return 'Excellent';
    if (rating >= 7) return 'Very Good';
    if (rating >= 5) return 'Good';
    return 'Average';
};

export default function PCBuilder() {


    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const { recommendation, isLoading, generateBuild, reset, error } = usePCBuilder()
    const [currency, setCurrency] = useState('')
    const { t } = useTranslation();


    const handleReset = () => {
        setStep(1);
        setProgress(0);
        reset()
    }

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        return prev;
                    }
                    return prev + 10;
                });
            }, 300);

            return () => clearInterval(interval);
        } else if (recommendation) {
            setProgress(100);
        }
    }, [isLoading, recommendation]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold tracking-tight mb-3">{t('builder_page.title')}</h1>
                    <p className="text-muted-foreground">
                        {t('builder_page.description')}
                    </p>
                </motion.div>

                {error ? (
                    <ErrorDisplay
                        title={t('builder_page.form.error')}
                        message={error}
                        type="destructive"
                        onDismiss={handleReset}
                    />
                ) : <Card className="border-border/50">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CardHeader>
                                    <CardTitle>{t('builder_page.form.title')}</CardTitle>
                                </CardHeader>
                                <CardContent className="mt-5">
                                    <BuilderForm setCurrency={setCurrency} isLoading={isLoading} generateBuild={generateBuild} setProgress={setProgress} setStep={setStep} />
                                </CardContent>
                            </motion.div>
                        )}

                        {step === 2 && !recommendation && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="p-8 text-center"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 1, repeat: Infinity }
                                    }}
                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2v4"></path>
                                        <path d="m16.2 7.8 2.9-2.9"></path>
                                        <path d="M18 12h4"></path>
                                        <path d="m16.2 16.2 2.9 2.9"></path>
                                        <path d="M12 18v4"></path>
                                        <path d="m4.9 19.1 2.9-2.9"></path>
                                        <path d="M2 12h4"></path>
                                        <path d="m4.9 4.9 2.9 2.9"></path>
                                    </svg>
                                </motion.div>

                                <h3 className="text-xl font-semibold mb-3">{t('builder_page.analyzing.title')}</h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    {t('builder_page.analyzing.description')}
                                </p>

                                <div className="max-w-md mx-auto mb-8">
                                    <Progress value={progress} className="h-2" />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                        <span>0%</span>
                                        <span>{progress}%</span>
                                        <span>100%</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}



                        {recommendation && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>{t('builder_page.results.title')}</CardTitle>
                                        <Badge variant="secondary">
                                            {getPerformanceLabel(recommendation.performanceRating)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="mt-5">
                                    <BuilderResult handleReset={handleReset} currency={currency} recommendation={recommendation} />
                                </CardContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
                }


                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-muted-foreground mt-8"
                >
                    <p>{t('builder_page.results.description')}</p>
                    <p className="mt-1">{t('builder_page.results.update_note')}</p>
                </motion.div>
            </div>
        </div>
    );
}