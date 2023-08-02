/* eslint-disable react-refresh/only-export-components */

import { useActionData, useNavigate, Form, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarClientes } from "../data/Clientes";

export async function action({ request }) {
  const formData = await request.formData();

  // A way of getting the data.
  const datos = Object.fromEntries(formData);
  /*  console.log(datos); */

  const email = formData.get("email");
  /* console.log(email); */

  // | VALIDACIONES, START.
  // Validacion de que los campos esten completos:
  const errores = [];
  if (
    Object.values(datos)
      .map((d) => d.trim())
      .includes("")
  ) {
    errores.push("Todos los campos son obligatorios");
  }
  // Validacion del campo de email:
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }
  // | VALIDACIONES, END.

  // | RETORNAR SI HAY ERRORES (Podremos acceder a lo que sea retornado de este action a traves del useActionData hook).
  if (Object.keys(errores).length) {
    return errores;
  }

  // como esta funcion es asincrona le colocamos un await.
  await agregarClientes(datos);

  return redirect("/");
}

const NuevoCliente = () => {
  const navigate = useNavigate();

  const errores = useActionData();
  return (
    <>
      <h1 className=" font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="  bg-blue-800 text-white uppercase font-bold px-3 py-1"
          onClick={() => navigate(-1)} // El '-1' te lleva a la pag anterior.
        >
          Volver
        </button>
      </div>
      <div className=" md:w-3/4 mx-auto bg-white shadow rounded-md px-5 py-10 mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            className=" mt-5 uppercase p-3 bg-blue-800 w-full text-lg text-white font-bold cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
