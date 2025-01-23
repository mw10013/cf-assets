/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.json`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const app = new Hono();
		app.get('/message', (c) => c.text('Hello, World!'));
		app.get('/random', (c) => c.text(crypto.randomUUID()));
		return app.fetch(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
