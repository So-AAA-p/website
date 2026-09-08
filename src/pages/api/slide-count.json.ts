import type { APIRoute } from "astro";

export const prerender = false;

const DECK_BASE =
	"https://docs.google.com/presentation/d/e/2PACX-1vRpjdtg24rsBPwc3FlZcg39QWNcLx2SinTuQ6HcpN-K3czo6iW7JOnHk0oeXIvh0fP4d5GO-g3px-_Q/pubembed";

export const GET: APIRoute = async () => {
	try {
		const html = await fetch(DECK_BASE).then((res) => res.text());
		const slideCount = Number.parseInt(
			html.match(/slidePageCount:\s*([\d.]+)/)?.[1] ?? "0",
			10,
		);

		return new Response(JSON.stringify({ slideCount }), {
			headers: {
				"content-type": "application/json",
				"cache-control": "public, max-age=60, s-maxage=300",
			},
		});
	} catch {
		return new Response(JSON.stringify({ slideCount: 0 }), {
			status: 502,
			headers: { "content-type": "application/json" },
		});
	}
};
