import { Outlet, Link } from "react-router-dom"

function LayoutAdmin() {
    return (
        <div>
 
            <nav className="flex justify-center w-full p-4 gap-5 text-white bg-black jus">
                <div className="mr-4 hover:text-red-500"> 
                    <Link to="/admin/dashboard"> Dashboard  </Link>
                </div>
                <div className=" hover:text-red-500"> 
                    <Link to="/admin/producto"> Producto </Link>
                </div>
                <div className=" hover:text-red-500"> 
                    <Link to="/admin/categoria"> Categoria </Link>
                </div>
                <div className="mr-4 hover:text-red-500"> 
                    <Link to="/admin/imagen"> Imagenes </Link>
                </div>
                <div className="mr-4 hover:text-red-500"> 
                    <Link to="/admin/usuario"> Usuarios </Link>
                </div>
                
            </nav>

           <Outlet />
        </div>
    )
}

export default LayoutAdmin;