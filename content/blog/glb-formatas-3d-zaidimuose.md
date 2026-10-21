---
title: "GLB formatas 3D žaidimuose: ką verta žinoti kūrėjui?"
slug: "glb-formatas-3d-zaidimuose"
description: "Sužinokite, kas yra GLB formatas, kaip jis naudojamas 3D žaidimuose ir kaip paruošti modelius, tekstūras bei animacijas sklandžiam veikimui."
date: "2026-10-21"
updated: "2026-10-21"
language: "lt"
author: "Mantas Počiuipa"
authorSlug: "mantas-pociuipa"
category: "Web development"
categorySlug: "web-development"
tags: ["glb", "gltf", "3d", "threejs", "godot"]
published: true
# Įkėlę public/blog-images/automobilis.png, pašalinkite # prieš šias dvi eilutes:
cover: "/blog-images/automobilis.png"
coverAlt: "Automobilio 3D modelis"
---

Kuriant 3D žaidimą neužtenka sumodeliuoti gražų automobilį ar veikėją. Modelį reikia perkelti į žaidimą kartu su medžiagomis, tekstūromis ir animacijomis. Šiam darbui dažnai naudojamas GLB – formatas, leidžiantis susijusius 3D objekto duomenis sutalpinti į vieną failą.

GLB yra dvejetainė glTF formato forma. „Khronos“ glTF kuria kaip atvirą standartą, skirtą efektyviam 3D turinio perdavimui ir įkėlimui į programas. Šiame straipsnyje aptariamas glTF 2.0 ir jo GLB konteineris.

## Kas saugoma GLB faile?

GLB gali talpinti modelio geometriją, scenos objektų hierarchiją, medžiagas, tekstūras, skeletą ir animacijas. Pavyzdžiui, viename automobilio faile gali būti kėbulas, atskiri ratai, stiklai ir jų išvaizdą aprašantys duomenys.

Paprastas `.gltf` failas sceną aprašo tekstiniu JSON formatu, o geometrija ir tekstūros gali būti atskiruose failuose. `.glb` leidžia šiuos duomenis supakuoti į vieną dvejetainį konteinerį. Vis dėlto pats plėtinys negarantuoja, kad visos priklausomybės įterptos: GLB taip pat gali turėti nuorodų į išorinius išteklius.

Vienas failas patogus dalijantis modeliais ir juos diegiant į žaidimą: sumažėja tikimybė pamesti tekstūrą arba sugadinti jos kelią.

## Kaip GLB naudojamas žaidimuose?

Naršyklės žaidimuose GLB galima įkelti naudojant „Three.js“ bibliotekos `GLTFLoader`. Įkeltas modelis tampa scenos dalimi, o žaidimo kodas valdo jo judėjimą ir sąveikas.

`GLTFLoader` palaiko įvairius glTF plėtinius, įskaitant „Draco“ ir „Meshopt“ suspaudimą, KTX2 tekstūras per `KHR_texture_basisu` bei papildomas medžiagų savybes. Suspaustiems ištekliams reikia tinkamai sukonfigūruoti atitinkamus dekoderius ar tekstūrų įkėlimo priemones.

„Godot“ dokumentacijoje glTF 2.0 rekomenduojamas kaip 3D scenų importo formatas. Variklis palaiko tiek `.gltf`, tiek `.glb`. Net tiesioginis „Blender“ `.blend` failų importas šiame variklyje remiasi automatiniu eksportavimu į glTF.

Tačiau GLB modelis nėra visas žaidimas. Automobilio modelis savaime neturi vairavimo fizikos, varžovų dirbtinio intelekto ar taškų skaičiavimo sistemos. Šią elgseną reikia sukurti žaidimo variklyje arba programos kode.

## Ar GLB automatiškai pagreitina žaidimą?

**Ne. GLB yra duomenų formatas, o ne automatinis našumo optimizatorius.**

Viename faile galima išsaugoti ir lengvą, telefonui tinkamą modelį, ir labai sudėtingą objektą su didelėmis tekstūromis. Failo plėtinys nepasako, kiek darbo jo atvaizdavimas pareikalaus iš vaizdo plokštės.

Svarbu atskirti du dalykus:

- **Įkėlimo greitį:** kiek duomenų reikia atsisiųsti, iškoduoti ir paruošti.
- **Atvaizdavimo greitį:** kiek geometrijos, medžiagų, šešėlių ir animacijų žaidimas apdoroja kiekvieną kadrą.

Suspaudimas gali sumažinti atsisiunčiamą failą, bet negarantuoja didesnio kadrų dažnio. Todėl optimizavimo rezultatą verta tikrinti tikrame žaidime ir silpnesniame įrenginyje.

## Praktinis pavyzdys: automobilis lenktynių žaidime

Ruošiant automobilį eksportui verta iš anksto apgalvoti jo struktūrą. Jeigu ratai turės suktis ir pasisukti vairuojant, patogu juos išlaikyti atskirais objektais, aiškiai pavadinti ir tinkamai nustatyti sukimosi centrus.

Kėbului, stiklams ir žibintams naudinga priskirti atskiras medžiagas. Tuomet žaidime keičiant automobilio spalvą nereikės tuo pačiu perdažyti stiklų ar šviesų.

Modelio išvaizda priklauso ir nuo aplinkos. Tas pats automobilis modeliavimo programoje ir žaidime gali atrodyti skirtingai dėl apšvietimo, atspindžių bei atvaizdavimo nustatymų. Todėl eksportavus svarbu tikrinti ne vien tai, ar failas atsidaro, bet ir tai, ar medžiagos atrodo taip, kaip numatyta.

## Ką patikrinti prieš naudojant modelį?

Praktiška pradėti nuo šių veiksmų:

1. **Patikrinti mastelį ir orientaciją.** Modelis turi būti tinkamo dydžio ir nukreiptas reikiama kryptimi.
2. **Įvertinti tekstūrų raišką.** Mažai matomoms detalėms nebūtinai reikia didelių tekstūrų.
3. **Pašalinti nereikalingą geometriją.** Žaidime nematomos detalės gali didinti išteklių sąnaudas.
4. **Patikrinti animacijas ir medžiagas tiksliniame variklyje.** Įsitikinti, kad modelis juda ir atrodo taip, kaip numatyta.
5. **Išbandyti suspaudimą ir išmatuoti rezultatą.** Vertinti ne tik failo dydį, bet ir įkėlimo trukmę bei sklandumą.

GLB yra praktiškas pasirinkimas perkeliant 3D turinį iš modeliavimo programos į žaidimą. Didžiausią naudą jis duoda tada, kai tvarkingas failo paruošimas derinamas su tinkamai parinktomis tekstūromis, modelio sudėtingumu ir realiais veikimo bandymais.

## Šaltiniai

- [„Khronos“ glTF registras](https://registry.khronos.org/glTF/) – standarto versijos ir specifikacijos.
- [glTF 2.0 specifikacija](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) – GLB struktūra, geometrija, medžiagos ir animacijos.
- [„Three.js“ GLTFLoader dokumentacija](https://threejs.org/docs/pages/GLTFLoader.html) – modelių įkėlimas ir suspaudimo plėtinių palaikymas.
- [„Godot“ palaikomi 3D formatai](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/available_formats.html) – GLB ir glTF importas į žaidimų variklį.
