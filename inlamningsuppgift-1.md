# Inlämningsuppgift 1 - CRUD-applikation med API och Routing

## Uppgiftsbeskrivning

Du ska bygga en React-applikation som hämtar data från ett valfritt öppet API och låter användaren utföra CRUD-operationer på denna data.

### Tekniska krav

#### 1. API-integration (Axios)
- [ ] Skapa en separat mapp `src/api/` för all API-logik
- [ ] Skapa en `axiosConfig.js` fil med konfigurerad axios-instans
- [ ] Skapa en API-fil (t.ex. `dataApi.js`) med **alla** CRUD-funktioner:
  - `getAll()` - Hämta alla items
  - `getById(id)` - Hämta en specifik item
  - `create(data)` - Skapa ny item
  - `update(id, data)` - Uppdatera befintlig item
  - `delete(id)` - Ta bort item
- [ ] Alla API-filer ska vara `.js` (INTE `.jsx`)
- [ ] Hantera fel med try/catch och kasta tydliga felmeddelanden

#### 2. CRUD-funktionalitet
- [ ] **Create**: Formulär för att skapa nya items
- [ ] **Read**: Lista alla items från API:et
- [ ] **Update**: Möjlighet att redigera befintliga items
- [ ] **Delete**: Ta bort items

**OBS!** Eftersom vi inte har en databas behöver du hantera state lokalt:
- Lagra hämtad data i state med `useState`
- När du skapar/uppdaterar/tar bort ska ändringar sparas i state
- BONUS: Spara i en JSON-fil för att bevara data mellan sessioner

#### 3. React Router DOM
- [ ] Implementera routing med minst **3 sidor**, t.ex:
  - Startsida/Översikt
  - Lista med alla items
  - Detaljsida för enskild item (med dynamisk route parameter)
- [ ] Navigering mellan sidor med `<Link>` eller `<NavLink>`
- [ ] Använd `useParams()` för att hämta route-parametrar

#### 4. Komponentstruktur
- [ ] Skapa **återanvändbara komponenter** enligt React-principer
- [ ] Dela upp applikationen i logiska komponenter (minst 5 komponenter)
- [ ] Använd props för att skicka data mellan komponenter
- [ ] Exempel på komponenter:
  - `Nav` - Navigation
  - `ItemList` - Lista items
  - `Item` - Enskild item i listan
  - `ItemForm` - Formulär för Create/Update
  - `ItemDetails` - Detaljvy

#### 5. State och sidoeffekter
- [ ] Använd `useState` för att hantera komponentstate
- [ ] Använd `useEffect` för API-anrop och sidoeffekter
- [ ] Hantera loading states (t.ex. "Laddar...")
- [ ] Hantera fel states (visa felmeddelanden)

#### 6. Formulärhantering
- [ ] Skapa formulär för Create och Update
- [ ] Använd kontrollerade komponenter (controlled components)
- [ ] Validera input innan API-anrop (grundläggande validering)


### Projektstruktur (exempel)

```
src/
├── api/
│   ├── axiosConfig.js
│   └── dataApi.js
├── components/
│   ├── Nav.jsx
│   ├── ItemList.jsx
│   ├── Item.jsx
│   ├── ItemForm.jsx
│   └── ItemDetails.jsx
├── pages/
│   ├── Home.jsx
│   ├── ItemsPage.jsx
│   ├── ItemDetailsPage.jsx
│   └── CreateItemPage.jsx
├── App.jsx
└── main.jsx
```

## Bedömningskriterier

### Godkänd (G)
- [ ] Applikationen körs utan fel
- [ ] Alla CRUD-operationer fungerar
- [ ] API-logik är separerad i egna `.js` filer
- [ ] Axios används för API-anrop
- [ ] React Router DOM är implementerat med minst 3 routes
- [ ] Minst 5 komponenter används
- [ ] useState och useEffect används korrekt
- [ ] Formulär för Create och Update fungerar
- [ ] Grundläggande felhantering finns
- [ ] Koden följer grundläggande React-principer
- [ ] DRY-princip tillämpas (Don't Repeat Yourself)

## Inlämning

### Vad ska lämnas in?
1. **Länk till GitHub repository** med all kod
2. **README.md** som innehåller:
   - För och efternamn
   - Projektbeskrivning
   - Vilket API du använt
   - Instruktioner för att köra projektet
   - Lista på implementerade features
   - Eventuella kända buggar eller begränsningar

### Deadline
Fredag 08-05-2026 : 23:59


## Tips och råd

1. **Börja smått** - Få en grundläggande GET-request att fungera först
2. **Testa ofta** - Kör applikationen ofta för att se att allt fungerar
3. **En feature i taget** - Implementera en CRUD-operation i taget
4. **Använd DevTools** - React DevTools och Network-fliken är dina vänner
5. **Commit ofta** - Gör regelbundna commits till Git
6. **Läs API-dokumentationen** - Förstå hur ditt valda API fungerar
7. **Återanvänd komponenter** - Samma formulär kan användas för Create och Update

**Lycka till!**
