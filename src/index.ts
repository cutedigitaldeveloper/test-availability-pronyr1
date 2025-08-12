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
		const responses = await Promise.all([
			fetch("https://pt2-backend.pronyr.com/v2/vercel_ordered_seriesid_list?userid=6e54ffc8-52c8-4967-915b-d5ae57db6b50", {
				headers: {
					"Content-Type": "application/json",
				}
			})
		]);
		const healthCheck = responses[0].statusText;
		return new Response(healthCheck);
	},
} satisfies ExportedHandler<Env>;
