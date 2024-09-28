import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FormularioProducto = () => {
    //hook de navegación programática, permite la navegación en respuesta a eventos
    const navigate = useNavigate();
    //Accede al parametro de la ruta 
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    //Definimos un valor inicial con useState y con set podemos actualizar ese valor

    const [producto, setProducto] = useState({
        nombre: "",
        descripcionBreve: "",
        precioUnitario: "",
        stock: "",
        descripcionDetallada: "",
        costoProducto: "",
        disponible: false,
        CategoriumId: "",

    });

    const [categoria, setCategoria] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);


    const obtenerCategorias = async () => {
        try {
            setLoading(true);
            const respuesta = await axios.get('/categoria/');
            console.log(respuesta);
            setCategoria(respuesta.data.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    useEffect(() => {
        obtenerCategorias()

        console.log("id", id)



        if (id !== "nuevo") {
            const fetchProducto = async () => {
                try {
                    setLoading(true);
                    const respuesta = await axios.get('/producto/' + id);
                    setProducto(respuesta.data.data);
                    setCategoriaSeleccionada(respuesta.data.data.CategoriumId);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };
            fetchProducto(id)
        }
        else {

            setProducto({
                nombre: "",
                descripcionBreve: "",
                precioUnitario: "",
                stock: "",
                descripcionDetallada: "",
                costoProducto: "",
                disponible: false,
                CategoriumId: "",
            });
        }

    }, [id])

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        if (event.target.name === 'disponible') {
            setProducto({ ...producto, [event.target.name]: event.target.checked });
        } else {
            const { name, value } = event.target;
            setProducto({ ...producto, [name]: value });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('categoria ' + categoriaSeleccionada);

        producto.CategoriumId = categoriaSeleccionada;

        try {
            if (id === 'nuevo') {
                const respuesta = await axios.post('/producto', producto);

                console.log('llego' + respuesta.data);
                navigate('/admin/producto');
            } else {
                const respuesta = await axios.put('/producto/' + id, producto);
                console.log(respuesta.data);
                navigate('/admin/producto');
            }
        } catch (error) {
            setError(error.message);
        }

    };


    return (
        <div>
            <div className='p-6 text-2xl font-bold text-center text-white bg-grey-800'>
                {producto.id ? "Editar producto" : "Crear nuevo producto"}
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md" >
                    <form onSubmit={handleSubmit}>
                        <div className=" mb-4 ">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">Nombre</label>

                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={producto.nombre}
                                onChange={handleChange}

                            />
                        </div>
                        <div className=" mb-4  ">
                            <label className="block mb-2 text-sm font-bold text-gray-700" >Descripcion Breve</label>

                            <input
                                id="descripcionBreve"
                                type="text"
                                name="descripcionBreve"
                                value={producto.descripcionBreve}
                                onChange={handleChange}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

                        </div>
                        <div className="block mb-2 text-sm font-bold text-gray-700">
                            <label className="p-3">Precio Unitario</label>

                            <input
                                id="precio"
                                type="number"
                                name="precio"
                                value={producto.precioUnitario}
                                onChange={handleChange}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

                        </div>

                        <div className="block mb-2 text-sm font-bold text-gray-700">
                            <label className="p-3">Stock</label>

                            <input
                                id="stock"
                                type="number"
                                name="stock"
                                value={producto.stock}
                                onChange={handleChange}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />


                        </div>

                        <div className="mb-4 ">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Descripcion Detallada</label>

                            <input
                                id="descripcionDetallada"
                                type="text"
                                name="descripcionDetallada"
                                value={producto.descripcionDetallada}
                                onChange={handleChange}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
                        </div>

                        <div className="mb-4  ">
                            <label className="block mb-2 text-sm font-bold text-gray-700">Costo del Producto</label>

                            <input
                                id="costoProducto"
                                type="number"
                                name="costoProducto"
                                value={producto.costoProducto}
                                onChange={handleChange}
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

                        </div>


                        <label className="mt-4 text-sm font-bold text-gray-700 mr-3">Categoria Id</label>
                        <div className='flex mb-4'>
                            <select
                                value={categoriaSeleccionada}
                                onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
                            >
                                {categoria.map((categoria, index) => (
                                    <option key={index} value={categoria.id}>
                                        {categoria.id} {categoria.nombre}
                                    </option>
                                ))}
                                categoria          </select>
                        </div>

                        <div className="flex mb-4">
                            <input
                                id="disponible"
                                type="checkbox"
                                name="disponible"
                                className="mr-2"
                                checked={producto.disponible}
                                onChange={handleChange}
                            />
                            <label
                                className="block mb-2 text-sm font-bold text-gray-700"
                                htmlFor="disponible"
                            >
                                Disponible
                            </label>
                        </div>


                        <div className='flex justify-center'>
                            <button className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit" >Guardar</button>
                            <button
                                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => navigate('/admin/producto')}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form >
                </div>
            )
            }
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div >

    );


}

export default FormularioProducto;