import "i18next";
import translation from "/locales/en.json";

declare module "react-i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: {
            translation: {};
        };
    }
}

declare module "i18next" {
    interface CustomTypeOptions {
        returnNull: false;
    }
}
