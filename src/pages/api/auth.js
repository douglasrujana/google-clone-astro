import { OAuth2Client } from 'google-auth-library';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

// Las variables de entorno se manejan así en Astro
const GOOGLE_CLIENT_ID = import.meta.env.PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = import.meta.env.JWT_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'http://localhost:4321/auth/callback');

// En Astro, exportamos una función por cada método HTTP
// 1. Definimos un esquema con Zod para el perfil de usuario de Google
// Esto asegura que los datos que recibimos tienen la forma que esperamos.
const googleUserProfileSchema = z.object({
  name: z.string().min(1, "El nombre no puede estar vacío"),
  picture: z.string().url("La imagen de perfil debe ser una URL válida"),
  email: z.string().email("El email debe ser un correo electrónico válido"),
});

export async function POST({ request }) {
  console.log('Auth endpoint hit. Processing POST request...');
  try {
    const body = await request.text();
    console.log('Request body:', body);

    if (!body) {
      console.error('Error: Request body is empty.');
      return new Response(JSON.stringify({ error: 'Request body is empty' }), { status: 400 });
    }

    const { code } = JSON.parse(body);
    console.log('Authorization code received:', code);

    if (!code) {
      console.error('Error: Authorization code is missing in the request body.');
      return new Response(JSON.stringify({ error: 'Authorization code is missing' }), { status: 400 });
    }

    console.log('Exchanging authorization code for tokens...');
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;
    const accessToken = tokens.access_token; // ¡Aquí está!
    console.log('Tokens received. ID Token present:', !!idToken);

    if (!idToken) {
      console.error('Error: Failed to retrieve ID token from Google.');
      return new Response(JSON.stringify({ error: 'Failed to retrieve ID token from Google' }), { status: 401 });
    }

    console.log('Verifying ID token...');
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log('Token verified. Payload received:', payload);

    if (!payload) {
      console.error('Error: Invalid Google token, payload is missing.');
      return new Response(JSON.stringify({ error: 'Invalid Google token' }), { status: 401 });
    }

    const appTokenPayload = {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      accessToken: accessToken, // Lo guardamos en nuestro token
    };

    console.log('Signing JWT token...');
    const token = jwt.sign(appTokenPayload, JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token signed successfully.');

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Internal server error during auth:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}