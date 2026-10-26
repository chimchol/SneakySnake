// How much each machine gives per second
// Each upgrade level grows you much faster: 1, 3, 7, 18, 46, 119, 308 ... per second
let pixieBoost = false; // Pixie's reward: super overpowered log and treadmill
let trailTier = 0, motorTier = 0;
const treadGain = (lvl) => gainOf(lvl) * TRAILS[trailTier].mult;
const woodGain = (lvl) => gainOf(lvl) * MOTORS[motorTier].mult;
function gainOf(lvl) { return pixieBoost ? 1e9 : Math.round(Math.pow(2.6, Math.min(lvl, MAX_LVL) - 1)); }
