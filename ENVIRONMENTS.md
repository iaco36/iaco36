# Guides de déploiement pour différents environnements

## 1. GitHub Pages (Recommandé - Gratuit)

### Configuration

L'application est déjà configurée pour GitHub Pages. Voici comment déployer :

#### Étape 1 : Modifier package.json
Dans `package.json`, remplacez `<your-username>` par votre nom d'utilisateur GitHub :

```json
"homepage": "https://YOUR_USERNAME.github.io/iaco36/"
```

#### Étape 2 : Installation et déploiement localement

```bash
# Installer les dépendances
npm install

# Déployer sur GitHub Pages
npm run deploy
```

Cela va créer une branche `gh-pages` et pousser votre site.

#### Étape 3 : Configurer GitHub Pages

1. Allez dans les **Settings** de votre repository
2. Naviguer vers **Pages**
3. Sélectionnez la branche `gh-pages` comme source
4. Attendez quelques minutes

Votre site sera accessible à : `https://YOUR_USERNAME.github.io/iaco36/`

---

## 2. Docker (Portable)

### Prérequis
- Docker installé

### Déploiement

```bash
# Build l'image
docker build -t fourier-app .

# Lancer le conteneur
docker run -p 3000:3000 fourier-app
```

Accédez à `http://localhost:3000`

### Avec docker-compose

```bash
# Lancer
docker-compose up --build

# Arrêter
docker-compose down
```

### Déploiement sur un serveur

```bash
# Sur votre serveur, clonez le repo
git clone https://github.com/YOUR_USERNAME/iaco36.git
cd iaco36

# Lancez avec docker-compose
docker-compose up -d
```

---

## 3. Vercel (Très facile - Gratuit)

### Étape 1 : Connecter votre repository

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "Import Project"
4. Sélectionnez votre repository `iaco36`

### Étape 2 : Configuration

Vercel détecte automatiquement :
- Build command: `npm run build`
- Output directory: `dist`

Cliquez sur "Deploy" et attendez.

### Résultat

Votre application sera accessible à une URL comme :
`https://iaco36.vercel.app`

---

## 4. Netlify (Facile - Gratuit)

### Étape 1 : Connecter votre repository

1. Allez sur [netlify.com](https://netlify.com)
2. Connectez-vous avec GitHub
3. Cliquez sur "New site from Git"
4. Sélectionnez votre repository

### Étape 2 : Configuration

Netlify lit automatiquement `netlify.toml` :
- Build command: `npm run build`
- Publish directory: `dist`

Cliquez sur "Deploy" et attendez.

### Résultat

Votre application sera accessible à une URL comme :
`https://iaco36-XXXX.netlify.app`

---

## 5. Serveur Node.js/VPS (Auto-hébergé)

### Prérequis
- Node.js 16+ sur votre serveur
- Nginx ou Apache (optionnel, pour le reverse proxy)

### Installation

```bash
# SSH sur votre serveur
ssh user@your-vps.com

# Clonez le repository
git clone https://github.com/YOUR_USERNAME/iaco36.git
cd iaco36

# Installez les dépendances
npm install

# Build
npm run build
```

### Lancer l'application

#### Option 1 : Directement avec serve

```bash
npm install -g serve
serve -s dist -l 3000
```

#### Option 2 : Avec PM2 (recommandé pour production)

```bash
npm install -g pm2

# Créez un fichier ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'fourier-app',
    script: 'npx',
    args: 'serve -s dist -l 3000',
    watch: false,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF

# Lancez avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Option 3 : Avec Nginx reverse proxy

```bash
# Installez nginx
sudo apt-get install nginx

# Créez une configuration
sudo nano /etc/nginx/sites-available/fourier-app
```

Contenu du fichier :

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activez :

```bash
sudo ln -s /etc/nginx/sites-available/fourier-app /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 6. Comparaison des options

| Option | Coût | Setup | Performance | Limitations |
|--------|------|-------|-------------|------------|
| **GitHub Pages** | Gratuit | 5 min | ⭐⭐⭐ | Site statique uniquement |
| **Docker** | Votre serveur | 10 min | ⭐⭐⭐⭐ | Nécessite Docker |
| **Vercel** | Gratuit | 2 min | ⭐⭐⭐⭐⭐ | Limite API gratuite |
| **Netlify** | Gratuit | 2 min | ⭐⭐⭐⭐ | Limite déploiements |
| **VPS Node.js** | ~5-10$/mois | 20 min | ⭐⭐⭐⭐⭐ | Nécessite maintenance |

---

## Recommandation pour débuter

1. **GitHub Pages** : Idéal pour tester sans frais
2. **Vercel** : Meilleure performance et expérience utilisateur
3. **Docker** : Pour déployer sur votre propre infrastructure

---

## Variables d'environnement

Si vous avez besoin de variables d'environnement :

```bash
# Dans .env.production
VITE_API_URL=https://api.example.com
```

Tous les environnements supportent les variables préfixées par `VITE_`
