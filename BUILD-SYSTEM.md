# 🏗️ Système de Build Multi-Plateforme

Ce projet utilise un système de build qui génère **deux versions distinctes** du site web, chacune optimisée pour sa plateforme de déploiement.

---

## 📁 Structure des Dossiers

```
speedex/
├── index.html              # ✏️ SOURCE (domaine: extincteurspeedex.ca)
├── index-en.html           # ✏️ SOURCE (domaine: extincteurspeedex.ca)
├── css/                    # ✏️ SOURCE (fichiers CSS partagés)
├── js/                     # ✏️ SOURCE (fichiers JavaScript partagés)
├── images/                 # ✏️ SOURCE (images partagées)
│
├── dist/                   # 🚀 CLOUDFLARE PAGES (auto-généré, gitignored)
│   ├── index.html          #    URLs: https://extincteurspeedex.ca
│   ├── index-en.html
│   ├── css/
│   ├── js/
│   └── images/
│
├── github/                 # 🐙 GITHUB PAGES (auto-généré, commité)
│   ├── index.html          #    URLs: https://salahkhalfi.github.io/Speedex-website
│   ├── index-en.html
│   ├── css/
│   ├── js/
│   └── images/
│
└── build-deploy.sh         # 🔧 SCRIPT DE BUILD
```

---

## 🎯 Pourquoi Cette Architecture ?

### **Problème Résolu**
Les URLs canonical, Open Graph, et Schema.org doivent être **différentes** selon la plateforme :

| Plateforme | Domaine | Usage |
|-----------|---------|-------|
| **Cloudflare Pages** | `extincteurspeedex.ca` | 🏆 Production principale |
| **GitHub Pages** | `salahkhalfi.github.io/Speedex-website` | 📦 Backup / Portfolio |

### **Solution**
Un script de build génère automatiquement les deux versions à partir des sources communes.

---

## 🚀 Comment Utiliser

### **1. Modifier les Sources**
Éditez les fichiers à la **racine** du projet :
```bash
vim index.html        # Page française
vim index-en.html     # Page anglaise
vim css/styles.css    # Styles
```

### **2. Lancer le Build**
```bash
./build-deploy.sh
```

**Résultat :**
- ✅ `dist/` créé avec URLs Cloudflare
- ✅ `github/` créé avec URLs GitHub Pages

### **3. Déployer**

#### **Cloudflare Pages**
```bash
npx wrangler pages deploy dist --project-name speedex
```

#### **GitHub Pages**
```bash
git add github/
git commit -m "Update: GitHub Pages deployment"
git push origin main
```

---

## 🔧 Fonctionnement du Script

Le script `build-deploy.sh` effectue ces opérations :

1. **Nettoyage** : Supprime `dist/` et `github/`
2. **Copie** : Duplique les sources dans chaque dossier
3. **Remplacement** : Change les URLs avec `sed`
   - `dist/` → URLs `extincteurspeedex.ca`
   - `github/` → URLs `salahkhalfi.github.io/Speedex-website`

### **URLs Modifiées**

| Type | Fichier | Balise |
|------|---------|--------|
| Canonical | `index.html` | `<link rel="canonical">` |
| Open Graph | `index.html` | `<meta property="og:url">` |
| Twitter | `index.html` | `<meta property="twitter:url">` |
| Schema.org | `index.html` | `<script type="application/ld+json">` |
| Hreflang | `index.html` | `<link rel="alternate">` |

---

## 📝 Workflow Quotidien

### **Scénario : Vous modifiez le contenu**

```bash
# 1. Modifier les sources
vim index.html

# 2. Rebuild
./build-deploy.sh

# 3. Tester localement (optionnel)
cd dist && python3 -m http.server 8000

# 4. Déployer Cloudflare
npx wrangler pages deploy dist --project-name speedex

# 5. Déployer GitHub
git add github/
git commit -m "Update: Nouveau contenu"
git push origin main
```

---

## ⚠️ Règles Importantes

### **✅ À FAIRE**
- ✅ Toujours éditer les **sources** (racine du projet)
- ✅ Lancer `./build-deploy.sh` après chaque modification
- ✅ Commiter `github/` dans Git
- ✅ Vérifier les deux versions après déploiement

### **❌ À NE PAS FAIRE**
- ❌ Éditer directement `dist/` ou `github/` (écrasé au prochain build)
- ❌ Commiter `dist/` dans Git (généré localement pour Cloudflare)
- ❌ Mélanger les URLs des deux plateformes

---

## 🔍 Vérification Post-Build

### **Cloudflare (dist/)**
```bash
grep "canonical" dist/index.html
# Attendu: https://extincteurspeedex.ca/
```

### **GitHub Pages (github/)**
```bash
grep "canonical" github/index.html
# Attendu: https://salahkhalfi.github.io/Speedex-website/
```

---

## 🎓 Comprendre les Différences

### **Exemple : Balise Canonical**

**Source (`index.html` à la racine) :**
```html
<link rel="canonical" href="https://extincteurspeedex.ca/">
```

**Après Build :**

| Version | Balise Finale |
|---------|--------------|
| `dist/index.html` | `<link rel="canonical" href="https://extincteurspeedex.ca/">` |
| `github/index.html` | `<link rel="canonical" href="https://salahkhalfi.github.io/Speedex-website/">` |

---

## 🚨 Dépannage

### **Problème : Les URLs ne sont pas remplacées**
```bash
# Vérifier que le script a bien exécuté
./build-deploy.sh

# Vérifier manuellement
grep -r "extincteurspeedex.ca" github/
# Ne devrait retourner que les emails (normal)
```

### **Problème : dist/ ou github/ manquants**
```bash
# Relancer le build
rm -rf dist github
./build-deploy.sh
```

---

## 📊 Statistiques

- **Fichiers sources** : 2 HTML + CSS + JS + Images
- **Builds générés** : 2 versions complètes
- **Temps de build** : ~1 seconde
- **Différences** : ~10 lignes d'URLs par fichier HTML

---

## 🎯 Prochaines Améliorations

- [ ] Ajouter minification CSS/JS
- [ ] Optimiser les images automatiquement
- [ ] Intégrer dans un workflow CI/CD
- [ ] Générer un sitemap.xml par plateforme

---

**Créé le :** 2025-11-02  
**Auteur :** Speedex Team  
**Version :** 1.0
