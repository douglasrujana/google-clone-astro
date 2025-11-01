import jwt from 'jsonwebtoken';

export async function POST({ cookies }) {
  const token = cookies.get('authToken')?.value;

  if (token) {
    try {
      const decoded = jwt.decode(token);
      const accessToken = decoded.accessToken;

      if (accessToken) {
        // Revocamos el token de Google
        await fetch('https://oauth2.googleapis.com/revoke?token=' + accessToken, {
          method: 'POST',
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        });
      }
    } catch (error) {
      console.error('Failed to decode or revoke token:', error);
      // No bloqueamos el logout si la revocación falla
    }
  }

  // Borramos la cookie de nuestra aplicación
  cookies.delete('authToken', { path: '/' });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}