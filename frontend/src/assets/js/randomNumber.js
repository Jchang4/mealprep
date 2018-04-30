
/* Get random number up to and including max */
export default function randomNumber(min, max) {
  if (min > max)
    throw new Error('Min must be less than max.');

  return (Math.random() * ((max+1)-min)) + min;
}
