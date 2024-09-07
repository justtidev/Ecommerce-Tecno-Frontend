import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function ProductoIndex() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    const cargarProductos = () => {
        axios.get('/producto/').then((respuesta) => {
            console.log("***", respuesta)

            setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.data)
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }

    useEffect(() => {

        // se ejecuta al cargar el componente
        setLoading(true);

        cargarProductos();

    }, [])

    const borrarElementoDB = (id) => {
        axios.delete('/producto/' + id).then((respuesta) => {
            console.log("***", respuesta)
            cargarProductos();
        }).catch((error) => {
            console.log("error", error)
        });



    }

    const borrarElemento = (id) => {
        console.log("borrar elemento", id);
        if (window.confirm("¿Desea borrar el elemento?")) {
            console.log("confirma borrar")
            borrarElementoDB(id);
        }
    }


    return (

        <div>

            <div className='flex justify-between m-5'>

                <div  className=' text-xl font-medium '>
                    Gestion de Productos
                </div>
                <div>
                    <Link to="/admin/producto/nuevo">
                        <button className='p-2 bg-green-500 rounded-md  hover:bg-green-700 hover:text-white '>NUEVO PRODUCTO</button>
                    </Link> </div>


            </div>

            {loading && <div className='p-2 mt-10 border-black text-center text-white bg-green-500'>Cargando ...</div>}


            <div>
                <table className='table-auto m-4'>
                    <thead className=' bg-black'>
                        <tr className='font-thin  text-slate-200'>
                            <th className='p-3'>ID</th>
                            <th className='p-3'>Nombre</th>
                            <th className='p-3'>Descripcion Breve</th>
                            <th className='p-3'>Precio Unitario</th>
                            <th className='p-3'>Stock</th>
                            <th className='p-3'>Descripcion Detallada</th>
                            <th className='p-3'>Costo Producto</th>
                            <th className='p-3'>Categoria Id</th>
                            <th className='p-3'>Acciones</th>
                        </tr>

                    </thead>
                    <tbody className='bg-slate-200'>
                        {data && data.length > 0 && data.map((producto, index) =>
                            <tr key={index}>
                                <td className='p-3'>{producto.id}</td>
                                <td className='p-3'>{producto.nombre}</td>
                                <td className='p-3'>{producto.descripcionBreve}</td>
                                <td className='p-3'>{producto.precioUnitario}</td>
                                <td className='p-3'>{producto.stock}</td>
                                <td className='p-3'>{producto.descripcionDetallada}</td>
                                <td className='p-3'>{producto.costoProducto}</td>
                                <td className='p-3'>{producto.CategoriumId}</td>
                                {/* <td>{imagen.disponible ? <div className='text-green-500'>SI</siv> : <div className='text-red-500' >NO</div>}</td>*/}
                                <td className='grid-col-1 md:grid-cols-2 m-2 gap-3'>
                                    <div>
                                        <button className='p-1 text-white bg-slate-500 rounded-md hover:bg-slate-800' onClick={() => navigate("/admin/producto/" + producto.id)} >EDITAR</button> </div>
                                    <div>
                                        <button className='p-1 text-white bg-red-500 rounded-md hover:bg-red-800' onClick={() => borrarElemento(producto.id)}>
                                            BORRAR</button> 
                                            </div>
                                            </td>

                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default ProductoIndex;