"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import bn from '@/i18n/bn'
import en from '@/i18n/en'

type Language = 'bn' | 'en'
interface NestedTranslation {
    [key: string]: string | NestedTranslation
}



function getNestedTranslation(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => {
        if (acc && acc[part] !== undefined) return acc[part];
        return path;
    }, obj) as string;
}


type TranslationStore = {
    language: Language
    setLanguage: (lang: Language) => Promise<void>
    t: (key: string) => string
}

const TranslationContext = createContext<TranslationStore | undefined>(undefined)

export const TranslationProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [language, setLanguage] = useState<Language>('bn')
    const [translations] = useState<Record<Language, NestedTranslation>>({
        en,
        bn
    })


    useEffect(() => {
        const initializeLanguage = async () => {
            try {
                const storedLanguage = localStorage.getItem('language') as Language | null
                if (storedLanguage) {
                    setLanguage(storedLanguage)
                }
            } catch (error) {
                console.error('Error loading language from localStorage:', error)
            }
        }
        initializeLanguage()
    }, [])

    const handleSetLanguage = async (lang: Language) => {
        setLanguage(lang)
        try {
            localStorage.setItem('language', lang)
        } catch (error) {
            console.error('Error saving language to localStorage:', error)
        }
    }

    const t = (key: string) => {
        return getNestedTranslation(translations[language], key);
    }


    return (
        <TranslationContext.Provider
            value={{
                language,
                setLanguage: handleSetLanguage,
                t
            }}
        >
            {children}
        </TranslationContext.Provider>
    )
}

export const useTranslation = () => {
    const context = useContext(TranslationContext)
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider')
    }
    return context
}