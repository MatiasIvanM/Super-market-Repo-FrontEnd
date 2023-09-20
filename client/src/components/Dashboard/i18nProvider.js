import polyglotI18nProvider from 'ra-i18n-polyglot';

const spanishMessages = {
    ra: {
        notification: {
            http_error: 'Error en la Red. Vuelva a intentar.',
        },
        action: {
            save: 'Guardar',
            delete: 'Eliminar',
        },
    },
};

const englishMessages = {
    ra: {
        notification: {
            http_error: 'Network error. Please retry',
        },
        action: {
            save: 'Save',
            delete: 'Delete',
        },
    },
};
const frenchMessages = {
    ra: {
        notification: {
            http_error: 'Erreur réseau, veuillez réessayer',
        },
        action: {
            save: 'Enregistrer',
            delete: 'Supprimer',
        },
    },
};

const i18nProvider = polyglotI18nProvider(
    locale => 
    locale === 'fr' ? frenchMessages 
    : locale === 'en' ? englishMessages
    : spanishMessages,
    'sp' // Default locale
);


export default i18nProvider;