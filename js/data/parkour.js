// Pixie's parkour course layout
const PKX = 700, PKZ = 0;                       // start platform centre
const LOG_Z1 = PKZ - 6, LOG_Z2 = PKZ - 40;       // the big spinning log
const MIDA = { z1: LOG_Z2, z2: LOG_Z2 - 12 };   // landing platform after the log
const MOVERS = [0, 1, 2, 3, 4, 5].map((i) => ({ z: MIDA.z2 - 6 - i * 8.5, phase: i * 1.3, speed: 0.55 + (i % 3) * 0.15, x: PKX }));
const MIDB = { z1: MOVERS[5].z - 6, z2: MOVERS[5].z - 20 };
const POLE_Z1 = MIDB.z2, POLE_Z2 = MIDB.z2 - 40;
const LANES = [-6, -3, 0, 3, 6];
const ENDP = { z1: POLE_Z2, z2: POLE_Z2 - 14 };
const PRESENT = { x: PKX, z: ENDP.z2 + 6 };
