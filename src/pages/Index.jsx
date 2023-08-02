/* eslint-disable react-refresh/only-export-components */
// Using this hook we will access to what is returned by the 'loader' function below.
import { useLoaderData } from "react-router-dom";
// Using this function we will access to the data in the db.json (json-server)
import { obtenerClientes } from "../data/Clientes";
import Cliente from "../components/Cliente";

//This Loader is similar to a useEffect (it will execute when the components is ready).
export function loader() {
  const dataClientes = obtenerClientes();
  return dataClientes;
}

const Index = () => {
  // With react-dom we don't use neither the useState nor the useEffect, we use instead the loader function and the useLoaderData hook.
  const clientes = useLoaderData();

  return (
    <>
      <h1 className=" font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>
      {clientes.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contactos</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay Clientes Aún</p>
      )}
    </>
  );
};

export default Index;
