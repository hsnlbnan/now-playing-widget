TR — Proje Hakkında

Bu proje, MSN’in “Ne Dinliyor?” hissini modern web’e taşıyan küçük ve kullanışlı bir araç: Spotify hesabınla giriş yapıyorsun, sistem senin o an ya da en son dinlediğin şarkıyı bir SVG rozet olarak üretiyor. Bu rozeti GitHub README’ine, kişisel sitene ya da Notion sayfana ekleyebilirsin. Her şey olabildiğince sade; tek butonla giriş yetiyor.

Neden? Çünkü güzel bir müziği dinlerken bunu kibarca paylaşmak istiyorsun. Embed çıktısı hızlı, cache’li ve herkese açık kullanılabiliyor.

Öne Çıkanlar
- Tek tıkla Spotify ile giriş. Ekstra form doldurmak yok.
- SVG/JSON çıktı: README, web sayfası ve diğer entegrasyonlar için uygun.
- Kişiselleştirme: tema (dark/light), yerleşim (yatay/dikey) ve varyant (standart/compact).
- İnce ayarlar: kapak, süre bilgisi, ilerleme çubuğu, “Open in Spotify” bağlantısı aç/kapat.
- i18n: TR ve EN arayüz desteği (sağ üstte dil değişimi).
- Edge runtime ve kısa önbellek (s-maxage) ile hızlı yanıt.

Tech Stackler: 
- Next.js 15 (App Router, Edge Runtime)
- React 19
- Tailwind CSS 4 (utility-first stil, ephemeral cam/blur dokunuşları)
- Vercel deployment
- Vercel KV
- TypeScript

Nasıl Çalışır?
1) Spotify ile giriş yaparsın. Callback’te sadece senin Spotify id’in alınır; refresh token KV’ye kaydedilir (veya local dev için .env’le).
2) Rozet isteği geldiğinde sistem önce “currently-playing”, yoksa “recently-played” çağrısını yapar.
3) JSON ya da SVG olarak yanıt döner. SVG rozet cache’lenir; istersen parametrelerle kişiselleştirebilirsin.

Kurulum (Local)
1) Depoyu klonla ve bağımlılıkları kur.
   - npm i veya bun install (ikisi de olur)
2) .env dosyanı hazırla:
   - SPOTIFY_CLIENT_ID=...
   - SPOTIFY_CLIENT_SECRET=...
   - SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
   - NEXT_PUBLIC_SITE_URL=http://localhost:3000
   - KV_REST_API_URL, KV_REST_API_TOKEN
3) Geliştirme sunucusunu başlat:
   - npm run dev
4) Tarayıcıda http://localhost:3000 aç. Spotify ile giriş butonunu kullan.

Deploy (Vercel)
1) Vercel’de yeni bir proje oluşturup bu depoyu bağla.
2) Ortam değişkenlerini ekle (özellikle SPOTIFY_* ve NEXT_PUBLIC_SITE_URL).
3) KV kullanacaksan Vercel KV’yi ekle ve KV_REST_API_URL / KV_REST_API_TOKEN ayarla.
4) Deploy et; giriş akışı callback URL’inin Spotify Dashboard’da kayıtlı olduğundan emin ol.

API Uçları
- GET /api/now-playing?user=<id|alias>&format=json|svg
  - Parametreler:
    - cover=0|1
    - link=0|1
    - time=0|1
    - progress=0|1
    - theme=dark|light
    - layout=horizontal|vertical
    - variant=default|compact
  - Örnek README kullanımı (SVG):
    ![Spotify Now Playing](https://now-playing-widget-one.vercel.app/api/now-playing?user=11141488580)


Ekstra Notlar
- Giriş sonrası id cookie’ye yazılır ve tekrar giriş yapılması istenmez.
- Debug için /api/now-playing?user=...&format=json veya &debug=1 işine yarar.
- Gizlilik ve Şartlar sayfaları:
  - /privacy
  - /terms

Güvenlik ve Gizlilik
- Refresh token sadece senin adına Spotify API çağrısı yapmak için saklanır.
- KV’de saklama imkânı (prod), local’de env fallback mevcut.
- Token’ı silmek için revoke endpoint’i mevcut; istersen bana yaz, birlikte değerlendiririz.

—

EN — About the Project

This is a tiny, friendly web app that brings the classic “Now Playing” vibe to modern web. You sign in with Spotify, and it serves a live badge (SVG or JSON) showing your current or last track. You can drop it into your GitHub README, personal website, or a Notion page. No username form — just one button.

Why? Because sharing what you listen to can be delightful. The badge is fast, cache‑friendly, and public by design.

Highlights
- Single‑click Spotify sign‑in. No extra fields.
- SVG/JSON output for README or web embeds.
- Personalization: theme (dark/light), layout (horizontal/vertical), variant (default/compact).
- Fine‑grained toggles: cover, time, progress bar, and “Open in Spotify” link.
- i18n: TR and EN UI with a minimal language switcher.
- Edge runtime + short caching for snappy responses.
- Legal pages: /privacy and /terms.

Tech Stack
- Next.js 15 (App Router, Edge Runtime)
- React 19
- Tailwind CSS 4 (with a subtle ephemeral glassy look)
- Vercel (recommended deploy target)
- Vercel KV (prod token storage; .env fallback for local)
- TypeScript

How It Works
1) You sign in with Spotify. We obtain only your Spotify id and store your refresh token (KV in prod, env fallback locally).
2) When the badge is requested, we call “currently‑playing”, or fallback to “recently‑played”.
3) We return JSON or an SVG badge. You may customize it via query params.

Local Setup
1) Clone and install deps (npm i or bun install).
2) Prepare .env:
   - SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
   - SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
   - NEXT_PUBLIC_SITE_URL=http://localhost:3000
   - KV_REST_API_URL / KV_REST_API_TOKEN (prod)
3) Run dev: npm run dev
4) Open http://localhost:3000 and click “Sign in with Spotify”.

Deploy (Vercel)
1) Create a new project, connect this repo.
2) Set environment variables (SPOTIFY_*, NEXT_PUBLIC_SITE_URL, KV_* if used).
3) Ensure the callback URL is whitelisted in the Spotify Dashboard.
4) Deploy.

API
- GET /api/now-playing?user=<id|alias>&format=json|svg
  - Params:
    - cover=0|1, link=0|1, time=0|1, progress=0|1
    - theme=dark|light, layout=horizontal|vertical, variant=default|compact
  - README example (SVG):
    ![Spotify Now Playing](https://now-playing-widget-one.vercel.app/api/now-playing?user=11141488580)

Notes
- No username field; after sign‑in we persist your id via cookie so the UI “just works”.
- For debugging use format=json or add debug=1.
- Legal pages: /privacy and /terms

Privacy & Security
- We store your refresh token only to call Spotify APIs on your behalf.
- KV in prod; .env fallback for local development.
- You can revoke/delete any time; feel free to reach out if you want help.

FAQ
- “Do I need a vanity alias?” Not for MVP. We can add it later if you want cleaner links.
- “Does SVG work in README?” Yes. It’s lightweight and cache‑friendly.

Teşekkürler / Thanks!
Kafanda soru kaldıysa veya bir fikri birlikte denemek istersen yaz: linkedin.com/in/husnu
