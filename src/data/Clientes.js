// This function is gonna be imported in the Index page-component into the loader.
export async function obtenerClientes() {
  const respuesta = await fetch(import.meta.env.VITE_API_URL);
  const resultado = await respuesta.json();
  /*  console.log(resultado); */
  return resultado;
}

// This function is gonna be exported to 'EditarCientes'.
export async function obtenerCliente(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const resultado = await respuesta.json();
  /*  console.log(resultado); */
  return resultado;
}

// This function is gonna be exported to 'NuevosCientes'.
export async function agregarClientes(datos) {
  /*   console.log(datos); */
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json",
      },
    });
    await respuesta.json;
    /* console.log(respuesta); */
  } catch (error) {
    console.log(error);
  }
}

// This function is gonna be exported to 'EditarCiente'.
export async function actualizarCiente(id, datos) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json",
      },
    });
    await respuesta.json;
    /* console.log(respuesta); */
  } catch (error) {
    console.log(error);
  }
}

// This function is gonna be exported to 'Cliente'.
export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
    });
    await respuesta.json;
    /* console.log(respuesta); */
  } catch (error) {
    console.log(error);
  }
}
