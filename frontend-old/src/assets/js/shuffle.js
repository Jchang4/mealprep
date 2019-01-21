
export default function shuffle(arr) {
  let curr = arr.length,
      tmp = null,
      rand = null;

  while (0 !== curr) {
    rand = Math.floor(Math.random() * curr--); // decrements curr as well. so convenient

    tmp = arr[curr];
    arr[curr] = arr[rand]
    arr[rand] = tmp
  }

  return arr;
}
