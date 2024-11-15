import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

function UsuarioIndex() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');

    const elementosPorPagina = 10;
   
    useEffect(() => {

        // se ejecuta al cargar el componente
        setLoading(true);

        cargarUsuarios();

    }, [])

    const cargarUsuarios = () => {
        axios.get('/usuario/').then((respuesta) => {
            console.log("***", respuesta)

            setLoading(false);
            if (respuesta.status === 200) {
                
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }
    const handleEdit = (id) => {
        navigate(`/admin/usuario/${id}`);
      };
 

    const borrarElementoDB = (id) => {
        axios.delete('/usuario/' + id).then((respuesta) => {
            console.log("***", respuesta)
            cargarUsuarios();
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


                <div className='p-6 text-2xl font-bold text-center text-white bg-green '>
                    Gestion de Usuarios
                </div>
                {console.log(loading)}
                {loading  ? 'Cargando...' : ''}
                <div className='flex justify-center w-full mt-10'>

               
                <div className='w-1/4'>
                        <input
                            type='text'
                            className='w-full p-2 mb-4 border border-gray-400 rounded'
                            placeholder='Buscar por apellido'
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />

                </div>

                <div className='ml-5'>
                    
                        <button className='p-2 bg-green-500 rounded-md hover:bg-green-700 hover:text-white ' onClick={()=> navigate("/admin/usuario/nuevo")}>Crear Usuario</button>
                    </div>
            </div>




            <div className='m-5'>
                <table className='w-full border border-collapse border-gray-400 table-auto  '>
                    <thead className=' bg-black'>
                        <tr className='font-thin  text-slate-200 m-4'>
                            <th className='p-3'>ID</th>
                            <th className='p-3'>Nombre</th>
                            <th className='p-3'>Apellido</th>
                            <th className='p-3'>Email</th>
                            <th className='p-3'>Contraseña</th>
                            <th className='p-3'>Rol</th>
                            <th className='p-3'>Acciones</th>

                        </tr>
                      
                    </thead>
                    <tbody className='bg-slate-200 p-3'>
                        {filtrarElementosSegunPagina().filter((usuario) =>
                            usuario.nombre.toLowerCase().includes(filtro.toLowerCase())).map((usuario) => (
                                <tr key={usuario.id}>
                                    <td className='p-3'>{usuario.id}</td>
                                    <td className='p-3'>{usuario.nombre}</td>
                                    <td className='p-3'>{usuario.apellido}</td>
                                    <td className='p-3'>{usuario.email}</td>
                                    <td className='p-3'>{usuario.contraseña}</td>
                                    <td className='p-3'>{usuario.rol}</td>

                                    {/* <td>{libro.disponible ? <div className='text-green-500'>SI</siv> : <div className='text-red-500' >NO</div>}</td>*/}
                                    <td className='flex m-2 gap-3 px-4'>
                                        
                                            <button className='"px-1 py-1 bg-green-600 rounded hover:bg-green-700 text-white flex items-center justify-center"' onClick={() => handleEdit(usuario.id) }>EDITAR</button> 
                                        
                                            <button className='p-1 text-white bg-red-500 rounded-md hover:bg-red-800' onClick={() => borrarElemento(usuario.id)}>
                                                BORRAR</button> </td>

                                </tr>
                            ))}
                    </tbody>

                </table>

            </div>

        <div>
      
        <div className='flex justify-center mt-5'>
        {filtrarElementosSegunPagina().filter((usuario) =>
          usuario.nombre.toLowerCase().includes(filtro.toLowerCase())
        ).length === 0 ? (
          <tr>
            <td colSpan={5} className='px-4 py-2 text-center border border-gray-400'>
              No se encontraron usuarios que coincidan con su búsqueda.
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

export default UsuarioIndex;