import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FormularioUsuario() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        rol: '',
    });
    const [data, setData] = useState({});
    

    //Trae la data de la BD del objeto mediante metodo put, llamado por axios
    const cargarUsuario = (id) => {
        axios.get('/usuario/' + id).then((respuesta) => {
            console.log("***", respuesta)

            // setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.usuario)
                setUsuario(respuesta.data.usuario);

              //  setData(respuesta.data.data)
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

          setUsuario({
                id: '',
                nombre: '',
                apellido: '',
                email: '',
                contraseña: '',
                rol: '',
            })}
          

        else {
            cargarUsuario(id)
        }

    }, [id])

    const guardarUsuario = (objetoUsuario) => {
        axios.post('/usuario/', objetoUsuario).then((respuesta) => {
            console.log("*", respuesta)

            // setLoading(false);
            if (respuesta.status === 201) {
                console.log("respuesta correcta", respuesta.data.data)
                navigate("/admin/usuario");
                setData(respuesta.data.data)
            } else {
                console.log("error")
            }

        }).catch((error) => {
            console.log("error", error)
        });
    }
    //Funcion que mediante axios llama a la base de datos y con el metodo put modifica el objeto seleccionado por el id
    const actualizarUsuario = (objetoUsuario, id) => {
        axios.put('/usuario/' + id, objetoUsuario).then((respuesta) => {
            console.log("***", respuesta)

            // setLoading(false);
            if (respuesta.status === 200) {
                console.log("respuesta correcta", respuesta.data.data)
                navigate("/admin/usuario");
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
            apellido: apellido,
            email: email,
            contraseña: contraseña,
            rol: rol,




        }


        console.log("objData " + objData)


        if (id === "nuevo") {
            // llamda con axios a la ruta del post
            console.log("es nuevo")
            guardarUsuario(objData)

        }

        else {
            console.log("es editar")
            actualizarUsuario(objData, id)
        }




    }

    return (
        <div>

            <div> Formulario de gestión de usuario</div>

            <div className="grid m-10 ">
                <div className="flex m-4 ">
                    <div className="mt-4 mr-3">Nombre</div>
                    <div>
                        <input value={usuario.nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            placeholder="completar con el nombre"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                    <div className="mt-4 mr-3">Apellido</div>
                    <div>
                        <input value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            type="text"
                            placeholder="completar con el apellido"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                    <div className="mt-4 mr-3">Email</div>
                    <div>
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="completar con el email"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                    <div className="mt-4 mr-3">Contraseña</div>
                    <div>
                        <input value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            type="text"
                            placeholder="completar con la contraseña"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                    <div className="mt-4 mr-3">Rol</div>
                    <div>
                        <select onChange={(e) => setRol(e.target.value)}>
                        
                            {usuario.map((usuario, index) => (
                            <option key={index} value={usuario.id}>
                                {usuario.rol}
                            </option>
                ))}
                        </select>


                    </div>



                </div>
            </div>
            <div><button className="m-10 p-3 bg-black text-white rounded-lg " onClick={() => guardar()}>GUARDAR</button></div>
            <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => navigate('/admin/usuario')}
            >
                Cancelar
            </button>
        </div>
    )

}

export default FormularioUsuario;