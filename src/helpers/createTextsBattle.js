function attackUsed(pokePlayer, attack) {
  return `${pokePlayer.name} usó ${attack.name}`;
}

function damageReceived(pokePlayer, damageReceived) {
  return `${pokePlayer.name} recibió ${damageReceived} puntos de daño`;
}

export default function createTextsBattle(
  pokePlayer1,
  attack1,
  damageReceived1,
  pokePlayer2,
  attack2,
  damageReceived2
) {
  return [
    attackUsed(pokePlayer1, attack1),
    damageReceived(pokePlayer2, damageReceived2),
    attackUsed(pokePlayer2, attack2),
    damageReceived(pokePlayer1, damageReceived1),
  ];
}
