import React from 'react'
import { motion } from "framer-motion";
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CurrencyCode, getCurrencySymbol } from '@/lib/currency-formater';
import { useTranslation } from "@/context/i18n-store";


const componentIcons: Record<string, string> = {
    'cpu': '⚡',
    'gpu': '🎮',
    'ram': '🧠',
    'storage': '💾',
    'motherboard': '🔌',
    'monitor': '🖥️',
    'mouse': '🖱️',
    'keyboard': '⌨️',
    'headphone': '🎧',
    'printer': '🖨️',
    'psu': '⚡',
    'case': '📦'
};


const BuilderResult = ({ recommendation, currency, handleReset }: { recommendation: PCBuildRecommendation, currency: string, handleReset: () => void }) => {

    const { t } = useTranslation();


    return (
        <>
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">{t('builder_page.results.performance.title')}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{t('builder_page.results.performance.rating')}:</span>
                        <span className="font-medium">{recommendation.performanceRating}/10</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    {recommendation.estimatedPerformance.gaming && (
                        <div className="bg-secondary/50 rounded-lg p-4">
                            <div className="text-h6-size font-bold text-primary">
                                {recommendation.estimatedPerformance.gaming}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('builder_page.results.performance.gaming')}</div>
                        </div>
                    )}
                    {recommendation.estimatedPerformance.contentCreation && (
                        <div className="bg-secondary/50 rounded-lg p-4">
                            <div className="text-h6-size font-bold text-primary">
                                {recommendation.estimatedPerformance.contentCreation}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('builder_page.results.performance.content_creation')}</div>
                        </div>
                    )}
                    {recommendation.estimatedPerformance.productivity && (
                        <div className="bg-secondary/50 rounded-lg p-4">
                            <div className="text-h6-size font-bold text-primary">
                                {recommendation.estimatedPerformance.productivity}
                            </div>
                            <div className="text-xs text-muted-foreground">{t('builder_page.results.performance.productivity')}</div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="font-medium">{t('builder_page.results.total_cost')}:</span>
                    <span className="text-xl font-bold">
                        {getCurrencySymbol(currency as CurrencyCode)}
                        {recommendation?.components?.reduce((sum, item) => sum + item.price, 0)}
                    </span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <h3 className="font-medium">{t('builder_page.results.components.title')}</h3>
                {recommendation.components.map((item, index) => (
                    <motion.div
                        key={`${item.type}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                                {componentIcons[item.type.toLowerCase()] || '⚙️'}
                            </div>
                            <div className='flex-1'>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-muted-foreground capitalize">{item.type}</div>
                                {item.performanceNote && (
                                    <p className="text-xs text-primary mt-1">{item.performanceNote}</p>
                                )}
                            </div>
                        </div>
                        <div className="font-medium">
                            {getCurrencySymbol(currency as CurrencyCode)}
                            {item.price.toLocaleString()}
                        </div>
                    </motion.div>
                ))}
            </div>

            {recommendation.notes && recommendation.notes.length > 0 && (
                <div className="mb-8">
                    <h3 className="font-medium mb-3">{t('builder_page.results.notes.title')}</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {recommendation.notes.map((note, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {recommendation?.marketLocation && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin />
                            <h3 className="text-xl font-semibold">{t('builder_page.results.purchase_location.title')}</h3>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <p className="font-medium text-blue-100">{t('builder_page.results.purchase_location.name')}</p>
                                <p className="text-lg font-semibold">{recommendation.marketLocation.name}</p>
                            </div>

                            {recommendation.marketLocation.address && (
                                <div>
                                    <p className="font-medium text-blue-100">{t('builder_page.results.purchase_location.address')}</p>
                                    <p className="text-white/90">{recommendation.marketLocation.address}</p>
                                </div>
                            )}

                            {recommendation.marketLocation.popularFor && (
                                <div>
                                    <p className="font-medium text-blue-100">{t('builder_page.results.purchase_location.specialization')}</p>
                                    <p className="text-white/90">{recommendation.marketLocation.popularFor}</p>
                                </div>
                            )}

                            {recommendation.marketLocation.contact && (
                                <div>
                                    <p className="font-medium text-blue-100">{t('builder_page.results.purchase_location.contact')}</p>
                                    <p className="text-white/90">{recommendation.marketLocation.contact}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Button className="flex-1" size="lg">
                            {t('builder_page.results.actions.save')}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            size="lg"
                            onClick={handleReset}
                        >
                            {t('builder_page.results.actions.new')}
                        </Button>
                    </div>
                </motion.div>
            )}

        </>
    )
}

export default BuilderResult