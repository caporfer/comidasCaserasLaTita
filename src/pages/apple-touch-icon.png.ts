import type { APIRoute } from 'astro';
import { appleTouchIconPng } from '../lib/imagenes';

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await appleTouchIconPng()), { headers: { 'Content-Type': 'image/png' } });
