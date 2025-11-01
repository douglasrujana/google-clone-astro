export async function POST({ cookies }) {
  // Borramos la cookie estableciendo una fecha de expiración en el pasado
  cookies.delete('authToken', { path: '/' });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}