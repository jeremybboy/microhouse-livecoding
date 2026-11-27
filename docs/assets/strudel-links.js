const editor = "https://strudel.cc/";

for (const card of document.querySelectorAll("[data-strudel]")) {
  const sourceLink = card.querySelector("a[download]");
  try {
    const response = await fetch(sourceLink.href);
    if (!response.ok) continue;
    const bytes = new Uint8Array(await response.arrayBuffer());
    const base64 = btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(""));
    const openLink = document.createElement("a");
    openLink.href = `${editor}#${encodeURIComponent(base64)}`;
    openLink.target = "_blank";
    openLink.rel = "noopener";
    openLink.textContent = "Open in Strudel";
    openLink.setAttribute("aria-label", `Open ${card.querySelector("h3").textContent} in Strudel (new tab)`);
    sourceLink.before(openLink);
  } catch (error) {
    console.warn("Could not create the Strudel link for", sourceLink.href, error);
  }
}
