#!/bin/bash
# Script de synchronisation vers deploy/

echo "🔄 Synchronisation vers deploy/..."

# Supprimer l'ancien contenu
rm -rf deploy/*

# Recréer la structure
mkdir -p deploy/{css,js,images}

# Copier les fichiers HTML
cp -f index.html deploy/
cp -f index-en.html deploy/

# Copier CSS
cp -f css/styles.css deploy/css/

# Copier JavaScript
cp -f js/main.js deploy/js/

# Copier les images
cp -f images/* deploy/images/

# Copier README
cp -f deploy/README.txt deploy/ 2>/dev/null || echo "README.txt déjà en place"

echo "✅ Synchronisation terminée!"
echo ""
echo "📂 Contenu de deploy/:"
ls -lh deploy/
echo ""
ls -lh deploy/css/
echo ""
ls -lh deploy/js/
echo ""
ls -lh deploy/images/
