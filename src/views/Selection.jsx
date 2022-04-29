import React from "react";

const Selection = ({ onReady }) => {
  return (
    <>
      <div>
        <h2>Seleccionar Pokemon</h2>

        <input type="text" placeholder="Nombre" name="name" />
        <input
          type="button"
          value="Buscar"
          onClick={() => {
            onReady();
          }}
        />
      </div>
    </>
  );
};

export default Selection;
