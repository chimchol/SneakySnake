// Treadmill & log positions, shop items, and how the machines look at each upgrade level
const TREAD = { x: -11, z: 3, w: 3.2, l: 7 };
const WOOD = { x: 11, z: 3, r: 1, h: 5 };
// Trail Shop (multiplies speed from the treadmill) and Motor Shop (makes the log spin faster and multiplies length)
const TRAILS = [
  { name: 'No trail', mult: 1, cost: 0 },
  { name: 'Sparkle Trail', mult: 2, cost: 1e6, color: 0xffffff },
  { name: 'Fire Trail', mult: 3, cost: 1e9, color: 0xff7a1a },
  { name: 'Ice Trail', mult: 5, cost: 1e12, color: 0x7fe0ff },
  { name: 'Rainbow Trail', mult: 10, cost: 1e15, rainbow: true },
  { name: 'Galaxy Trail', mult: 25, cost: 1e18, color: 0xb07aff },
  { name: 'Golden Trail', mult: 50, cost: 1e21, color: 0xffd23f }
];
const MOTORS = [
  { name: 'No motor', mult: 1, cost: 0 },
  { name: 'Small Motor', mult: 2, cost: 1e6, color: 0x8c8a93 },
  { name: 'Turbo Motor', mult: 3, cost: 1e9, color: 0x2f5fa8 },
  { name: 'Jet Motor', mult: 5, cost: 1e12, color: 0xd0d0d8 },
  { name: 'Rocket Motor', mult: 10, cost: 1e15, color: 0xd0302a },
  { name: 'Lightning Motor', mult: 25, cost: 1e18, color: 0xffd23f },
  { name: 'Cosmic Motor', mult: 50, cost: 1e21, color: 0x6a3ac0 }
];
const MAX_LVL = 15; // Rainbow is the top skin, so it is also the max level
const TREAD_TIERS = [
  { name: 'Basic', body: 0x39404a, trim: 0xf6c23e, screen: '#8bf06a', text: '#9a7400' },
  { name: 'Blue', body: 0x2f5fa8, trim: 0x9fe0ff, screen: '#9fe0ff', text: '#2f5fa8' },
  { name: 'Jungle', body: 0x2f8a4a, trim: 0xb6f56a, screen: '#b6f56a', text: '#2f8a4a' },
  { name: 'Fire', body: 0xb23a3a, trim: 0xffb03a, screen: '#ffb03a', text: '#b23a3a' },
  { name: 'Golden', body: 0xd4a22a, trim: 0xfff1a8, screen: '#fff1a8', text: '#a67a00' },
  { name: 'Enchanted', body: 0x5a2a8a, trim: 0xe0a0ff, screen: '#e0a0ff', text: '#7a3ab8', glow: 0x6a2aa0 },
  { name: 'Ice', body: 0xbfe8f5, trim: 0xffffff, screen: '#bfe8f5', text: '#2a8ab0', glow: 0x1a3a4a },
  { name: 'Lava', body: 0x1a1414, trim: 0xff6a1a, screen: '#ff6a1a', text: '#c0400a', glow: 0xa03000 },
  { name: 'Ocean', body: 0x0f4a6a, trim: 0x3ad0c0, screen: '#3ad0c0', text: '#0f6a8a' },
  { name: 'Candy', body: 0xff8fc0, trim: 0xffffff, screen: '#ffd0e6', text: '#d0407a' },
  { name: 'Shadow', body: 0x101014, trim: 0x8a4aff, screen: '#8a4aff', text: '#5a2ab0', glow: 0x3a1a8a },
  { name: 'Neon', body: 0x14141a, trim: 0x39ff6a, screen: '#39ff6a', text: '#1a9a3a', glow: 0x10a030 },
  { name: 'Diamond', body: 0xe8f8ff, trim: 0x7fe0ff, screen: '#7fe0ff', text: '#2a9ac0', glow: 0x204050, shiny: true },
  { name: 'Galaxy', body: 0x1a1040, trim: 0xff7ae0, screen: '#c0a0ff', text: '#6a3ac0', glow: 0x4020a0 },
  { name: 'Rainbow', body: 0xffffff, trim: 0xffffff, screen: '#ffffff', text: '#d0407a', rainbow: true }
];
const WOOD_TIERS = [
  { name: 'Oak', bark: 0x8a5a2b, cut: 0xe9c48a, stand: 0x8c8a93, text: '#7a4a26' },
  { name: 'Birch', bark: 0xf2eee2, cut: 0xf7ecd0, stand: 0x9aa0a8, text: '#6d6a5e' },
  { name: 'Dark wood', bark: 0x4a2c16, cut: 0xb07a42, stand: 0x5d5163, text: '#4a2c16' },
  { name: 'Crystal', bark: 0x7fd4f0, cut: 0xd8f6ff, stand: 0x4a90b8, text: '#2a7ca8', shiny: true },
  { name: 'Golden', bark: 0xf2bd2c, cut: 0xfff1a8, stand: 0xb88a1a, text: '#a67a00', shiny: true },
  { name: 'Enchanted', bark: 0xa54be0, cut: 0xf0c8ff, stand: 0x5a2a8a, text: '#7a3ab8', shiny: true, glow: 0x4a1278 },
  { name: 'Ice', bark: 0xcff2ff, cut: 0xffffff, stand: 0x8ac8e0, text: '#2a8ab0', shiny: true, glow: 0x1a3a4a },
  { name: 'Lava', bark: 0x2a1a14, cut: 0xff6a1a, stand: 0x1a1414, text: '#c0400a', glow: 0x8a2a00 },
  { name: 'Ancient moss', bark: 0x4a7a3a, cut: 0xb0d08a, stand: 0x5a6a5a, text: '#3a6a2a' },
  { name: 'Candy', bark: 0xff8fc0, cut: 0xffffff, stand: 0xffd0e6, text: '#d0407a', shiny: true },
  { name: 'Shadow', bark: 0x141018, cut: 0x8a4aff, stand: 0x101014, text: '#5a2ab0', glow: 0x2a1060 },
  { name: 'Neon', bark: 0x1a2a1a, cut: 0x39ff6a, stand: 0x14141a, text: '#1a9a3a', glow: 0x0a8a2a },
  { name: 'Diamond', bark: 0xe8f8ff, cut: 0x7fe0ff, stand: 0xb0d8e8, text: '#2a9ac0', shiny: true, glow: 0x203a48 },
  { name: 'Galaxy', bark: 0x241458, cut: 0xff7ae0, stand: 0x1a1040, text: '#6a3ac0', shiny: true, glow: 0x3a1a90 },
  { name: 'Rainbow', bark: 0xffffff, cut: 0xffffff, stand: 0xffffff, text: '#d0407a', shiny: true, rainbow: true }
];
const SHOPS = [
  { key: 'trail', name: 'Trail Shop', x: -18, z: 12, roof: 0xff7ae0, items: TRAILS },
  { key: 'motor', name: 'Motor Shop', x: 18, z: 12, roof: 0x2f5fa8, items: MOTORS }
];
