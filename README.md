# Mantas Počiuipa — Next.js + Opinly

Portfolio perkeltas iš Create React App į Next.js App Router. Išsaugoti originalūs komponentai, stiliai, nuotraukos, vaizdo įrašas, CV, animacijos, kalbos, temos, reakcijos, EmailJS kontaktų forma ir Brevo naujienlaiškis. Pridėtas serverio pusėje atvaizduojamas tinklaraštis.

## Paleidimas Windows / PowerShell

Naudok Node.js 22 arba naujesnę palaikomą versiją.
Išarchyvuok projektą į naują aplanką ir atidaryk jį VS Code.
Terminalas turi būti aplanke, kuriame yra package.json.

```powershell
npm ci
Copy-Item .env.example .env.local
```

Atidaryk `.env.local` ir pats įrašyk reikšmes:

```dotenv
OPINLY_API_KEY=
OPINLY_WEBHOOK_SIGNING_SECRET=
BREVO_API_KEY=
BREVO_LIST_ID=
```

- `OPINLY_API_KEY`: slaptas raktas iš Opinly → Settings → Developers.
- `OPINLY_WEBHOOK_SIGNING_SECRET`: atskiro webhook parašo paslaptis (ne API raktas).
- `BREVO_API_KEY` ir `BREVO_LIST_ID`: ankstesnio projekto naujienlaiškio nustatymai.
- Raktų nekelk į GitHub ir nedėk į NEXT_PUBLIC kintamuosius.

```powershell
npm run dev
```

Atidaryk http://localhost:3000 ir http://localhost:3000/blog.
Be Opinly rakto pagrindinis puslapis veikia, o tinklaraštis rodo laikiną pranešimą.
Su raktu jis rodo tik paskelbtus Opinly straipsnius. Jei straipsnių dar nėra, rodomas tuščias sąrašas.

Produkcijos patikra:

```powershell
npm run build
npm start
```

`npm start` dabar paleidžia jau sukompiliuotą Next.js serverį. Kasdieniam darbui naudok `npm run dev`.

## Atnaujinimas Vercel

1. Išsaugok seno projekto atsarginę kopiją.
2. Į GitHub projektą perkelk šio ZIP turinį. Jei kopijuoji ant seno aplanko, pašalink senus `vercel.json`, `public/index.html`, `public/sitemap.xml`, `src/index.js` ir `api/subscribe.js`. Nauja prenumeratos API yra `src/pages/api/subscribe.js`.
3. Nekelk `node_modules`, `.next`, `.env.local` ar senos `.git` kopijos. ZIP jų nėra.
4. Vercel projekto Build and Deployment nustatymuose pasirink **Next.js** Framework Preset. Root Directory turi rodyti aplanką su package.json. Pašalink ankstesnį `build` Output Directory nustatymą — naudok Next.js numatytąjį. Build Command: `npm run build`; Install Command: `npm ci`.
5. Vercel → Settings → Environment Variables įrašyk tuos pačius keturis kintamuosius atitinkamai Production aplinkai (ir Preview, jei jos reikia).
6. Atlik naują deployment / Redeploy. Vien env reikšmių išsaugojimo neužtenka.
7. Patikrink svetainę, `/blog`, straipsnio adresą ir `/sitemap.xml`.

Šiame darbe svetainė į Vercel nebuvo publikuota. ZIP yra paruoštas projektas.

## Opinly nustatymai

- Site URL: `https://react-portfolio-steel-ten.vercel.app`
- Blog path: `blog` Opinly formoje; `/blog` Next.js konfigūracijoje.
- Company name: `Mantas Počiuipa`
- CDN namespace: `d04nSBCOnQTIEz6SSZ1Eu`
- Vietinis straipsnių nuotraukų kelias: `/opinly-images` (atskirtas nuo portfolio `/assets`).

Opinly → Settings → Developers → Webhooks pridėk:

```
https://react-portfolio-steel-ten.vercel.app/api/opinly
```

Pasirink `content.routes-changed` įvykį, nukopijuok jo signing secret į Vercel `OPINLY_WEBHOOK_SIGNING_SECRET` ir atlik Redeploy.
Handleris patikrina Svix parašą, atmeta nepasirašytas užklausas, išvalo `opinly` duomenų talpyklą su `revalidateTag('opinly', { expire: 0 })` ir atnaujina pasikeitusius puslapius, archyvus bei sitemap. GET užklausos pažymėtos `opinly`; įvykių POST užklausos netalpinamos talpykloje.

## Analitika ir konversijos

Šakniniame layout naudojamas `Analytics` komponentas su `next/script`. Jis įkelia pateiktą Opinly pixel ir ankstesnį Google Analytics tik leidus analitinius slapukus esamame slapukų lange. Testuojant pirmiausia pasirink Accept All arba Customize → Analytics.

Po sėkmingo kontakto formos siuntimo arba naujienlaiškio prenumeratos vykdomas `identify({ email })` ir `generate_lead`. Nesiunčiamas žinutės tekstas. Jei pixel dar neužsikrovė, laukiamas `opinly:ready` įvykis.

Šiame portfolio nėra paskyrų, krepšelio, mokėjimų ar patvirtintų užsakymų srauto, todėl `login`, `sign_up` ir pirkimo įvykiai dirbtinai nekuriami.

`src/lib/opinly.ts` eksportuoja `recordConfirmedPurchase`. Kai turėsi mokėjimų sistemą, iškviesk ją tik patikrinęs mokėjimo tiekėjo webhook parašą ir sėkmingą mokėjimą:

```ts
await recordConfirmedPurchase({
  orderId: confirmedOrder.id,
  value: confirmedOrder.amountInMajorUnits,
  currency: confirmedOrder.currency,
  email: confirmedOrder.customerEmail,
  anonId: confirmedOrder.opinlyAnonId,
});
```

Čia `confirmedOrder` yra būsimos mokėjimų sistemos patikrinti duomenys, ne esamas projekto objektas. Suma turi būti pagrindiniais valiutos vienetais (pvz., 19.99 EUR), ne centais. Order ID deduplikuoja pakartotinius įvykius. Anoniminį pixel ID gali išsaugoti užsakymo metaduomenyse pradedant apmokėjimą, laikantis lankytojo analitikos pasirinkimo. Pirkimų funkcija paruošta, bet neprijungta prie neegzistuojančios mokėjimų sistemos.

## Failai

- `next.config.ts`: svetainės ir Opinly konfigūracija.
- `src/app/layout.tsx`: bendri metaduomenys, stiliai ir analitika.
- `src/app/page.tsx`, `src/App.jsx`: išsaugotas portfolio.
- `src/app/blog/[[...slug]]/page.tsx`: sąrašas, straipsniai, kategorijos, autoriai, žymos ir puslapiavimas.
- `src/app/sitemap.ts`: pagrindinis puslapis ir dinaminiai Opinly adresai.
- `src/app/api/opinly/route.ts`: pasirašytas atnaujinimo webhook.
- `src/pages/api/subscribe.js`: išsaugota Brevo API; jos atmintinis ribotuvas nėra globalus tarp Vercel instancijų.
- `src/lib/opinly.ts`: tik serverio klientas ir pirkimo funkcija.

Dokumentacija: https://opinly.ai/llms-full.txt

## Patikros

Produkcijos kompiliavimas ir TypeScript patikra. Serverio maršrutai, metaduomenys, JSON-LD, sitemap, puslapiavimas ir webhook talpyklos išvalymas tikrinami su lokaliais bandomaisiais duomenimis. Naršyklėje tikrinamas mobilus išdėstymas, išsaugota kalba, temos ir analitikos sutikimas.

Tikras Opinly API raktas nebuvo pateiktas, todėl tikras turinio gavimas, CDN nuotraukos, įvykių priėmimas Opinly, EmailJS siuntimas, Brevo prenumeravimas ir Vercel publikavimas nėra patvirtinti šiuo testu.
