import { initI18n } from '/assets/js/i18n.js';
import { setDynamicYear } from '/assets/js/utils.js';
import { initAuth } from '/assets/js/auth.js';

/**
 * @description
 * Rellena el campo de búsqueda con el valor del parámetro 'q' de la URL.
 * Esto es esencial para simular y probar ataques de XSS reflejado.
 */
function populateSearchFromQuery() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');
  if (query) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = query;
    }
  }
}

const main = async () => {
  // Llama a todas las funciones de inicialización aquí
  setDynamicYear('current-year');
  await initI18n();
  initAuth();
  populateSearchFromQuery();
};

// Un único punto de entrada cuando el DOM está listo
window.addEventListener('DOMContentLoaded', main);