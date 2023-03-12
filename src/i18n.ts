import { createI18n } from 'vue-i18n'
import locales from '@/locales/en.json'

const i18n = createI18n({
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      ...locales
    }
  }
})

export default i18n
