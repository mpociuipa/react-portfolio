# Portfolio ir savarankiškas tinklaraštis

Projektas naudoja Next.js. Tinklaraštis skaito Markdown failus iš `content/blog`, todėl jam nereikia išorinės turinio platformos, API rakto ar duomenų bazės.

## Kas pakeista

- Pašalinti visi keturi `@opinly/*` paketai, `svix`, turinio klientas, CDN perrašymas, sekimo pixel ir atnaujinimo webhook.
- Keturi esami vieši straipsniai perrašyti: du anglų, vienas prancūzų ir vienas vokiečių kalba. Temos ir visi keturi senieji URL išsaugoti; tekstai nėra senų tekstų kopijos.
- Paliktos originalios pirmojo publikavimo datos, atnaujinimo data: 2026-09-27.
- Nauji straipsniai, kategorijos, žymos, autoriai ir sitemap formuojami iš vietinių failų. Sąraše yra po 6 straipsnius; esant daugiau, atsiranda puslapiavimas.
- Pagrindinio portfolio komponentai, kontaktų ir naujienlaiškio formos išsaugoti.
- Google Analytics liko ir įjungiamas tik davus analitikos sutikimą. `generate_lead` įvykis perduoda formos šaltinį, bet ne el. pašto adresą.

Tai dar nėra naujas gyvos Vercel svetainės deployment. Pakeitimus reikia įkelti ir publikuoti.

## Paleidimas Windows / PowerShell

Išarchyvuok ZIP į naują aplanką. VS Code atidaryk aplanką su `package.json`.
Naudok Node.js 22 arba naujesnę palaikomą versiją.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Atidaryk http://localhost:3000 ir http://localhost:3000/blog.

Tinklaraštis veikia ir be `.env.local`. Jame reikia tik ankstesnių `BREVO_API_KEY` ir `BREVO_LIST_ID`, jeigu naudoji Brevo naujienlaiškį. Raktų nedėk į GitHub.

## Kaip pridėti straipsnį

1. Nukopijuok `content/blog/_template.md` į naują failą, pvz., `content/blog/mano-pirmas-straipsnis.md`.
2. Pakeisk `title`, `slug`, `description`, datas ir teksto turinį. `slug` turi būti unikalus: mažos lotyniškos raidės, skaičiai ir brūkšneliai.
3. Parink `language`: `lt`, `en`, `de` arba `fr`. Tai teksto kalba; straipsnis automatiškai neverčiamas.
4. `category` yra rodomas kategorijos pavadinimas. `categorySlug` yra jos URL dalis. `tags` — URL tinkami žodžiai, pvz., `["nextjs", "hosting"]`.
5. Kai tekstas paruoštas viešai rodyti, pakeisk `published: false` į `published: true`.
6. Išsaugok ir patikrink `/blog` bei `/blog/tavo-slug` vietiniame projekte.
7. Paleisk `npm run build`, įkelk pakeitimus į prijungtą GitHub saugyklą ir patikrink naują Vercel deployment.

`published: false` tekstai nėra rodomi svetainėje, autorių sąrašuose ar sitemap. Jie tebėra failai saugykloje: viešoje GitHub saugykloje juos galima perskaityti. Tai nėra slapto turinio saugykla. Ateities data neįjungia automatinio planuoto publikavimo: publikavimą valdo `published` ir deployment.

Šablonas turi visus privalomus laukus. Datas rašyk kabutėse: `"2026-09-27"`. `updated` negali būti ankstesnė už `date`.

## Kaip pridėti nuotrauką

Nukopijuok failą į `public/blog-images`, pavyzdžiui, `mano-nuotrauka.jpg`.
Straipsnio pradžioje gali pridėti:

```yaml
cover: "/blog-images/mano-nuotrauka.jpg"
coverAlt: "Tikslus nuotraukos aprašymas"
```

Tekste nuotrauka įterpiama taip:

```markdown
![Nuotraukos aprašymas](/blog-images/mano-nuotrauka.jpg)
```

Naudok savo arba teisėtai naudoti leidžiamas nuotraukas. Naujieji keturi straipsniai neturi priklausomybės nuo seno CDN ir nereikalauja viršelio nuotraukų.

## Markdown pagrindai

- `## Skyriaus pavadinimas` — antraštė.
- `**Svarbus tekstas**` — paryškinimas.
- `[Nuorodos tekstas](https://example.com)` — nuoroda.
- Eilutę pradėk `- `, jei nori sąrašo.
- Tarp pastraipų palik tuščią eilutę.

Nerašyk papildomos pirmojo lygio `#` antraštės pradžioje: pagrindinis pavadinimas rodomas iš `title`.
Neapdorotas HTML ir vykdomas MDX/JavaScript nepalaikomi; tekstas renderinamas su `react-markdown` ir `remark-gfm`.

## Kaip atnaujinti esamą straipsnį

Redaguok atitinkamą `.md` failą, pakeisk `updated` į tikrą redagavimo datą ir publikuok pakeitimus. `date` palik kaip pirmojo publikavimo datą.

Jei straipsnio adresas jau naudojamas, nekeisk `slug` be peradresavimo plano. Failo pavadinimas neprivalo sutapti su slug; esamų keturių straipsnių ilgi slug išsaugoti tam, kad senos nuorodos nenustotų veikti.

## Saugus seno prijungimo pašalinimas

1. Išsaugok savo dabartinio projekto atsarginę kopiją.
2. Pakeisk saugyklos turinį šio ZIP turiniu. Jei kopijuoji ant seno projekto, būtina pašalinti senus failus `src/lib/opinly.ts` ir visą `src/app/api/opinly` aplanką. Vien failų kopijavimas jų automatiškai neištrina.
3. Pakeisk ir `package.json`, ir `package-lock.json`. Paleisk `npm ci` bei `npm run build`.
4. Vercel palik Framework Preset **Next.js**, Build Command `npm run build`, Output Directory — numatytąjį. Šis projektas turi serverio prenumeratos API, todėl jo nekonvertuok į `output: export`.
5. Publikuok ir patikrink pagrindinį puslapį, `/blog`, visas keturias senas straipsnių nuorodas ir `/sitemap.xml`.
6. Kai nauja versija veikia, Vercel ir savo `.env.local` pašalink `OPINLY_API_KEY`, `OPINLY_WEBHOOK_SIGNING_SECRET` bei savo ranka pridėtus kitus `OPINLY_*` kintamuosius. `BREVO_*` palik.
7. Senoje turinio paslaugoje išjunk webhook į `/api/opinly` ir atšauk jos API raktą. Jei paslaugos nebenori, atskirai patikrink ir atšauk mokamą prenumeratą. Kodo pakeitimas prenumeratos nenutraukia.
8. Dar kartą publikuok, kad naują aplinką naudotų visi naujos versijos serverio procesai.

Sena webhook užklausa šiame projekte gaus 404, nes atitinkamos API nebėra.

## Redakciniai pakeitimai

- Pašalinti nepagrįsti rinkos dydžiai, lankytojų skaičiaus ribos ir universalūs kainų pažadai.
- Pašalintas teiginys, kad Next.js iš esmės netinka VPS.
- Atskirti 3D resursų atsisiuntimas, renderinimas lankytojo įrenginyje ir žaidimo serverio darbas.
- Nebeteigiama, kad SSR savaime garantuoja geresnį greitį ar SEO.
- Automatinis publikavimas nebepristatomas kaip neklystantis procesas; paaiškintos patikros ir atkūrimo ribos.
- Paliktos nuorodos į oficialius techninius šaltinius. Tekstuose nėra išgalvotų asmeninių bandymų ar tariamų klientų rezultatų.

## Patikra

```powershell
npm run build
npm run typecheck
npm start
```

`npm run build` patikrina ir straipsnių laukus. Klaidoje bus nurodytas failas: taisyk jį, kol build sėkmingas. Tai apsaugo nuo netyčia sugadintų datų, pasikartojančių adresų ar neegzistuojančių viršelių.

Pagrindiniai failai: `src/lib/blog.ts`, `src/app/blog/[[...slug]]/page.tsx`, `src/app/sitemap.ts`, `content/blog/*.md`.
