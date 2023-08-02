/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import Formulario from "../components/Formulario";
import { actualizarCiente, obtenerCliente } from "../data/Clientes";
import Error from "../components/Error";

export async function loader({ params }) {
  /*  console.log(params); */
  const cliente = await obtenerCliente(params.clienteId);
  /* console.log(cliente); */
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Cliente No Existente",
    });
  }
  return cliente;
}

export async function action({ request, params }) {
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

  // | Actualizamos el cliente:
  await actualizarCiente(params.clienteId, datos);

  return redirect("/");
}
const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();
  /* console.log(cliente); */
  return (
    <>
      <h1 className=" font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuacion podrás modificar los datos de un cliente
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
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className=" mt-5 uppercase p-3 bg-blue-800 w-full text-lg text-white font-bold"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
