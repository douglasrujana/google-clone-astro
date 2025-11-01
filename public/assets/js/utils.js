/**
 * Busca un elemento por su ID y actualiza su contenido con el año actual.
 * @param {string} elementId - El ID del elemento que mostrará el año.
 */
export const setDynamicYear = (elementId) => {
  const yearElement = document.getElementById(elementId);
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};