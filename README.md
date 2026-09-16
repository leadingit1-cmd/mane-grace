# Mane & Grace Hair Studio — site

Single-page site, same stack as Inkspire Collective / Luminé Kennels.

## Before you push live — fill these in

1. `_data/site.json` — `whatsapp_number` is a placeholder (`27000000000`).
   Set it to the real number, international format, digits only
   (e.g. a 082 number becomes `27821234567`, no `+`, no spaces).
2. Double-check `address_line1` / `address_line2` and the Instagram fields.
3. Confirm the pricing in `_data/pricing.json` still matches — it was
   transcribed from the printed menu graphic, so worth a once-over.

## Local preview

Open `index.html` via a local server (not `file://`) so the `fetch()` calls
to `_data/*.json` resolve, e.g. from this folder:

```
npx serve .
```

Console fetch errors when opened directly as a file are expected and
harmless — same as on the other two sites — and disappear once deployed.

## Deploy (batch everything first, one push)

1. Push this folder to the GitHub repo via GitHub Desktop.
2. In Netlify: New site from Git → select the repo → deploy.
3. Site settings → Identity → Enable Identity.
4. Identity → Services → Enable Git Gateway.
5. Invite yourself as a user under Identity, accept the invite email.
6. Visit `/admin` on the deployed site to log in and edit content from
   then on — no code changes needed for price or detail updates.

## Notes

- No inline data — everything is fetched from `/_data/*.json` so the CMS
  stays the source of truth (same lesson as Luminé).
- No base64 images. If you add photos later, drop real files in
  `/images/` and reference them by path.
- Keep filenames lowercase (`index.html`, not `Index.html`).
