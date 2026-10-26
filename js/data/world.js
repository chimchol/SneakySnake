// Island layout: sizes, positions, poles between islands, and fixed spots on the map
const R = 30;
const FR = 22, FZ = -R - 18 - FR; // forest island radius and center z
const LR = 24, LZ = FZ - FR - 28 - LR; // lake island radius and center z (longer pole than the forest's)
const DR = 26, DZ = LZ - LR - 36 - DR; // desert island (even longer pole)
const JR = 28, JZ = DZ - DR - 44 - JR; // jungle island
const VR = 30, VZ = JZ - JR - 52 - VR; // volcano island
const IR = 30, IZ = VZ - VR - 60 - IR; // ice land
const OR = 30, OZ = IZ - IR - 68 - OR; // ocean island
const PR = 32, PZ = OZ - OR - 76 - PR; // prehistoric island
const CR = 32, CZ = PZ - PR - 84 - CR; // cosmic island
const BR = 32, BZ = CZ - CR - 92 - BR; // cherry blossom island
const TR = 32, TZ = BZ - BR - 100 - TR; // titan temple island
const AR = 34, AZ = TZ - TR - 108 - AR; // angels & demons island
const MR = 36, MZ = AZ - AR - 116 - MR; // mystical forest, the final zone (longest pole of all)
const ISLANDS = [{ cz: 0, r: R, name: 'Spawn' }, { cz: FZ, r: FR, name: 'Forest' }, { cz: LZ, r: LR, name: 'Lake' }, { cz: DZ, r: DR, name: 'Desert' }, { cz: JZ, r: JR, name: 'Jungle' }, { cz: VZ, r: VR, name: 'Volcano' }, { cz: IZ, r: IR, name: 'Ice Land' }, { cz: OZ, r: OR, name: 'Ocean' }, { cz: PZ, r: PR, name: 'Prehistoric' }, { cz: CZ, r: CR, name: 'Cosmic' }, { cz: BZ, r: BR, name: 'Cherry Blossom' }, { cz: TZ, r: TR, name: 'Titan Temple' }, { cz: AZ, r: AR, name: 'Angels & Demons' }, { cz: MZ, r: MR, name: 'Mystical Forest' }];
// POLES[i] connects island i (south end, z1) to island i+1 (north end, z2)
const POLES = [
  { z1: -R + 0.5, z2: FZ + FR - 0.5, need: 50 },
  { z1: FZ - FR + 0.5, z2: LZ + LR - 0.5, need: 200 },
  { z1: LZ - LR + 0.5, z2: DZ + DR - 0.5, need: 600 },
  { z1: DZ - DR + 0.5, z2: JZ + JR - 0.5, need: 1500 },
  { z1: JZ - JR + 0.5, z2: VZ + VR - 0.5, need: 4000 },
  { z1: VZ - VR + 0.5, z2: IZ + IR - 0.5, need: 10000 },
  { z1: IZ - IR + 0.5, z2: OZ + OR - 0.5, need: 25000 },
  { z1: OZ - OR + 0.5, z2: PZ + PR - 0.5, need: 60000 },
  { z1: PZ - PR + 0.5, z2: CZ + CR - 0.5, need: 150000 },
  { z1: CZ - CR + 0.5, z2: BZ + BR - 0.5, need: 400000 },
  { z1: BZ - BR + 0.5, z2: TZ + TR - 0.5, need: 1000000 },
  { z1: TZ - TR + 0.5, z2: AZ + AR - 0.5, need: 2500000 },
  { z1: AZ - AR + 0.5, z2: MZ + MR - 0.5, need: 6000000 }
];
POLES.forEach((p, i) => { p.index = i; p.len = p.z1 - p.z2; p.mid = (p.z1 + p.z2) / 2; });
const POLE = POLES[0];
const islandAt = (z) => { let i = 0; while (i < POLES.length && z < POLES[i].mid) i++; return i; };
const LAKE_WATER = { x: 0, z: LZ - 13, r: 7.5 };
const PIXIE_SPOT = { x: -16, z: MZ - 4 };
const PEN = { x1: -5.2, x2: 5.2, z1: 11.4, z2: 18.8 };
const TELE = { x: -12, z: -12, r: 1.8 };
