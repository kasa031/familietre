# Karina Sætersdal Nilssens Familietre

En interaktiv nettside som viser familietreet til Karina Sætersdal Nilssen, med røtter tilbake til 1600-tallet.

## 🌐 Nettside

Nettsiden er tilgjengelig på: `https://dittnavn.github.io/familietre`

## 📋 Innhold

- **11+ generasjoner** med dokumentert historie
- **50+ personer** fra Norge, Sverige og USA
- **400+ år** med familiehistorie (1600-2024)
- **Interaktivt familietre** med klikkbare personer
- **Detaljerte kilder** og dokumentasjon
- **Responsivt design** for alle enheter

## 🏗️ Struktur

```
familietre-website/
├── index.html              # Hovedside
├── css/
│   ├── style.css          # Hovedstil
│   └── tree.css           # Familietre-spesifikk styling
├── js/
│   ├── main.js            # Hovedfunksjonalitet
│   └── tree.js            # Interaktivt familietre
├── data/
│   └── family.json        # Familietre data
└── README.md              # Denne filen
```

## 🚀 Installasjon og oppsett

### Steg 1: Opprett GitHub repository

1. Gå til [GitHub](https://github.com) og logg inn
2. Klikk på "New repository"
3. Navn: `familietre` (eller ditt ønskede navn)
4. Beskrivelse: "Karina Sætersdal Nilssens Familietre"
5. Velg "Public" (for gratis GitHub Pages)
6. Klikk "Create repository"

### Steg 2: Last opp filer

1. Last ned alle filene fra dette prosjektet
2. Last opp til GitHub repository:
   - Dra og slipp filene i GitHub web-interface
   - Eller bruk Git kommandoer:

```bash
git clone https://github.com/dittnavn/familietre.git
cd familietre
# Kopier alle filene hit
git add .
git commit -m "Initial commit - Familietre nettside"
git push origin main
```

### Steg 3: Aktiver GitHub Pages

1. Gå til repository på GitHub
2. Klikk på "Settings" tab
3. Scroll ned til "Pages" seksjon
4. Under "Source", velg "Deploy from a branch"
5. Velg "main" branch og "/ (root)" folder
6. Klikk "Save"
7. Nettsiden vil være tilgjengelig på `https://dittnavn.github.io/familietre`

## 🎨 Funksjoner

### Interaktivt Familietre
- **Klikkbare personer** med detaljert informasjon
- **Søkefunksjon** for å finne spesifikke personer
- **Zoom-kontroller** for å zoome inn/ut
- **Forskjellige visninger** (morsside, farsside, kombinert)

### Responsivt Design
- **Mobilvennlig** design
- **Tablet-optimalisert** layout
- **Desktop-optimalisert** for store skjermer

### Navigasjon
- **Smooth scrolling** mellom seksjoner
- **Sticky navigation** som følger med
- **Aktive lenker** som viser hvor du er

## 📱 Bruk

### Navigasjon
- Bruk navigasjonsmenyen øverst for å hoppe mellom seksjoner
- Scroll for å utforske innholdet
- Klikk på personer i familietreet for detaljert informasjon

### Familietre
- Klikk på "Morsside", "Farsside" eller "Kombinert" for å bytte visning
- Søk etter personer i søkefeltet
- Zoom inn/ut med zoom-kontrollene
- Klikk på personer for å se detaljert informasjon

### Søk
- Skriv navn, sted, yrke eller annen informasjon
- Søket filtrerer personer i sanntid
- Klikk på resultater for mer informasjon

## 🔧 Tilpasning

### Legge til nye personer
1. Rediger `js/tree.js` filen
2. Legg til person i `familyData` objektet
3. Oppdater HTML-generering funksjonene
4. Commit og push endringene

### Endre styling
1. Rediger `css/style.css` for hovedstil
2. Rediger `css/tree.css` for familietre-spesifikk styling
3. Commit og push endringene

### Legge til nye seksjoner
1. Legg til ny seksjon i `index.html`
2. Oppdater navigasjonen
3. Legg til JavaScript funksjonalitet hvis nødvendig

## 📚 Kilder

Nettsiden er basert på omfattende forskning og dokumentasjon:

- **Digitalarkivet:** Fødselsattester, dødsattester, giftemål, konfirmasjoner
- **Nasjonalbiblioteket:** Avisartikler, historiske publikasjoner
- **Personlige kilder:** Familieoverleveringer, personlige dokumenter

## 🤝 Bidrag

Dette er et personlig familietre-prosjekt, men forslag og forbedringer er velkomne:

1. Fork repository
2. Lag en feature branch
3. Commit endringene
4. Push til branch
5. Opprett en Pull Request

## 📄 Lisens

Dette prosjektet er privat og tilhører Karina Sætersdal Nilssen og familien.

## 📞 Kontakt

For spørsmål om familietreet eller nettsiden, kontakt Karina Sætersdal Nilssen.

---

**Laget med ❤️ for familien**
