import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function ImagenIndex() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');

    const elementosPorPagina = 10;

    useEffect(() => {

        // se ejecuta al cargar el componente
        setLoading(true);

        cargarImagenes();

    }, [])
    
    const cargarImagenes = () => {
        axios.get('/imagen/').then((respuesta) => {
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

        cargarImagenes();

    }, [])

    const borrarElementoDB = (id) => {
        axios.delete('/imagen/' + id).then((respuesta) => {
            console.log("***", respuesta)
            cargarImagenes();
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
    const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
    };

    const calcularCantidadPaginas = () => {
        return Math.ceil(data.length / elementosPorPagina);
    };

    const filtrarElementosSegunPagina = () => {
        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        return data.slice(inicio, fin);
    };




    return (

        <div>

            <div className='flex justify-between m-5'>

                <div className=' text-xl font-medium '>
                    Gestion de Imagenes
                </div>
                {loading && <div className='p-2 mt-10 text-center text-white bg-green-500'>Cargando ...</div>}

                <div className='flex justify-center w-full mt-10'>
                    <div className='w-1/4'>

                        <input
                            type='text'
                            className='w-full p-2 mb-4 border border-gray-400 rounded'
                            placeholder='Buscar por ubicacion'
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        /></div>

                </div>
                <div>
                    <Link to="/admin/imagen/nuevo">
                        <button className='p-2 bg-green-500 rounded-md hover:bg-green-700 hover:text-white '>NUEVA IMAGEN</button>
                    </Link> </div>


            </div>

            

            {/* TABLA  */}
            <div>
                <table className='table-auto m-4'>

                    <thead className=' bg-black'>
                        <tr className='font-thin  text-slate-200'>
                            <th className='p-3'>ID</th>
                            <th className='p-3'>Ubicacion</th>
                            <th className='p-3' >Nro de orden</th>
                            <th className='p-3'>Producto id</th>
                            <th className='p-3'>Acciones</th>

                        </tr>

                    </thead >
                    <tbody className='bg-slate-200 '>
                    {filtrarElementosSegunPagina().filter((imagen) =>
                            imagen.ubicacion.toLowerCase().includes(filtro.toLowerCase())).map((imagen, index) =>
                            <tr className=' ' key={index}>
                                <td className='p-3' >{imagen.id}</td>
                                <td className=' p-3 '>{imagen.ubicacion}</td>
                                <td className=' p-3 '>{imagen.nroDeOrden}</td>
                                <td className=' p-3 ' >{imagen.ProductoId}</td>
                                {/* <td>{imagen.disponible ? <div className='text-green-500'>SI</siv> : <div className='text-red-500' >NO</div>}</td>*/}
                                <td className='grid-col-1 md:grid-cols-2 m-2 gap-3'>
                                    <div>
                                        <button className='p-1 text-white bg-slate-500 rounded-md hover:bg-slate-800' onClick={() => navigate("/admin/imagen/" + imagen.id)} >EDITAR</button> </div>
                                    <div>

                                        <button className='p-1 text-white bg-red-500 rounded-md hover:bg-red-800' onClick={() => borrarElemento(imagen.id)}>
                                            BORRAR</button>
                                    </div>
                                </td>

                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
            
       
         <div>
         <div className='flex justify-center mt-5'>
         {filtrarElementosSegunPagina().filter((imagen) =>
           imagen.ubicacion.toLowerCase().includes(filtro.toLowerCase())
         ).length === 0 ? (
           <tr>
             <td colSpan={5} className='px-4 py-2 text-center border border-gray-400'>
               No se encontraron ubicaciones que coincidan con su búsqueda.
             </td>
           </tr>
         ) :
           <div  >
             {Array.from({ length: calcularCantidadPaginas() }, (_, i) => (
               <button
                 key={i + 1}
                 className={`mx-2 py-2 px-4 rounded ${paginaActual === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                   }`}
                 onClick={() => cambiarPagina(i + 1)}
               >
                 {i + 1}
               </button>
             ))}
           </div>
         }
       </div>
     </div>
     </div>
   
   
    )
}

export default ImagenIndex;