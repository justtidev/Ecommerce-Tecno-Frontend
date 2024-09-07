import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function FormularioImagen() {
    //hook de navegación programática, permite la navegación en respuesta a eventos
    const navigate = useNavigate();
    //Accede al parametro de la ruta
    const { id } = useParams();

    //Definimos un valor inicial con useState y con set podemos actualizar ese valor
    const [ubicacion, setUbicacion] = useState('');
    const [nroDeOrden, setNroDeOrden] = useState('');
    const [ProductoId, setProductoId] = useState('');
    const [data, setData] = useState({});

    //Trae la data de la BD del objeto mediante metodo put, llamado por axios
    const cargarImagen = (id) => {
        axios.get('/imagen/' + id).then((respuesta) => {
            console.log("***", respuesta)

            // setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.data)
                setUbicacion(respuesta.data.data.ubicacion);
                setNroDeOrden(respuesta.data.data.nroDeOrden);
                setProductoId(respuesta.data.data.ProductoId);
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }


    //El useEffect se activa una vez al renderizar el componente. Luego con el segundo argumento definimos que se active si el valor de "id" sufre algun cambio
    useEffect(() => {

        console.log("id", id)

        if (id === "nuevo") {
            //limpiamos los campos del input para que esten vacios
            setUbicacion('');
            setNroDeOrden('');
            setProductoId('');
        }
        else {
            cargarImagen(id)
        }

    }, [id])

    //Funcion que mediante axios llama a la base de datos y con el metodo post envia el objeto nuevo 
    const guardarImagen = (objetoImagen) => {
        axios.post('/imagen/', objetoImagen).then((respuesta) => {
            console.log("*", respuesta)

            // setLoading(false);
            if (respuesta.status === 201) {
                console.log("respuesta correcta", respuesta.data.data)
                navigate("/admin/imagen");
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }
    //Funcion que mediante axios llama a la base de datos y con el metodo put modifica el objeto seleccionado por el id
    const actualizarImagen = (objetoImagen, id) => {
        axios.put('/imagen/' + id, objetoImagen).then((respuesta) => {
            console.log("***", respuesta)

            // setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.data)
                navigate("/admin/imagen");
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }
    //guardamos en un objeto las propiedades para luego crear una imagen nueva
    const guardar = () => {

        const objData = {

            ubicacion: ubicacion,
            nroDeOrden: nroDeOrden,
            ProductoId: ProductoId,
        }


        console.log("objData " + objData)


        if (id === "nuevo") {
            console.log("es nuevo")
            guardarImagen(objData)
        }

        else {
            console.log("es editar")
            actualizarImagen(objData, id)
        }




    }

    return (
        <div>

            <div className="m-4 text-xl font-medium"> Formulario de gestión de imagen</div>

            <div className="grid m-4 ">
                <div className="flex m-4 space-x-16 ">
                    <div className=" p-3">Ubicacion</div>
                    <div>
                        <input value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                            type="text"
                            placeholder="completar con ubicacion de la imagen"
                            className=" w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                </div>
                <div className="flex m-4 space-x-4  ">
                    <div className="mt-4 mr-3">Numero De Orden</div>
                    <div>
                        <input value={nroDeOrden}
                            onChange={(e) => setNroDeOrden(e.target.value)}
                            type="text"
                            placeholder="completar con nro de orden"
                            className=" w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                </div>
                <div className="flex m-4 space-x-16 ">
                    <div className="mt-4 mr-3">Producto Id</div>
                    <div>
                        <input value={ProductoId}
                            onChange={(e) => setProductoId(e.target.value)}
                            type="text"
                            placeholder="completar con nro de prodcuto"
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

export default FormularioImagen;