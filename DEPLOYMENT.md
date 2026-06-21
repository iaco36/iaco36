# Installation et Déploiement

## Installation locale

### Prérequis
- Node.js 16+ et npm/pnpm/yarn

### Étapes d'installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# L'application se lancera automatiquement sur http://localhost:5173
```

## Production

Pour créer une build de production :

```bash
npm run build
npm run preview
```

Les fichiers de production seront dans le répertoire `dist/`.

## Utilisation de l'application

### 1. Charger un signal

Vous avez quatre options :

**Audio Upload**
- Cliquez sur "Upload Audio File"
- Sélectionnez un fichier MP3 ou WAV
- Le signal audio s'affiche immédiatement

**Microphone**
- Cliquez sur "Record from Microphone"
- L'application enregistre 3 secondes d'audio
- Autorisez l'accès au microphone quand demandé

**Signal Generator**
- Configurez un ou plusieurs signaux (sine, square, sawtooth, triangle)
- Ajustez fréquence, amplitude et durée
- Combinez plusieurs signaux pour analyser les interactions
- Cliquez "Generate"

**Image Upload**
- Chargez une image (PNG, JPG, etc.)
- Choisissez direction (horizontale = ligne du milieu, verticale = colonne du milieu)
- Les valeurs de pixels deviennent le signal

### 2. Interpréter les visualisations

**Domaine Temporel** (graphique gauche)
- Montre le signal brut dans le temps
- L'axe X est le temps en secondes
- L'axe Y est l'amplitude

**Spectre de Fréquences** (graphique droite)
- Montre les composantes de fréquences du signal
- L'axe X est la fréquence en Hertz
- L'axe Y est l'amplitude normalisée
- Les pics indiquent les fréquences dominantes

### 3. Paramètres FFT

**Window Function** (Fenêtrage)
- **Rectangular** : Pas de lissage (spectral leakage)
- **Hann** : Fenêtrage lisse (recommandé)
- **Hamming** : Fenêtrage plus agressif

**Log Scale**
- Active l'échelle logarithmique pour les fréquences
- Utile pour voir les détails aux basses fréquences

## Exemples d'utilisation

### Analysez un La musical (A4 = 440 Hz)
1. Allez au Signal Generator
2. Générez une onde sinusoïdale 440 Hz, 1 seconde
3. Vous verrez un pic à 440 Hz dans le spectre de fréquences

### Combinez deux fréquences
1. Ajoutez 440 Hz (sine)
2. Ajoutez 880 Hz (octave supérieure)
3. Cliquez Generate
4. Le spectre montrera deux pics distincts

### Analysez une voix
1. Enregistrez depuis le microphone
2. Examinez le spectre pour voir les harmoniques
3. Essayez différentes fenêtres pour clarifier

### Analysez une image
1. Chargez une photo ou un dessin
2. Visualisez les patterns de fréquences spatiales
3. Les structures périodiques de l'image créent des pics

## Architecture du projet

```
├── src/
│   ├── components/
│   │   ├── SignalInput/          # Gestion des entrées
│   │   ├── Visualizations/       # Graphiques
│   │   └── Panels/               # Panneaux de contrôle
│   ├── utils/
│   │   ├── fftCalculator.ts      # Calcul FFT
│   │   ├── audioProcessing.ts    # Traitement audio
│   │   ├── signalGenerator.ts    # Génération de signaux
│   │   └── imageProcessing.ts    # Extraction d'images
│   ├── types/
│   └── App.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Dépendances principales

- **React 18** - Framework UI
- **Chart.js** - Visualisation de graphiques
- **fft.js** - Calcul FFT
- **Tailwind CSS** - Styling
- **Lucide React** - Icônes

## Dépannage

**L'application refuse l'accès au microphone**
- Vérifiez les paramètres de confidentialité de votre navigateur
- Autorisez l'accès au microphone pour localhost

**Les graphiques sont vides**
- Assurez-vous d'avoir chargé un signal
- Vérifiez la console du navigateur pour les erreurs

**Audio ne se charge pas**
- Vérifiez que le format est MP3 ou WAV
- Certains formats audio propriétaires peuvent ne pas être supportés

**FFT semble incorrect**
- Essayez une fenêtre Hann pour réduire les artefacts spectraux
- Les fenêtres rectangulaires peuvent montrer des "lobes" spectraux
