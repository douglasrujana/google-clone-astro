import i18next from 'i18next';
import i18nextHttpBackend from 'i18next-http-backend';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

// Actualización del contenido
const updateContent = () => {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    // Regex mejorado para manejar atributos como [placeholder]key
    const attributeMatch = key.match(/^\\[(.*?)\\](.*)$/);
    if (attributeMatch) {
      const attr = attributeMatch[1];
      const realKey = attributeMatch[2];
      element.setAttribute(attr, i18next.t(realKey));
    } else {
      element.textContent = i18next.t(key);
    }
  });
  document.title = i18next.t('title');
  document.documentElement.lang = i18next.language;
};

// Inicialización de i18next
export const initI18n = async () => {
  await i18next
    .use(i18nextBrowserLanguageDetector)
    .use(i18nextHttpBackend)
    .init({
      fallbackLng: {
        // Si el navegador pide 'es-ES', intenta cargar 'es' y luego 'en' si falla.
        'es-ES': ['es', 'en'],
        // Para cualquier otro idioma, el fallback por defecto es 'en'.
        'default': ['en']
      },
      debug: true,
      backend: {
        // Ruta donde están los archivos de traducción
        loadPath: '/locales/{{lng}}/translation.json',
      },
      detection: {
        // El orden importa. Priorizamos la configuración del navegador.
        order: ['navigator', 'htmlTag', 'querystring', 'cookie', 'localStorage', 'sessionStorage'],
        // Limpiar cualquier valor guardado en ejecuciones anteriores.
        caches: [],
      },
      interpolation: {
        escapeValue: false,
      },
    });

  // Exponer i18next a window solo en modo de prueba
  if (import.meta.env.MODE === 'test') {
    window.i18next = i18next;
  }

  updateContent();
  i18next.on('languageChanged', updateContent);
};