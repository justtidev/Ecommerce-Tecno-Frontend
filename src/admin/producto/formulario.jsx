import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FormularioProducto() {
    //hook de navegación programática, permite la navegación en respuesta a eventos
    const navigate = useNavigate();
    //Accede al parametro de la ruta 
    const { id } = useParams();

    //Definimos un valor inicial con useState y con set podemos actualizar ese valor

    const [nombre, setNombre] = useState('');
    const [descripcionBreve, setDescripcionBreve] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [stock, setStock] = useState('');
    const [descripcionDetallada, setDescripcionDetallada] = useState('');
    const [costoProducto, setCostoProducto] = useState('')
    const [CategoriumId, setCategoriumId] = useState('')
    const [data, setData] = useState({});

    //Trae la data de la BD del objeto mediante metodo put, llamado por axios
    const cargarProducto = (id) => {
        axios.get('/producto/' + id).then((respuesta) => {
            console.log("***", respuesta)

            // setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.data)
                setNombre(respuesta.data.data.nombre);
                setDescripcionBreve(respuesta.data.data.descripcionBreve);
                setPrecioUnitario(respuesta.data.data.precioUnitario);
                setStock(respuesta.data.data.stock);
                setDescripcionDetallada(respuesta.data.data.descripcionDetallada);
                setCostoProducto(respuesta.data.data.costoProducto);
                setCategoriumId(respuesta.data.data.CategoriumId);
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }

    useEffect(() => {

        console.log("id", id)

        if (id === "nuevo") {
            setNombre('');
            setDescripcionBreve('');
            setPrecioUnitario('');
            setStock('');
            setDescripcionDetallada('');
            setCostoProducto('');
            setCategoriumId('');
        }
        else {
            cargarProducto(id)
        }

    }, [id])

    const guardarProducto = (objetoProducto) => {
        axios.post('/producto/', objetoProducto).then((respuesta) => {
            console.log("*", respuesta)

            // setLoading(false);
            if (respuesta.status === 201) {
                console.log("respuesta correcta", respuesta.data.data)
                navigate("/admin/producto");
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }
    //Funcion que mediante axios llama a la base de datos y con el metodo put modifica el objeto seleccionado por el id
    const actualizarProducto = (objetoProducto, id) => {
        axios.put('/producto/' + id, objetoProducto).then((respuesta) => {
            console.log("***", respuesta)

            // setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.data)
                navigate("/admin/producto");
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }



    const guardar = () => {

        const objData = {

            nombre: nombre,
            descripcionBreve: descripcionBreve,
            precioUnitario: precioUnitario,
            stock: stock,
            descripcionDetallada: descripcionDetallada,
            costoProducto: costoProducto,
            CategoriumId: CategoriumId


        }


        console.log("objData " + objData)

        if (id === "nuevo") {
            console.log("es nuevo")
            guardarProducto(objData)
        }

        else {
            console.log("es editar")
            actualizarProducto(objData, id)
        }





    }

    return (
        <div>

            <div className="m-4 text-xl font-medium"> Formulario de gestión de producto</div>

            <div className="grid grid-cols-1 m-4 ">
                <div className="flex m-4 space-x-16 ">
                    <div className="p-3">Nombre</div>
                    <div>
                        <input value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            placeholder="nombre"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                </div>
                <div className="flex m-4  ">
                    <div className="p-3">Descripcion Breve</div>

                    <input value={descripcionBreve}
                        onChange={(e) => setDescripcionBreve(e.target.value)}
                        type="text"
                        placeholder="descripcion breve"
                        className=" w-96 p-3 text-black bg-gray-200 rounded-md " />

                </div>

                <div className="flex m-4 space-x-6 ">
                    <div className="p-3">Precio Unitario</div>

                    <input value={precioUnitario}
                        onChange={(e) => setPrecioUnitario(e.target.value)}
                        type="number"
                        placeholder="precio"
                        className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                </div>

                <div className="flex m-4 space-x-24 ">
                    <div className="p-3">Stock</div>
                    
                        <input value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            type="number"
                            placeholder="stock"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    
                </div>

                <div className="flex m-4 ">
                    <div className="p-3">Descripcion Detallada</div>
                    
                        <input value={descripcionDetallada}
                            onChange={(e) => setDescripcionDetallada(e.target.value)}
                            type="text"
                            placeholder="descripcion detallada"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />
                    </div>
                    
                    <div className="flex m-4  ">
                        <div className="p-3">Costo del Producto</div>
                        
                            <input value={costoProducto}
                                onChange={(e) => setCostoProducto(e.target.value)}
                                type="number"
                                placeholder="costo de producto"
                                className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                        </div>
                    
                    <div className="flex m-4 space-x-14 ">
                    <div className="mt-4 mr-3">Categoria Id</div>
                    <div>
                        <input value={CategoriumId}
                            onChange={(e) => setCategoriumId(e.target.value)}
                            type="number"
                            placeholder="categoria id"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />



                    </div>
                </div>
            </div>
            <div><button className="m-10 p-3 bg-black text-white rounded-lg " onClick={() => guardar()}>GUARDAR</button></div>
            <button
                className="m-10 p-3 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => navigate('/admin/imagen')}
              >
                Cancelar
              </button>
        </div>
    )

}

export default FormularioProducto;