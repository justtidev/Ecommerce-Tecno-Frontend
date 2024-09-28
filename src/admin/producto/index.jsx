import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

function ProductoIndex() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const elementosPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState('');


  useEffect(() => {

    // se ejecuta al cargar el componente
    setLoading(true);
    console.log(loading)
    axios.get('/producto/').then((respuesta) => {
      setLoading(false);
      console.log(respuesta)
      if (respuesta.status === 200) {
        setData(respuesta.data.data);
      } else {
        console.log('error');
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }, [])

  const handleInsImg = (id) => {
    navigate(`/admin/imagen/prod/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/producto/${id}`);
  };
  const eliminarProducto = (id) => {
    axios.delete(`/producto/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log('Producto eliminado con éxito');
          // Actualiza la lista de productos
          axios.get('/producto/')
            .then((respuesta) => {
              setData(respuesta.data.data);
            })
            .catch((error) => {
              console.log('Error al actualizar la lista de productos', error);
            });
        } else {
          console.log('Error al eliminar el producto', respuesta.status);
        }
      })
      .catch((error) => {
        console.log('Error al eliminar el producto', error);
      });
  };







  const handleDelete = (id) => {
    // Implementar lógica para eliminar un producto
    console.log(`Eliminar producto con id ${id}`);
    if (window.confirm(`¿Está seguro de eliminar el producto con id ${id}?`)) {
      eliminarProducto(id);
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

    <>

      <div className='p-6 text-2xl font-bold text-center text-white bg-black'>
         Gestion de Productos
        </div>
        {console.log(loading)}
        {loading ? 'Cargando...' : ''}
        <div className='flex justify-center w-full mt-10'>
          <div className='w-1/4'>

            <input
              type='text'
              className='w-full p-2 mb-4 border border-gray-400 rounded'
              placeholder='Buscar por nombre'
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            /></div>
          <div className='ml-5'>
            <button
              className='px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700'
              onClick={() => navigate('/admin/producto/nuevo')}>
              Crear Producto
            </button>
          </div>
           </div>
        <div className='m-5'>
          <table className='w-full border-collapse border-gray-400 table-auto shadow-lg'>
            <thead className=' bg-black'>
              <tr className='font-thin  text-slate-200'>
                <th className='px-4 py-2 border-2 border-gray-200'>ID</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Nombre</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Descripcion Breve</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Precio Unitario</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Stock</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Descripcion Detallada</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Costo Producto</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Categoria Id</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Disponible</th>
                <th className='px-4 py-2 border-2 border-gray-200'>Acciones</th>
              </tr>

            </thead>
            <tbody className='bg-white '>
              {filtrarElementosSegunPagina().filter((producto) =>
                producto.nombre.toLowerCase().includes(filtro.toLowerCase())
              ).map((producto) => (
                <tr className='border border-gray-200 text-center'
                 key={producto.id}>
                  <td className='border border-gray-200 text-center'>{producto.id}</td>
                  <td className='border border-gray-200 text-center'>{producto.nombre}</td>
                  <td className='border border-gray-200 text-center'>{producto.descripcionBreve}</td>
                  <td className='border border-gray-200 text-center'>{producto.precioUnitario}</td>
                  <td className='border border-gray-200 text-center'>{producto.stock}</td>
                  <td className='border border-gray-200 text-center'>{producto.descripcionDetallada}</td>
                  <td className='border border-gray-200 text-center'>{producto.costoProducto}</td>
                  <td className='border border-gray-200 text-center'>{producto.CategoriumId}</td>
                  <td className='border border-gray-200 text-center'>{producto.disponible ? 'Sí' : 'No'}</td>
                  
                  <td className='flex m-2 gap-3 px-4'>
                  <button
                        className="px-1 py-1 bg-green-600 rounded hover:bg-green-700 text-white flex items-center justify-center"
                        onClick={() => handleInsImg(producto.id)}
                      >
                        <span>Agregar Imagen</span>
                        
                      </button>
                  

                    <button className='p-1 text-white bg-slate-500 rounded-md hover:bg-slate-800'
                      onClick={() => handleEdit(producto.id)}
                    >Editar</button>

                    <button className='p-1 text-white bg-red-500 rounded-md hover:bg-red-800' onClick={() => handleDelete(producto.id)}>
                      Borrar</button>

                  </td>

                </tr>
             ) )}
            </tbody>

          </table>

        </div>
        <div>
          <div className='flex justify-center mt-5'>
            {filtrarElementosSegunPagina().filter((producto) =>
              producto.nombre.toLowerCase().includes(filtro.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td colSpan={5} className='px-4 py-2 text-center border border-gray-400'>
                  No se encontraron productos que coincidan con su búsqueda.
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

      
    </>
  )
}

export default ProductoIndex;