import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function CategoriaIndex() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');

    const elementosPorPagina = 10;

    useEffect(() => {

        // se ejecuta al cargar el componente
        setLoading(true);

        cargarCategorias();

    }, [])

    const cargarCategorias = () => {
        axios.get('/categoria/').then((respuesta) => {
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



    const borrarElementoDB = (id) => {
        axios.delete('/categoria/' + id).then((respuesta) => {
            console.log("***", respuesta)
            cargarCategorias();
        }).catch((error) => {
            console.log("error", error)
        });



    }

    const borrarElemento = (id) => {
        console.log("borrar elemento", id);
        if (window.confirm(`¿Desea borrar el elemento con id ${id}?`)) {
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
            <div className="p-6 text-2xl font-bold text-center text-white bg-green-900">
                Gestion de Categorias
            </div>

            {loading && <div className="flex justify-center w-full mt-10">Cargando ...</div>}


            <div className='w-1/4'>
                <input
                    type='text'
                    className='w-full m-3 p-2 mb-4 border border-gray-400 rounded'
                    placeholder='Buscar por nombre'
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                /></div>



            <div className="ml-5">
                <button className="px-4 m-3 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-800"
                    onClick={() => navigate("/admin/categoria/nuevo")}>Crear Categoria
                </button>
            </div>

            <div className="m-5">
                <table className='w-full border border-collapse  table-auto shadow-lg  '>
                    <thead className='text-gray-300 bg-black'>
                        <tr >
                            <th className="px-4 py-2 border-2 border-gray-400 text-center">ID</th>
                            <th className="px-4 py-2 border-2 border-gray-400 text-center">Nombre</th>
                            <th className="px-4 py-2 border-2 border-gray-400 text-center">Acciones</th>


                        </tr>

                    </thead>
                    <tbody className=''>
                        {filtrarElementosSegunPagina().filter((categoria) =>
                            categoria.nombre.toLowerCase().includes(filtro.toLowerCase())).map((categoria) =>
                                <tr key={categoria.id}>
                                    <td className=" px-4 py-2 border border-gray-200 text-center hover:bg-gray-100">{categoria.id}</td>
                                    <td className=" px-4 py-2 border border-gray-200 text-center hover:bg-gray-100">{categoria.nombre}</td>

                                    <td className="flex justify-center space-x-2 bg-white border-b p-2 ">
                                        <div>
                                            <button className='p-1 text-white bg-green-600 rounded-md hover:bg-slate-800' onClick={() => navigate("/admin/categoria/" + categoria.id)}>EDITAR</button> </div>
                                        <div>
                                            <button className='p-1 text-white bg-red-500 rounded-md hover:bg-red-800' onClick={() => borrarElemento(categoria.id)}>
                                                BORRAR</button> </div></td>

                                </tr>
                            )}
                    </tbody>

                </table>

            </div>

            <div>
                <div className='flex justify-center mt-5'>
                    {filtrarElementosSegunPagina().filter((categoria) =>
                        categoria.nombre.toLowerCase().includes(filtro.toLowerCase())
                    ).length === 0 ? (
                        <tr>
                            <td colSpan={5} className='px-4 py-2 text-center border border-gray-400'>
                                No se encontraron categorias que coincidan con su búsqueda.
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

export default CategoriaIndex;