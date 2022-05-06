function isAnyArgumentNull(array, key) {
  return !array || !key;
}

function typesOfArguments(array, key) {
  return (
    Array.isArray(array) &&
    array.length !== 0 &&
    typeof array[0] === "object" &&
    typeof key === "string"
  );
}

function notChecks(array, key) {
  return (
    isAnyArgumentNull(array, key) ||
    !typesOfArguments(array, key) ||
    !array[0].hasOwnProperty(key)
  );
}

export default function filteredArray(array, key, filter) {
  if (notChecks(array, key)) return [];

  return !filter ? array : array.filter((item) => item[key].includes(filter));
}
