# Dependency Upgrade Plan

Branch: `v3-bdus5`  
Last reviewed: 2026-06-07

---

## Already done

| Package | Old | New | Note |
|---------|-----|-----|------|
| `qs` | 6.11.2 | 6.15.2 | safe minor |
| `react-copy-to-clipboard` | 5.1.0 | 5.1.1 | patch |
| `react-leaflet-sidebarv2` | 0.6.0 | — | **removed**, replaced by custom component |
| `axios` | 0.24.0 | 1.17.0 | `axios.all` → `Promise.all` in SiteMaps + Layers |
| `gh-pages` | 3.2.3 | 6.3.0 | dev only |
| `object-hash` | 2.2.0 | 3.0.0 | drop-in |
| `react` + `react-dom` | 17.0.2 | 18.3.1 | `index.js`: createRoot; `UNSAFE_*` still ok |
| `@fortawesome/*` | 5.x / 0.1.x | 7.x / 3.x | backward-compatible |
| `chart.js` | 2.9.4 | 4.5.1 | Charts.jsx è stub, nessun impatto |
| `react-chartjs-2` | 2.11.2 | 5.3.1 | aggiornato con chart.js |
| `react-markdown` | 8.0.7 | 10.1.0 | API invariata, build ok |
| `remark-gfm` | 3.0.1 | 4.0.1 | — |
| `rehype-raw` | 6.1.1 | 7.0.0 | — |

---

## Medium risk — do together in one branch

Questi hanno breaking changes ma scope limitato (nessuna riscrittura di componenti).

| Package | Current | Latest | Effort |
|---------|---------|--------|--------|
| `axios` | 0.24.0 | 1.x | Basso — il cambio principale riguarda la gestione errori; `Database.jsx` usa già `.catch` correttamente. Verificare se `CancelToken` è usato (è stato rimosso). |
| `gh-pages` | 3.2.3 | 6.x | Minimo — solo dev dependency, aggiornare eventuali script di deploy. |
| `object-hash` | 2.2.0 | 3.x | Basso — verificare l'uso, probabile drop-in. |

**Branch suggerito:** `chore/deps-medium`

---

## High risk — un branch dedicato per ciascuno

### 1. `react-markdown` + plugin

| Package | Current | Latest |
|---------|---------|--------|
| `react-markdown` | 8.0.7 | 10.x |
| `remark-gfm` | 3.0.1 | 4.x |
| `rehype-raw` | 6.1.1 | 7.x |

**Cosa cambia:** v9+ è ESM-only; il componente `ReactMarkdownPath` va testato.  
**Effort:** Basso–medio. Aggiornare insieme, testare tutte le pagine Markdown (`/api`, `/cite`, testi intro).  
**Branch:** `chore/deps-markdown`

---

### 2. `@fortawesome/*` 5 → 7

| Package | Current | Latest |
|---------|---------|--------|
| `@fortawesome/fontawesome-svg-core` | 1.2.36 | 7.x |
| `@fortawesome/free-solid-svg-icons` | 5.15.4 | 7.x |
| `@fortawesome/free-brands-svg-icons` | 5.15.4 | 7.x |
| `@fortawesome/react-fontawesome` | 0.1.19 | 3.x |

**Cosa cambia:** v6 ha rinominato molte icone; l'API `library.add` è invariata ma gli alias possono differire. Fare una ricerca su tutti i valori `icon="..."` nell'app.  
**Effort:** Medio — avviare l'app e scansionare la console per warning su icone mancanti.  
**Branch:** `chore/deps-fontawesome`

---

### 3. `reactstrap` 8 → 9

**Cosa cambia:** Bootstrap 5 sottostante; classi utility rinominate (`mr-*` → `me-*`, `ml-*` → `ms-*` ecc.); `InputGroupAddon` rimosso (figli inline diretti); `Jumbotron` rimosso.  
**Effort:** Alto — impatta quasi tutti i componenti. Le classi Bootstrap vanno verificate pagina per pagina.  
**Branch:** `chore/deps-reactstrap`

Può includere anche:
- `react-bootstrap-typeahead` 5 → 6 (prop rinominate, testare `ValueInput.jsx`)
- `react-select` 3 → 5 (stile Emotion, prop rinominate, testare `FldSelect.jsx`)

---

### 4. `chart.js` 2 → 4 + `react-chartjs-2` 2 → 5

**Cosa cambia:** v3+ completamente ristrutturato (tree-shakeable, nuovo formato dati, default diversi). `Charts.jsx` richiede una riscrittura.  
**Effort:** Medio — la funzione Charts è poco usata; la riscrittura è circoscritta.  
**Branch:** `chore/deps-charts`

---

### 5. `react-router-dom` 5 → 7

**Cosa cambia:** v6+ rimuove `<Switch>`, `useHistory`, `withRouter`, `<Redirect>`. Tutto il codice di routing, link e navigazione va riscritto.  
**Effort:** Molto alto — impatto pervasivo su tutta l'app.  
**Branch:** `chore/deps-router` (dedicato, dopo tutti gli altri aggiornamenti)

---

### 6. `react` + `react-dom` 17 → 19

**Cosa cambia:** Rimossi i lifecycle method legacy, StrictMode double-invoke in dev, nuovo JSX transform.  
**Effort:** Alto — va fatto per ultimo; tutti i metodi `UNSAFE_*` e i class component con pattern legacy vanno revisionati.  
**Branch:** `chore/deps-react` (ultimo di tutto)

---

## Ordine suggerito (aggiornato)

```
✅ chore/deps-medium          axios, gh-pages, object-hash
✅ chore/deps-react18         react 17→18, FA 5→7, chart.js 2→4,
                              react-markdown 8→10, remark-gfm, rehype-raw

✅ chore/deps-reactstrap      reactstrap 8→9, typeahead 5→6, react-select 3→5, Bootstrap 4→5
✅ chore/deps-router          react-router-dom 5→7
⬜ chore/deps-leaflet         react-leaflet 2→5 + SidebarPortal rewrite
⬜ chore/deps-react19         react 18→19 + fix UNSAFE_componentWillReceiveProps
```

Ogni branch va mergiato e verificato prima di iniziare il successivo.
