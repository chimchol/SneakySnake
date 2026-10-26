# Sneaky Snake


# 🐍 Sneaky Snake

A 3D browser game where you play as a sneaky snake who steals eggs from bosses, hatches them into pets, and 
uses the money to grow faster and longer so it can reach farther, harder zones.

The game was designed by a young game designer, who came up with the zones, bosses, pets, and rules, and was 
built and tested together with Claude.

---

## How to play

Open `sneaky-snake.html` in a web browser (Chrome, Edge, Firefox, Safari) while connected to the internet. 
That's it, there is nothing to install.

### Controls

| Action | Computer | Phone / tablet |
|---|---|---|
| Move | Arrow keys or move the mouse | Drag your finger |
| Jump (parkour only) | Space | JUMP button |
| Switch poles (parkour only) | ◀ ▶ arrow keys | ◀ ▶ buttons |
| Slow mode on/off | S key or the 🐢 button | 🐢 button |
| Close a menu | Esc | Close button |

### The game loop

1. **Train at spawn.** Run on the **treadmill** to gain **speed**, and wrap around the **spinning log** to 
gain **length**.
2. **Cross the poles.** Zones are linked in a chain by wobbly poles over the void. If you are long enough you 
slither across; if not, the pole falls and you respawn at spawn.
3. **Steal an egg.** Eggs sit in nests in front of each zone's boss.
4. **Run home.** The boss wakes up after 1 second, its eyes glow red, and it chases you, across every pole, 
all the way back to spawn. A yellow arrow over your head points to the pole home.
5. **Hatch it.** As soon as you reach the spawn island the egg flies into your pen and hatches after 5 
seconds.
6. **Earn coins.** Every pet earns coins every second. Spend them on upgrades and shop items, then go for 
farther zones and better eggs.

If a boss catches you, it takes its egg back to its nest and throws you to spawn.

---

## The 13 zones

Each pole needs a certain **length** to cross. Each boss needs a certain **speed** to escape. Eggs are listed 
from most common to rarest.

| # | Zone | Boss | Length for the pole | Speed to escape | Eggs (common → rarest) |
|---|---|---|---|---|---|
| 1 | 🌲 Forest | Chicken | 50 | any | Chicken, Dog, Bird, Owl, **Tree Man** |
| 2 | 🦢 Lake | Swan | 200 | 30 | Duck, Frog, Fish, Turtle, Beaver, **Flamingo** |
| 3 | 🏜️ Desert | Scorpion | 600 | 120 | Lizard, Fox, Camel, Armadillo, Vulture, Snake, **Scorpion** |
| 4 | 🌴 Jungle | Tiger | 1,500 | 400 | Monkey, Parrot, Sloth, Chameleon, Elephant, Gorilla, Panther, 
**Tiger** |
| 5 | 🌋 Volcano | Cerberus | 4,000 | 1,500 | Fire Salamander, Fire Bat, Imp, Hellhound, Baby Dragon, Baby 
Cerberus, **Phoenix** |
| 6 | ❄️ Ice Land | Yeti | 10,000 | 5,000 | Penguin, Arctic Fox, Polar Bear, Reindeer, Whale, Snow Golem, Baby 
Mammoth, **Baby Yeti** |
| 7 | 🌊 Ocean | Whale | 25,000 | 15,000 | Crab, Pufferfish, Dolphin, Octopus, Shark, Mermaid, Baby Kraken, 
**Whale Shark** |
| 8 | 🦖 Prehistoric | T-Rex | 60,000 | 40,000 | Velociraptor, Brontosaurus, Triceratops, Stegosaurus, 
Ankylosaurus, **Baby T-Rex** |
| 9 | 🌌 Cosmic | Cosmic Man | 150,000 | 100,000 | Alien, Space Cat, Star Baby, Planet Pet, Comet, UFO, Space 
Jelly, Moon Bunny, **Baby Cosmic Man** |
| 10 | 🌸 Cherry Blossom | Oni Tiger | 400,000 | 250,000 | Kitsune, Koi, Crane, Little Dragon, Lucky Cat, 
**Baby Oni Tiger** |
| 11 | 🏛️ Titan Temple | Titan Gorilla | 1,000,000 | 600,000 | Stone Golem, Golden Scarab, Temple Cobra, 
Sphinx Cat, War Elephant, Stone Lion, Thunder Bird, Tiny Titan, **Baby Titan Gorilla** |
| 12 | 😇😈 Angels & Demons | Angel or Demon | 2,500,000 | 1,500,000 | 8 angel/demon twin pairs (see below) |
| 13 | 🌲✨ Mystical Forest | Magic Lion | 6,000,000 | 4,000,000 | Spirit Deer, Fairy Butterfly, Mushroom 
Buddy, Wise Owl, Moon Rabbit, Unicorn, Crystal Wolf, Forest Dragon, **Baby Magic Lion** |

Pets from farther zones earn much more money. Each egg looks different (spots, stripes, feathers, a little 
tree on top, and so on), and each pet talks in speech bubbles ("Mama?", "Where is my mom?").

### Zone 12: Angels & Demons

The island is split into Heaven and the Underworld. Every night the guard changes:

- **Half the nights:** the **Angel** boss, with only angel eggs.
- **Half the nights:** the **Demon** boss, with only demon eggs.
- **Rarely:** **both at once**, with both kinds of eggs. This is a 1 in 8 chance, and it can never happen 
within 5 nights of the last time.

Each angel pet has a demon twin that earns the same money:

| 😇 Angel | 😈 Demon |
|---|---|
| Cloud Lamb | Shadow Goat |
| Dove | Bat |
| Halo Cat | Devil Cat |
| Pegasus | Nightmare Horse |
| Golden Lion | Shadow Wolf |
| Light Dragon | Dark Dragon |
| Cherub | Imp King |
| **Baby Angel** | **Baby Demon** |

### Zone 13: the Mystical Forest

The final zone. **Half of all eggs here are Enchanted.** Pixie the fairy lives here, next to a giant hollow 
log (see below).

---

## Mutations

Any egg can be mutated. You can see the mutation on the egg before you steal it, and the pet keeps the color.

| Mutation | Looks like | Money | Chance |
|---|---|---|---|
| Normal | plain | ×1 | most eggs |
| 🥈 Silver | silver | ×1.5 | 1 in 25 |
| 🥇 Gold | gold | ×2 | 1 in 50 |
| 🌈 Rainbow | rainbow stripes | ×3 | 1 in 75 |
| 💜 Enchanted | sparkly purple | ×4 | 1 in 100 |

---

## Day and night

- A **day lasts 8 minutes**, and a **night lasts 30 seconds**. A clock in the top-left counts down.
- 30 seconds before night, the game warns you.
- At night:
  - a stone **wall** blocks the way to the zones,
  - every boss goes home,
  - if you are out in a zone or carrying an egg, you **lose the egg** and go back to spawn,
  - **every nest gets a new egg** (empty nests only refill at night),
  - the game tells you if a **good egg** spawned and in which zone, but not its mutation.

---

## Upgrades and shops

### Treadmill and log upgrades

Hop on a machine and press **Upgrade**. Each level costs 5 times more than the last (1,000 → 5,000 → 25,000 
coins and so on) and makes you grow faster (+1, +3, +7, +18, +46 … per second). Each level also gives the 
machine a new look:

Basic/Oak → Blue/Birch → Jungle/Dark wood → Fire/Crystal → Golden → Enchanted → Ice → Lava → 
Ocean/Ancient moss → Candy → Shadow → Neon → Diamond → Galaxy → **Rainbow (level 15, MAX LEVEL)**

### Trail Shop and Motor Shop

Two stalls on the spawn island. Step up to one to open it.

- **Trail Shop:** a trail of sparkles follows your snake and **multiplies the speed** you get from the 
treadmill.
- **Motor Shop:** a motor makes your log spin faster and **multiplies the length** you get from it.

| Tier | Trail | Motor | Multiplier | Cost (coins) |
|---|---|---|---|---|
| 1 | Sparkle | Small | ×2 | 1 million |
| 2 | Fire | Turbo | ×3 | 1 billion |
| 3 | Ice | Jet | ×5 | 1 trillion |
| 4 | Rainbow | Rocket | ×10 | 1 quadrillion |
| 5 | Galaxy | Lightning | ×25 | 1 quintillion |
| 6 | Golden | Cosmic | ×50 | 1 sextillion |

---

## Pixie's quests and the parkour

Pixie floats next to a giant log in the Mystical Forest. She opens the log after you finish her quests:

- ⬜ Steal **10 eggs** from the Mystical Forest
- ⬜ Hatch **10 Enchanted pets**
- ⬜ Get **1 billion speed**
- ⬜ Get **1 billion length**

Inside the log is a **parkour course**:

1. 🪵 **Giant spinning log:** you need **1 billion speed** to run across, or it launches you back to the 
start.
2. 🟪 **Moving platforms** over the void that slide left and right. Jump from one to the next with **Space**.
3. 🌉 **Shaky poles:** 5 poles side by side. You need **5 billion length**. The pole you are on shakes and 
falls, so switch poles with **◀ ▶** in time.
4. 🎁 **The present** at the end.

If you fall into the void, you start the course again.

### Rewards in the present

- 🪵🏃 **Super overpowered treadmill and log:** 1 billion speed and length every second.
- 🐍 **Mystic skin:** a shiny purple snake with a glowing yellow aura. While you wear it, **every egg you 
steal turns Enchanted**. Switch it on and off with the Skin button.
- 🐯 **The Giant Tiger:** a big, friendly version of the Tiger boss, and the best-earning pet in the game.

---

## Helpers

- 🌀 **Teleport pad** (purple, on spawn): teleport to any zone you have already reached by crossing its pole. 
It does not work at night or while you carry an egg.
- 🐢 **Slow mode:** caps your movement speed so you can steer carefully. It turns off by itself when you grab 
an egg.
- ➡️ **Home arrow:** while you carry an egg, a yellow arrow points to the pole home, and the pole is easier to 
step onto.
- 📖 **Album:** shows every egg in every zone, what it hatches into, how rare it is, how much it earns, and 
whether you have found it.
- 🔊 **Voice:** the game reads important messages out loud (quietly). Turn it on or off with the Voice button.
- 🔄 **Reset game:** starts over from scratch. Tap it twice to confirm.

---

## Technical notes

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
