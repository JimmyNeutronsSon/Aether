importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

async function handleRequest(event) {
	const url = new URL(event.request.url);
	
	// Skip proxying for our own assets directly
	if (url.pathname.startsWith("/proxy")) {
		return fetch(event.request);
	}

	await scramjet.loadConfig();
	if (scramjet.route(event)) {
		return scramjet.fetch(event);
	}
	
	try {
		return await fetch(event.request);
	} catch (err) {
		console.error("SW fetch failure:", err, event.request.url);
		return new Response("Offline/Error", { status: 503 });
	}
}

self.addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event));
});
