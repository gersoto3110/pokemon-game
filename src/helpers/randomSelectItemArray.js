export default function randomSelectItemArray(array) {
  let index = Math.floor(Math.random() * array.length);

  return array[index];
}
