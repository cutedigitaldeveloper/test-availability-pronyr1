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
import {EmailMessage} from "cloudflare:email";


export default {
	async fetch(request, env, ctx): Promise<Response> {
		const value = await env.KV.get("status:pt2-backend-dev");

		const fromName = "Cloudflare Health Checker";
		const fromAddress = "worker@cf.cutedigitaltools.com";
		const toAddress = "jesus@cutedigitalmedia.com";
		const subject = "Service Health Alert";
		const body = `Alert: One or more services are down.`;

		const mimeMessage = [
			`From: "${fromName}" <${fromAddress}>`,
			`To: <${toAddress}>`,
			`Subject: ${subject}`,
			`Content-Type: text/plain; charset=utf-8`,
			`Content-Transfer-Encoding: 7bit`,
			``, // This double newline is required to separate headers from the body
			body
		].join('\r\n');

		const message = new EmailMessage(
			fromAddress, // From
			toAddress,   // To
			mimeMessage  // Raw Content
		);

		await env.EMAIL.send(message);

		if (value === null || value === "unhealthy") {
			return new Response("Status is unhealthy", {status: 400});
		}
		return new Response("OK", {status: 200});
	},
	async scheduled(event, env) {
		const value = await env.KV.get("status:pt2-backend-dev");
		if (value === null || value === "unhealthy") {
			console.log("Status is unhealthy");

		}
	}
} satisfies ExportedHandler<Env>;
