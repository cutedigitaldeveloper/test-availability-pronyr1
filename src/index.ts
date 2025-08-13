/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const value = await env.KV.get("status:pt2-backend-dev2");
		if (value === null || value === "unhealthy") {
			return new Response("Status is unhealthy", { status: 400 });
		}
		return new Response("OK", { status: 200 });
	},
	async scheduled(event, env) {
		const value = await env.KV.get("status:pt2-backend-dev2");
		if (value === null || value === "unhealthy") {
			console.log("Status is unhealthy");
		}
	}
} satisfies ExportedHandler<Env>;
