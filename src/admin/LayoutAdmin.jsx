import { Outlet, Link, useNavigate } from "react-router-dom"

function LayoutAdmin() {
    const navigate = useNavigate();
    return (
        <div>
 
            <div className="flex justify-center w-full p-4 gap-5 text-white bg-black jus">
                <button className="mr-4 hover:text-red-500" 
                    onClick={()=> navigate('/admin/dashboard')}>Dashboard
                </button>
                <button className="mr-4 hover:text-red-500" 
                    onClick={()=> navigate('/admin/producto')}>Producto
                </button>
                <button className="mr-4 hover:text-red-500" 
                    onClick={()=> navigate('/admin/categoria')}>Categoria
                </button>
                <button className="mr-4 hover:text-red-500" 
                    onClick={()=> navigate('/admin/imagen')}>Imagen
                </button>
                <button className="mr-4 hover:text-red-500" 
                    onClick={()=> navigate('/admin/usuario')}>Usuario
                </button>
                <button className="mr-4 hover:text-red-500" 
                    onClick={()=> navigate('/admin/cupones')}>Cupon
                </button>
               
                
           

           <Outlet />
        </div>
        </div>
    )
}

export default LayoutAdmin;