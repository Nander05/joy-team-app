# Maandcheck Joy Team (elke 1e van de maand)

Doel: de analyse in `index.html` verversen met de nieuwste cijfers uit de Young Living backoffice van Nander.

## Regels
- Alleen LEZEN in de backoffice. Nooit iets aanpassen, bestellen of versturen.
- Nooit inloggegevens invoeren of vragen. Staat de browser niet ingelogd, stop dan en meld dat (zie "Als het niet lukt").
- Geen gezondheidsreden van leden in de pagina. Gebruikers-vinkjes (heractivatie) staan lokaal op de gsm en worden niet aangeraakt.
- Taal: Nederlands, kort. Stijl en opmaak van de pagina niet wijzigen, alleen data en datumtekst.

## Wat er ververst wordt
In `index.html` staat op één regel `const DATA = {...};` met deze lijsten (zelfde velden houden):
- `months` (24 rijen, laatste 24 maanden): month (YYYY-MM), label, accounts, active, group_pv, top10_share, my_pv, my_ogv, new_members, gone, comm_eur, frontline, frontline_active. Schuif elke maand een rij op: oudste eraf, nieuwste erbij.
- `cohorts`: stage, n2025, base2025, n2026, base2026 (hoeveel nieuwe leden na hun eerste/1/3/6 maanden opnieuw bestelden).
- `losses`: leden die gestopt zijn: name, level, months_active, total_pv, last_active, months_away, on_list (ja/nee = op de heractivatielijst).
- `loss_buckets`: bucket, n.
- `legs`: leg, pgv_oct (PGV laatste maand), state.
- `facts`: key/value/note, o.a. silver_ogv 10000, silver_leg 4000, silver_pgv 1000, ogv_done, ogv_sched, cand, cand_avg.
- `ranks`: rangvereisten, niet wijzigen tenzij Young Living ze aanpast.
Teksten in de pagina lezen deze data via `data-draw`/`data-source` attributen, dus blijven vanzelf kloppen.
Pas ook de datumtekst aan: zoek "3 november 2026" (3 plaatsen: lede, Silver-stand, bronvoetnoot) en zet de nieuwe datum.

## Heractivatielijst (62 mensen)
De kandidatenlijst staat in `PEOPLE` in dezelfde pagina. Ververs alleen als Nander erom vraagt.

## Werkwijze
1. Open de backoffice in de browser van Nander (Claude_Browser), lees stand per maand en leden, vergelijk met vorige `DATA`.
2. Zet de nieuwe cijfers in `DATA` (JSON blijft geldig).
3. Verhoog `CACHE` in `sw.js` NIET nodig: pagina wordt online eerst opgehaald.
4. Test met een snelle check dat het JSON parseert en de pagina geen fout geeft (Playwright of node).
5. Commit met bericht "Maandcheck <maand jaar>" en push naar `main`. Pages publiceert zelf.
6. Geef Nander een korte samenvatting in het Nederlands: 3 tot 5 punten wat veranderd is (OGV, nieuwe leden, wie gestopt is, afstand tot Silver) en één advies voor de komende maand.

## Als het niet lukt
Browser niet beschikbaar, niet ingelogd of backoffice reageert niet: niets wijzigen, niets pushen, kort melden wat er misging.
