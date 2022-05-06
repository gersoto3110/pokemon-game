function matchMedia(maxWidth) {
  return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
}

export default function itemsPerPagePerMatchMedia() {
  let itemsPerPage;

  if (matchMedia(871)) {
    itemsPerPage = 6;
  } else if (matchMedia(1095)) {
    itemsPerPage = 8;
  } else if (matchMedia(1319)){
    itemsPerPage = 10;
  } else if (matchMedia(1543)) {
    itemsPerPage = 12;
  } else {
    itemsPerPage = 14;
  }

  return itemsPerPage;
}
