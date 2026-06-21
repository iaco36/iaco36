# Démarrage rapide - Fourier Transform Visualizer

## 🚀 Lancer localement (1 minute)

```bash
npm install
npm run dev
```

Ouvre automatiquement http://localhost:5173

---

## 🌍 Déployer sur GitHub Pages (Gratuit - 5 minutes)

**Sur votre machine :**

```bash
# 1. Remplacez YOUR_USERNAME dans package.json
sed -i 's/<your-username>/YOUR_USERNAME/g' package.json

# 2. Installez et déployez
npm install
npm run deploy
```

**Sur GitHub :**

1. Allez dans **Settings** → **Pages**
2. Sélectionnez branche `gh-pages`
3. Votre site est en ligne ! 🎉

**URL :** `https://YOUR_USERNAME.github.io/iaco36/`

---

## 🐳 Déployer avec Docker (3 minutes)

```bash
# Build et lancer
docker-compose up --build

# Accédez à http://localhost:3000
```

---

## ⚡ Déployer sur Vercel (2 clics)

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Importez votre repository GitHub `iaco36`
3. Cliquez "Deploy"
4. C'est fait ! URL : `https://iaco36.vercel.app`

---

## 🎯 Déployer sur Netlify (2 clics)

1. Allez sur [app.netlify.com/start](https://app.netlify.com/start)
2. Connectez votre GitHub
3. Sélectionnez `iaco36`
4. Cliquez "Deploy"
5. C'est fait ! URL automatique générée

---

## 📊 Cas d'usage

### Analysez une note musicale (La = 440 Hz)
1. Signal Generator
2. Sine 440 Hz, 1 seconde
3. Regardez le pic à 440 Hz

### Enregistrez votre voix
1. Record from Microphone
2. Observez les harmoniques

### Chargez une image
1. Upload Image
2. Visualisez les fréquences spatiales

---

## ✅ Fichiers de configuration disponibles

- `vite.config.ts` - Configuration Vite
- `Dockerfile` - Pour déploiement Docker
- `docker-compose.yml` - Docker Compose
- `vercel.json` - Configuration Vercel
- `netlify.toml` - Configuration Netlify
- `ENVIRONMENTS.md` - Guide détaillé complet

---

## 🛠️ Besoin d'aide ?

Consultez les guides complets :
- **DEPLOYMENT.md** - Guide d'utilisation détaillé
- **ENVIRONMENTS.md** - Tous les environnements de déploiement
- **README.md** - Vue d'ensemble du projet
