// Content is fetched from /_data/*.json rather than inlined, so Decap CMS
// edits show up without touching this file. Local file:// previews will log
// a harmless fetch error in the console — this resolves once deployed to
// Netlify, so it's safe to ignore during local review.

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.warn(`[content] ${path} not reachable locally — this resolves on deploy.`, err);
    return null;
  }
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderSite(site) {
  if (!site) return;

  document.title = `${site.salon_name} ${site.salon_subtitle} — ${site.address_line2 || ''}`.trim();

  setText('hero-subtitle', site.salon_subtitle);
  document.getElementById('salon-name').textContent = site.salon_name;
  setText('tagline', site.tagline);
  setText('about-text', site.about);
  setText('address-line1', site.address_line1);
  setText('address-line2', site.address_line2);
  setText('instagram-handle', site.instagram_handle);
  setText('footer-whatsapp-label', site.whatsapp_display);

  const waLink = `https://wa.me/${site.whatsapp_number}`;
  const waCta = document.getElementById('whatsapp-cta');
  const waFooter = document.getElementById('footer-whatsapp');
  if (waCta) waCta.href = waLink;
  if (waFooter) waFooter.href = waLink;

  const igLink = document.getElementById('footer-instagram');
  if (igLink) igLink.href = site.instagram_url;

  const addressLink = document.getElementById('footer-address');
  if (addressLink) addressLink.href = site.address_map_url;
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node && value !== undefined) node.textContent = value;
}

function renderPricing(data) {
  const container = document.getElementById('services');
  if (!data || !container) return;
  container.innerHTML = '';

  data.categories.forEach((cat) => {
    const block = el('div', 'category');
    block.appendChild(el('span', 'category-label', cat.label));

    if (cat.items && cat.items.length) {
      cat.items.forEach((item) => {
        const row = el('div', 'price-row');

        const name = el('span', 'price-name');
        name.textContent = item.name;
        if (item.prefix) {
          name.textContent = '';
          name.appendChild(document.createTextNode(item.name + ' '));
          const prefix = el('span', 'prefix', item.prefix);
          name.appendChild(prefix);
        }

        const dots = el('span', 'price-dots');
        const amount = el('span', 'price-amount', item.price);

        row.append(name, dots, amount);
        block.appendChild(row);
      });
    }

    if (cat.note) {
      block.appendChild(el('p', 'category-note', cat.note));
    }

    container.appendChild(block);
  });
}

(async function init() {
  const [site, pricing] = await Promise.all([
    loadJSON('_data/site.json'),
    loadJSON('_data/pricing.json'),
  ]);
  renderSite(site);
  renderPricing(pricing);
})();
