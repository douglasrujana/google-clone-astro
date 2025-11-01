// Esta configuración es casi idéntica a la tuya, pero adaptada para ser un script global.
// Asegúrate de que las librerías i18next están cargadas antes de este script,
// o inclúyelas aquí. Para simplificar, asumimos que están en el scope global
// o las cargarás con <script> tags si es necesario.
// Por ahora, vamos a definir las funciones para que no den error.

// Mock/Polyfill simple si no se cargan las librerías antes
window.i18next = window.i18next || {};
window.i18nextHttpBackend = window.i18nextHttpBackend || {};
window.i18nextBrowserLanguageDetector = window.i18nextBrowserLanguageDetector || {};

i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    }
  }, function(err, t) {
    if (err) return console.error('i18next initialization failed:', err);
    updateContent();
  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.innerHTML = i18next.t(key);
  });
}

// Escucha cambios de idioma para actualizar dinámicamente
i18next.on('languageChanged', () => {
  updateContent();
});