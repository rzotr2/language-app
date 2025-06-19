import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./src/locales/en/translation.json";
import de from "./src/locales/de/translation.json";
import fr from "./src/locales/fr/translation.json";
import uk from "./src/locales/uk/translation.json";
import es from "./src/locales/es/translation.json";
import pl from "./src/locales/pl/translation.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        uk: { translation: uk },
        de: { translation: de },
        fr: { translation: fr },
        es: { translation: es },
        pl: { translation: pl },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
