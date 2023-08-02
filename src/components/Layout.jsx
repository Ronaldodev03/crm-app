// With this Outlet component what is inside this Layout component will appear in all the children.
import { Outlet, Link, useLocation } from "react-router-dom";
const Layout = () => {
  // This hook is for knowing in with page we currently are.
  const location = useLocation();
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-white font-black text-4xl text-center">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          <Link
            className={`${
              location.pathname === "/" ? "text-blue-300" : "text-white"
            } text-2xl block mt-2 hover:text-blue-300 `}
            to="/"
          >
            Clientes
          </Link>
          <Link
            className={`${
              location.pathname === "/clientes/nuevo"
                ? "text-blue-300"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300 `}
            to="/clientes/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </aside>
      <main className="md:w-3/4 p-10 md:min-h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
