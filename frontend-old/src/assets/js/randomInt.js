
/* Get random number up to and including max */
export default function randomInt(min, max) {
  if (min > max)
    throw new Error('Min must be less than max.');

  let diff = max - min + 1;
  return Math.round((Math.random() * diff) + min);
}
