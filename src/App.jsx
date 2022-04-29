import Layout from "./components/Layout";
import { useState } from "react";
import Battle from "./views/Battle";
import Selection from "./views/Selection";

/* 
  Crear un componente Selection que cuente con un input que permita filtrar un pokemon.
  Además, deberá contar con un botón que fije la elección.
  Una vez que se haya fijado la elección, se deberá mostrar el componente Battle.

  Debe tener en consideración que, además del usuario, se debe construir la logica necesaria para que
  la IA (la inteligencia artificial, es decir, un pokemon manejado por la computadora) también pueda elegir un pokemon.

  (Para ello, podría ser una opción que la IA elija un pokemon aleatoriamente, o que el usuario pueda elegir un pokemon para la IA)

  El componente Battle deberá permitir que el usuario pueda elegir entre varios ataques, representando cada uno de ellos con un botón.
  Cada ataque debera tener un valor de daño.
  Cada poquemon deberá tener una cantidad finita de puntos de vida, que deberá descontarse al recibir ataques.
  (Tanto el pokemon del usuario como el del rival)
  
  Hay libertad absoluta en cuanto a la lógica.
  No es necesario que los pokemones tengan una estructura particular, sólo que deben tener puntos de vida y ataques.
  No es necesario que los ataques respeten los valores reales, pueden ser arbitrarios.
  No es necesario que los pokemones cuenten con tipo.

  La idea es representar un modelo simple de un juego de batalla.

*/

/* 
  Ayudas:

    Ejemplo de funcion para elegir un indice aleatorio
    
    let arr = [1,2,3,4,5,6,7,8,9]
    const randomIndex = () => {
      let index = Math.floor(Math.random() * arr.length);
      return index;
    }

    Estructura de ejemplo de un pokemon:
    {
      name: "Bulbasaur",
      hp: 100,
      atk: 10,
    }

    Estructura de ejemplo de un ataque:
    {
      name: "Vine Whip",
      damage: 10,
    }

    Estructura de ejemplo de posibles estados para majear usuario y rival:
    {
      user: {
        pokemon: {
          name: "Bulbasaur",
          hp: 100,
          atk: 10,
        },
        attacks: [
          {
            name: "Vine Whip",
            damage: 10,
          },
          {
            name: "Tackle",
            damage: 10,
          },
        ],
      },
      IA: {
        pokemon: {
          name: "Bulbasaur",
          hp: 100,
          atk: 10,
        },
        attacks: [
          {
            name: "Vine Whip",
            damage: 10,
          },
          {
            name: "Tackle",
            damage: 10,
          },
        ],
      },
    }

    En dicho caso, la condición de victoria sería que el pokemon de la IA se haya quedado sin puntos de vida.

    if (IA.pokemon.hp <= 0) {
      alert("Ganaste!");
    }

    if (user.pokemon.hp <= 0) {
      alert("Perdiste!");
    }

    Ejemplo de la logica para procesar los daños:

    setUser({
      ...user,
      pokemon: {
        ...user.pokemon,
        hp: user.pokemon.hp - attack.damage,
      },
    });

    Investiguen sobre la pokeAPI para obtener información sobre los pokemones.
    https://pokeapi.co/


    El siguiente endpoint debería devuelve todos los pokemones:
    https://pokeapi.co/api/v2/pokemon?limit=100000

    dentro hay una url con información específica del pokemon, a su vez, dentro de la url de cada pokemon hay una url con la información de sus ataques.

    pueden optar tanto por fetch como por axios para obtener la información.

    Puede utilizar Props para pasar información entre componentes.

    O puede optar por una estructura de datos más simple, y volcar todos los datos en el componente App.

    En el siguiente ejemplo pasamos la funcion readyToBattle como prop, con el nombre de onReady.
    Dentro del componente Selection, podemos llamar a onReady, función que mantendrá la referencia de readyToBattle.
    (Recordar desestructurar el objeto props para obtener el valor de la prop onReady, o llamarla como props.onReady)

    Ejemplo:

    Componente App

    const App = () => {
      const [ready, setReady] = useState(false);

      const readyToBattle = () => {
        setReady(true);
      };

      return (
        <div>
          <Selection onReady={readyToBattle} /> ----> se pasa la funcion readyToBattle como prop, con el nombre de onReady
        </div>
      );
    }

    ////////////////////////////////////////////

    Componente Selection:

    const Selection = ({ onReady }) => {   ----> se pasa la funcion readyToBattle como prop, con el nombre de onReady
      return (
        <div>
          <button onClick={onReady}>Ready to battle!</button>  ----> se llama a onReady, que mantendrá la referencia de readyToBattle 
        </div>
      );
    };

    ////////////////////////////////////////////

    utilizar reducers para manejar el estado de la aplicación
    utilizar rutas para simular un login (react-router-dom)
    estilizar como deseen

*/

function App() {
  const [ready, setReady] = useState(false);

  const readyToBattle = () => {
    setReady(true);
  };

  return (
    <>
      <Layout>
        {ready ? <Battle /> : <Selection onReady={readyToBattle} />}
      </Layout>
    </>
  );
}

export default App;
