# Gruppuppgift: React Webbapplikation

**Bedömning:** Individuell (G eller VG)

## Översikt

I denna gruppuppgift ska ni tillsammans bygga en webbapplikation med React. Ni väljer själva vad applikationen ska göra, men den måste uppfylla de tekniska krav som listas nedan. Även om ni arbetar i grupp kommer varje student att bedömas individuellt baserat på sina bidrag och förståelse.

## Val av Projekt

Ni kan välja att bygga vilken typ av webbapplikation som helst, exempelvis:
- En todo-hanterare med kategorier och filter
- En receptsamling med sökfunktion
- Ett enkelt spel (quiz, memory, äventyrsspel, etc.)
- En produktkatalog med varukorg
- Ett community-forum eller meddelandeapp
- En dashboard för data-visualisering

**Viktigt:** Välj ett projekt som är tillräckligt omfattande för att uppfylla kraven, men inte så stort att ni inte hinner färdigt.

## Tekniska Krav

### För Godkänt (G)

#### React Grundläggande Koncept
- [ ] **Komponenter**: Minst 8 välstrukturerade komponenter med tydligt ansvar
- [ ] **Props**: Korrekt användning av props för att skicka data mellan komponenter
- [ ] **State Management**: Användning av `useState` för lokal state i flera komponenter
- [ ] **Listor och Keys**: Rendera listor med `.map()` och korrekta keys
- [ ] **Conditional Rendering**: Visa/dölj innehåll baserat på state eller props
- [ ] **Event Handlers**: Hantera användarinteraktioner (klick, input, submit)
- [ ] **Forms**: Minst ett formulär med kontrollerade inputs
- [ ] **useEffect**: Användning av `useEffect` för sidoeffekter (t.ex. data-hämtning)

#### Routing
- [ ] **React Router**: Minst 3 olika routes/sidor
- [ ] **Navigation**: Navigation mellan sidor med `Link` eller `NavLink`
- [ ] **Dynamic Routes**: Minst en route med dynamiska parametrar (t.ex. `/product/:id`)

#### Data och API
- [ ] **Fetch/Axios**: Hämta data från ett externt API eller JSON-fil
- [ ] **Async Operations**: Hantera loading states och errors vid datahämtning
- [ ] **CRUD Operations**: Minst Create och Read operationer (Create + läsa data)

#### Styling
- [ ] **CSS Modules** eller styled-components för scoped styling
- [ ] **Responsiv Design**: Fungerar på desktop och mobil
- [ ] **Konsekvent Design**: Enhetligt utseende genom hela appen

#### Kodkvalitet
- [ ] **Clean Code**: Läsbar, välstrukturerad kod med tydliga variabelnamn
- [ ] **Kommentarer**: Kommentarer på engelska där koden behöver förklaring
- [ ] **ESLint**: Ingen kritiska varningar i koden

### För Väl Godkänt (VG)

För VG krävs **alla G-krav plus följande**:

#### Avancerad State Management
- [ ] **useReducer**: Använd `useReducer` för komplex state-logik i minst en större feature
- [ ] **Context API**: Skapa minst en Context för global state (t.ex. tema, användare, varukorg)
- [ ] **Custom Hooks**: Skapa minst 2 egna custom hooks för återanvändbar logik (t.ex. `useLocalStorage`, `useFetch`)

#### Fullständig CRUD och Persistence
- [ ] **Full CRUD**: Create, Read, Update och Delete operationer (alla fyra)
- [ ] **Data Persistence**: Data sparas mellan sessioner (localStorage eller backend)
- [ ] **Formulärvalidering**: Tydlig validering med användarvänliga felmeddelanden

#### Avancerad Routing och UX
- [ ] **Protected Routes**: Routes som kräver autentisering/behörighet
- [ ] **useRef**: Använd `useRef` för DOM-manipulation (t.ex. auto-scroll, focus management)
- [ ] **Error & Loading States**: Tydlig hantering av loading, error och success states

#### Kodarkitektur
- [ ] **Komponentstruktur**: Välorganiserad mappstruktur (components/, pages/, utils/, etc.)
- [ ] **DRY Principle**: Ingen upprepad kod, bra abstraktion av återanvändbar logik
- [ ] **Separation of Concerns**: Tydlig separation mellan UI, logik och data

#### Backend Integration (valfritt men rekommenderat)
- [ ] **Node.js Backend**: Bygg en egen backend med Express
- [ ] **REST API**: Skapa endpoints för CRUD-operationer
- [ ] **Databasintegration**: Använd MongoDB, PostgreSQL eller liknande
- [ ] **Autentisering**: Implementera JWT-baserad autentisering med login/signup

## Arbetsprocess Krav

### Git och GitHub
- [ ] **Repository**: Skapa ett GitHub-repository för projektet
- [ ] **Branch Strategy**: Använd feature branches, inte bara main
- [ ] **Commits**: Regelbundna commits med tydliga meddelanden (på engelska)
- [ ] **Pull Requests**: Använd PRs för att merga kod (minst 5 st totalt)
- [ ] **Code Review**: Granska varandras kod innan merge

### Planering och Design
- [ ] **Wireframes/Mockups**: Skapa enkla skisser av UI innan ni börjar koda
- [ ] **Design Pattern**: Skapa regler för design
- [ ] **Component Tree**: Rita upp er komponentstruktur
- [ ] **Data Flow Diagram**: Visualisera hur data flödar genom appen

### Dokumentation
Ni måste ha en välskriven README.md som innehåller:

- [ ] **Projektbeskrivning**: Vad gör appen?
- [ ] **Installation**: Hur kör man projektet lokalt?
- [ ] **Tech Stack**: Vilka teknologier använder ni?
- [ ] **Gruppmedlemmar**: Vem har gjort vad? (individuella bidrag)

## Individuell Bedömning

**VIKTIGT:** Även om ni arbetar i grupp bedöms varje student **individuellt**.

### Hur fungerar bedömningen?

De **tekniska kraven** (G och VG) gäller för **gruppens projekt som helhet**. Men din **individuella bedömning** baseras på:

1. **Dina egna bidrag** - Vilken kod har DU skrivit? (identifieras via Git commits)
2. **Din förståelse** - Förstår du både din egen kod OCH gruppens övriga kod?
3. **Din arbetsprocess** - Hur har du arbetat i projektet?

### Exempel på individuell bedömning:

**Scenario 1:** Projektet når VG-nivå (useReducer, Context, Custom Hooks)
- **Student A** får **VG**: Implementerade useReducer, skapade custom hooks, förstår hela projektet
- **Student B** får **G**: Gjorde bara enklare komponenter, förstår inte de avancerade delarna

**Scenario 2:** Projektet når G-nivå (grundläggande krav)
- **Student C** får **VG**: Implementerade avancerade koncept i sina delar, försökte lyfta projektet, visar djup förståelse
- **Student D** får **G**: Gjorde minimalt, dåligt arbetsflöde

### Bedömningskriterier (viktning):

#### 1. Kodkvalitet
- **Din egen kod** som du skrivit (identifieras via Git commits)
- Vilka React-koncept har DU använt?
- Kod-kvalitet: läsbarhet, struktur, kommentarer
- Komplexitet i dina delar

#### 2. Teknisk Förståelse
- Kan du förklara **din egen kod** i detalj?
- Förstår du **gruppens övriga kod** och arkitektur?
- Kan du svara på tekniska frågor om projektet?
- Visar du förståelse för React-koncept?

#### 3. Arbetsprocess
- Frekventa, välskrivna Git commits
- Aktivt deltagande i code reviews
- Bidrag till planering och dokumentation
- Hjälper och kommunicerar med gruppen

#### 4. Problemlösning
- Hur har du löst utmaningar?
- Självständighet och initiativ
- Engagemang och ansvar

### Viktigt att veta:

**Du kan få VG även om projektet bara når G-nivå** - om du visar djup förståelse och implementerar avancerade koncept i dina delar

**Du kan få G även om projektet når VG-nivå** - om du bara har bidragit med enkla delar och inte förstår de avancerade koncepten

**Mängd kod ≠ bättre betyg** - 500 rader välstrukturerad kod med förståelse > 2000 rader kopierad kod

**Kvalitet och förståelse är viktigast** - Kan du förklara varje rad du skrivit?

**Slutleverans:** Komplett projekt med dokumentation

## Inlämning

### Vad ska lämnas in:
1. **GitHub Repository Link**: URL till ert repo
3. **Individuell Reflektionsdokument** (Max 1 sida):
   - Vad har DU gjort? (referera till commits)
   - Vilka React-koncept har DU använt?
   - Vad var svårt? Hur löste du det?
   - Vad har du lärt dig?

### Presentation
- **10 minuter** per grupp
- Demo av funktionalitet
- Förklara arkitektur och designbeslut

## Tips och Råd

### Börja Enkelt
Bygg en grundversion först som fungerar, lägg sedan till features.

### Kommunikation
Ha dagliga stand-ups (5-10 min) där ni pratar om:
- Vad gjorde jag igår?
- Vad ska jag göra idag?
- Finns det några blockeringar?

### Git Best Practices
```bash
# Bra commit-meddelanden
git commit -m "Add user authentication with JWT"
git commit -m "Fix: Correct state update in shopping cart"
git commit -m "Refactor: Extract custom useLocalStorage hook"

# Använd feature branches
git checkout -b feature/user-authentication
git checkout -b fix/cart-bug
```

### Code Review Checklist
När ni granskar varandras kod, titta på:
- Fungerar koden?
- Är den läsbar?
- Följer den projektets struktur?
- Finns det potentiella buggar?
- Kan något förenklas?

## Lycka till! 🚀

Kom ihåg att målet inte bara är att bygga en app, utan att **lära sig React ordentligt**. En mindre app där ni förstår allt är bättre än en stor app där ni bara har kopierat kod.
