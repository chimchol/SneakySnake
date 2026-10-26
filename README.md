# Sneaky Snake

A 3D snake game built with [three.js](https://threejs.org/). No build step: open `index.html` or serve the folder.

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Layout

```
index.html            page markup; loads the scripts below in order
css/style.css         all styling
js/core/              error box, number formatting, voice, renderer & scene
js/data/              plain constants: island layout, eggs, pet lines, machines & shops, parkour, settings
js/world/             spawn island, the 13 zones, pen, shops, teleport pad
js/entities/          bosses, egg textures, eggs, pets, nests
js/machines/          treadmill, spinning log, gains, upgrade looks
js/systems/           saved progress, snake, input, movement, poles, stealing, money, night, parkour, skin, Pixie
js/ui/                HUD, home arrow, egg album, reset button
js/main.js            camera, resize, and the game loop (loaded last)
```

The scripts are plain (non-module) scripts that share one global scope, so the order of the `<script>` tags in `index.html` matters: anything a file uses while it loads must come from a file listed above it.
