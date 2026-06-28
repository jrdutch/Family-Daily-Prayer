# Family Daily Prayer — Home Assistant Card

A beautiful Home Assistant Lovelace custom card displaying daily Catholic spiritual content, styled with liturgical season colors.

## Features

- **Liturgical Season** — automatically calculated with seasonal accent colors (purple for Advent/Lent, gold for Christmas/Easter, green for Ordinary Time, red for Pentecost)
- **Daily Mass Readings** — book, chapter, and verse for Sunday readings (Years A, B, C) and special solemnities; weekday readings link to the USCCB
- **Mysteries of the Rosary** — correct set for the day of the week (Joyful / Sorrowful / Glorious / Luminous)
- **Children's Prayer** — a traditional Catholic prayer (English or Latin) that rotates daily through 29 prayers; Regina Caeli is automatically shown during Easter season
- **Divine Office for Parents** — correct volume (I–IV) and location in the Liturgy of the Hours, with a direct link to [divineoffice.org](https://divineoffice.org/)
- **Auto-refresh at midnight** — no page reload needed

## Installation

### Via HACS (Recommended)

1. In Home Assistant open **HACS**.
2. Click the three-dot menu (⋮) → **Custom repositories**.
3. Paste `https://github.com/jrdutch/Family-Daily-Prayer` and set category to **Dashboard**.
4. Click **Add**, then find *Catholic Daily Prayer Card* and click **Download**.
5. Reload your browser / clear the cache.
6. Add the card to any dashboard:
   ```yaml
   type: custom:catholic-daily-card
   ```

### Manual Installation

1. Copy `catholic-daily-card.js` into your Home Assistant `config/www/` directory.

2. In **Settings → Dashboards → Resources**, add:
   ```yaml
   resources:
     - url: /local/catholic-daily-card.js
       type: module
   ```

3. Add the card to any Lovelace dashboard:
   ```yaml
   type: custom:catholic-daily-card
   ```

No sensors, no API keys, no additional configuration needed.

## Lectionary Coverage

### Sundays
Full readings (First Reading · Psalm · Second Reading · Gospel) for:
- **Advent** — Sundays 1–4 (Years A, B, C)
- **Christmas** — Holy Family, Epiphany, Baptism of the Lord (Years A, B, C)
- **Lent** — Sundays 1–5 + Palm Sunday (Years A, B, C)
- **Easter** — Sundays 1–7, Ascension, Pentecost (Years A, B, C)
- **Ordinary Time** — Sundays 2–34 / Christ the King (Years A, B, C)
- **Fixed Solemnities** — Mary Mother of God (Jan 1), Assumption (Aug 15), All Saints (Nov 1), Immaculate Conception (Dec 8), Christmas (Dec 25)

### Weekdays
For weekday Masses the card displays the lectionary cycle (Year I or II), the liturgical week, and a direct link to [bible.usccb.org/bible/readings](https://bible.usccb.org/bible/readings) for the full text.

## Liturgical Year Cycles

| Liturgical Year | Sunday Cycle | Weekday Cycle |
|----------------|-------------|---------------|
| 2025–2026      | A           | I / II        |
| 2026–2027      | B           | I / II        |
| 2027–2028      | C           | I / II        |

The weekday cycle follows the calendar year: Year I in odd years, Year II in even years.

## Divine Office Volumes

| Season                        | Volume     |
|-------------------------------|------------|
| Advent & Christmas            | Volume I   |
| Lent & Easter                 | Volume II  |
| Ordinary Time, Weeks 1–17     | Volume III |
| Ordinary Time, Weeks 18–34    | Volume IV  |

## Rosary Schedule

| Day       | Mysteries  |
|-----------|------------|
| Sunday    | Glorious   |
| Monday    | Joyful     |
| Tuesday   | Sorrowful  |
| Wednesday | Glorious   |
| Thursday  | Luminous   |
| Friday    | Sorrowful  |
| Saturday  | Joyful     |

## Children's Prayers (rotating daily)

Hail Mary · Our Father · Glory Be · Guardian Angel Prayer · Ave Maria (Latin) · Pater Noster (Latin) · Memorare · Act of Contrition · Morning Offering · Grace Before Meals · Grace After Meals · Hail Holy Queen · St. Michael Prayer · Come Holy Spirit · Sub Tuum Praesidium (Latin) · Anima Christi (Latin) · Act of Faith · Act of Hope · Act of Love · Prayer Before a Crucifix · Fatima Prayer · Prayer to St. Joseph · Regina Caeli (Latin, always shown during Easter) · Apostles' Creed · O Sacrament Most Holy · Eternal Rest · Tantum Ergo (Latin) · Veni Creator Spiritus (Latin) · Ave Maris Stella (Latin) · Confiteor (Latin)
