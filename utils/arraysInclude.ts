export default function (array1, array2) {
  const set2 = new Set(array2);
  return array1.some(element => set2.has(element));
}
