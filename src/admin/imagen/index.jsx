import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import LayoutAdmin from '../LayoutAdmin';
function ImagenIndex() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');

    const elementosPorPagina = 10;

    useEffect(() => {
        setLoading(true);
        axios.get('/imagen/').then((respuesta) => {
            setLoading(false);
            if (respuesta.status === 200) {
                setData(respuesta.data.data);
            } else {
                console.log('error');
            }
        }).catch((error) => {
            console.log('error', error);
        });
    }, []);

    const handleEdit = (id) => {

        navigate(`/admin/imagen/${id}`);
    };


    const eliminarImagen = (id) => {
        axios.delete(`/imagen/${id}`)
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    console.log('Imagen eliminada con éxito');
                    // Actualiza la lista de libros
                    axios.get('/imagen/')
                        .then((respuesta) => {
                            setData(respuesta.data.data);
                            // navigate('/admin/producto');
                        })
                        .catch((error) => {
                            console.log('Error al actualizar la lista de imagen', error);
                        });
                } else {
                    console.log('Error al eliminar la imagen', respuesta.status);
                }
            })
            .catch((error) => {
                console.log('Error al eliminar la imagen', error);
            });
    };

    const handleDelete = (id) => {
        // Implementar lógica para eliminar una imagen
        console.log(`Eliminar imagen con id ${id}`);
        if (window.confirm(`¿Está seguro de eliminar la imagen con id ${id}?`)) {
            eliminarImagen(id);
        }
    };
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
            <LayoutAdmin/>

            <div >

                <div className="p-6 text-2xl font-bold text-center text-white bg-blue-900">
                    Gestion de Imagenes
                </div>
                {loading && <div className="flex justify-center w-full mt-10">Cargando ...</div>}

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

            </div>



            {/* TABLA  */}
            <div>
                <table className="w-full border-collapse  border-gray-400 table-auto shadow-lg">

                    <thead className=' bg-black '>
                        <tr className='font-thin  text-slate-200'>
                            <th className='px-4 py-2 border-2 border-gray-200'>ID</th>
                            <th className='px-4 py-2 border-2 border-gray-200'>Ubicacion</th>
                            <th className='px-4 py-2 border-2 border-gray-200' >Nro de orden</th>
                            <th className='px-4 py-2 border-2 border-gray-200'>Producto id</th>
                            <th className='px-4 py-2 border-2 border-gray-200'>Acciones</th>

                        </tr>

                    </thead >
                    <tbody >
                        {filtrarElementosSegunPagina().filter((imagen) =>
                            imagen.ubicacion.toLowerCase().includes(filtro.toLowerCase())).map((imagen) => (
                                <tr className='border border-gray-400 text-center' key={imagen.id}>
                                    <td className='border border-gray-200 text-center' >{imagen.id}</td>
                                    <td className='border border-gray-200 text-center '>{imagen.ubicacion}</td>
                                    <td className='border border-gray-200 text-center'>{imagen.nroDeOrden}</td>
                                    <td className='border border-gray-200 text-center' >{imagen.ProductoId}</td>



                                    <td className='px-4 py-2 text-center border border-gray-200'>
                                        <button className='p-1 text-white bg-red-500 rounded-md hover:bg-red-800' onClick={() => handleDelete(imagen.id)}>
                                            BORRAR
                                        </button>

                                    </td>
                                </tr>
                            ))}
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
                            <button
                                className="`mx-2 py-2 px-4 rounded text-white bg-red-500 hover:bg-red-800 "
                                type="button"
                                onClick={() => navigate('/admin/producto')}
                            >
                                Ir a Poductos
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>


    )
}

export default ImagenIndex;