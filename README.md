# Ajmal Aboobaker — Photographer & Videographer

A complete Next.js portfolio with editorial photography, a video hero, showreel and video viewers, a filterable gallery, fullscreen photo lightbox, personal biography, experience timeline and contact form. Includes six routes, dark/light themes, four accent choices and mobile fullscreen navigation.

## Run

Requires Node.js 20.9+ (Node 24 recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For production:

```sh
npm run build
npm run start
```

## Replace the sample media

**The nine portfolio photographs/collages and About portrait are supplied by the user. The eleven videos are supplied Cloudinary videos, streamed on demand.** Video titles are based on the supplied filenames; no additional client credits or production roles are asserted.

Edit **`data/portfolio.ts`**. This is the only media configuration file:

- `projects`: photography paths, title, category, alt text, orientation and featured flag.
- `films`: imports `data/films.json`, containing the eleven supplied Cloudinary URLs, local thumbnails, titles and categories.
- `media.hero`, `media.heroPoster`: fullscreen video and its matching poster.
- `media.showreel`, `media.showreelPoster`: showreel video and poster.
- `media.about`: Ajmal’s supplied portrait at `/images/about/ajmal-aboobaker.png`.
- `profile`: shared contact details and social URLs.

Put photographs in `public/images/portfolio/`, the real portrait in `public/images/about/`, and videos in `public/videos/`. Public paths start with `/images/…` or `/videos/…`; omit `public` from the URL. Use short, descriptive filenames. Add accurate alternative text. Images use `next/image` and have reserved aspect ratios, responsive sizes, AVIF/WebP optimization and lazy loading outside the hero.

Videos stream from Cloudinary only after opening their player. The homepage uses a short, silent local excerpt of Accenture 2023, starting at 00:03 and looping for 12 seconds; the showreel preview opens the full Marriott EMEA Conference — Day 1 video. Thumbnails in `public/images/films/` are frames extracted through Cloudinary. Add accurate caption tracks when caption files are available; the old sample caption has been removed.

For a hero, use an H.264 MP4 with `faststart`, preferably under 3 MB, with no audio. Aim for 1280–1920px wide and a 6–15 second loop. Generate a poster from the same video. Autoplay is muted and inline; users can pause it. The poster alone appears with reduced motion. Videos download only after their viewer opens.

## Enquiry email delivery

The form validates on both client and server with Zod. It includes error messages, focused invalid fields, pending state, timeout, a hidden spam field and a clear success state. It sends to `ajmalaboobaker22@gmail.com` through the Resend HTTP API.

Set these server environment variables:

```dotenv
RESEND_API_KEY=re_...
ENQUIRY_FROM=Ajmal Portfolio <portfolio@your-verified-domain.com>
```

Verify your sending domain in Resend. `ENQUIRY_FROM` must use that verified domain. Visitors’ email addresses are used as `reply_to`, not the sender.

**Without credentials, the endpoint returns 503 and the form clearly offers direct email. It never claims an enquiry was sent.** Actual delivery cannot be verified without your provider credentials. No enquiry data is saved to a database or browser storage. Theme/accent preferences alone use localStorage.

The endpoint enforces same-origin requests, length limits and validated fields. For public launch with paid email delivery, configure a distributed rate limiter or Vercel Firewall rule for `/api/enquiry` to limit abuse across serverless instances.

## Deploy to Vercel

1. Import this repository in Vercel; select the Next.js framework preset.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, without a trailing slash (for example your assigned Vercel URL or actual custom domain).
3. Set `RESEND_API_KEY` and `ENQUIRY_FROM` if enabling enquiry delivery.
4. Deploy with the default build command `npm run build`.
5. Redeploy after changing `NEXT_PUBLIC_SITE_URL`. Canonicals, Person schema, robots and sitemap all derive from it.

No real public domain was supplied, so the local default is `http://localhost:3000` rather than an invented domain. This project uses a server endpoint and should not be deployed as a static export. There are no credentials in the source tree. A Vercel deployment has not been made from this workspace.

## Verification

```sh
npm run typecheck
npm run build
# With a server running on port 3000:
npm run test:ui
```

Install Chromium if needed with `npx playwright install chromium`. Browser checks cover every page at 320, 375, 390, 430, 768, 1024, 1440 and 1920px; check loaded imagery; exercise filtering, lightbox controls, theme and accent persistence, mobile navigation, validation, missing-provider states, showreel playback and reduced-motion behavior. Screenshots are saved to the ignored `test-results/` folder.

## Placeholder media credits

Photographs downloaded from Unsplash under the [Unsplash License](https://unsplash.com/license). The image IDs below identify the original assets; sample project names intentionally do not represent the actual locations or creators.

| Local file         | Unsplash asset ID                |
| ------------------ | -------------------------------- |
| desert.jpg         | photo-1509316785289-025f5b846b35 |
| portrait.jpg       | photo-1534528741775-53994a69daeb |
| coast.jpg          | photo-1518837695005-2083093ee35b |
| city.jpg           | photo-1512453979798-5ea266f8880c |
| sport.jpg         | photo-1546519638-68e109498ffc    |
| golden.jpg         | photo-1464822759023-fed622ff2c3b |
| car.jpg            | photo-1503376780353-7e6692767b70 |
| event.jpg          | photo-1470229722913-7c0e2dbbafd3 |
| street.jpg         | photo-1519608487953-e999c86e7455 |
| about/portrait.jpg | photo-1500648767791-00dcc994a43e |

The earlier stock video has been replaced by supplied footage. No stock video is used in the current website.

Fonts: Manrope and Instrument Serif, locally hosted from Google Fonts (SIL Open Font License). Their licenses are in `public/fonts/`.

Visual reference: [VisualsofAadhi](https://www.visualsofaadhi.in/). No reference photography, video, branding or source code is included in this project.
