import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FormularioCategoria() {

    const { id } = useParams();
/*     const { nroDeOrden } = useParams();
    const { ProductoId } = useParams(); */
    const navigate = useNavigate();

    const [descripcion, setDescripcion] = useState('');
    const[data,setData]=useState({});
  
//Trae la data de la BD del objeto mediante metodo put, llamado por axios
const cargarCategoria = (id) => {
    axios.get('/categoria/' + id).then((respuesta) => {
        console.log("***", respuesta)

        // setLoading(false);
        if (respuesta.status === 200) {
            console.log("respuesta correcta", respuesta.data.data)
            setDescripcion(respuesta.data.data.descripcion);
           
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

            setDescripcion('');
       
        }

else{
        cargarCategoria(id)
    }
    
}, [id]) 

const guardarCategoria = (objetoCategoria) => {
    axios.post('/categoria/', objetoCategoria).then((respuesta) => {
        console.log("*", respuesta)

        // setLoading(false);
        if (respuesta.status === 201) {
            console.log("respuesta correcta", respuesta.data.data)
            navigate("/admin/categoria");
            setData(respuesta.data.data)
        } else {
            console.log("error")
        }

    }).catch((error) => {
        console.log("error", error)
    });
}
//Funcion que mediante axios llama a la base de datos y con el metodo put modifica el objeto seleccionado por el id
const actualizarCategoria = (objetoCategoria, id) => {
    axios.put('/categoria/' + id, objetoCategoria).then((respuesta) => {
        console.log("***", respuesta)

        // setLoading(false);
        if (respuesta.status === 200) {
            console.log("respuesta correcta", respuesta.data.data)
            navigate("/admin/categoria");
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

            descripcion: descripcion,
           
            

        }


        console.log("objData " + objData)
        

        if (id === "nuevo") {
            // llamda con axios a la ruta del post
            console.log("es nuevo")
            guardarCategoria(objData)
              
                }
     
                else {
                    console.log("es editar")
                    actualizarCategoria(objData, id)
                }

        


    }

    return (
        <div>

            <div> Formulario de gestión de categoria</div>

            <div className="grid m-10 ">
                <div className="flex m-4 "> 
                    <div className="mt-4 mr-3">Descripcion</div>
                    <div>
                        <input value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            type="text"
                            placeholder="completar con la descricion de la categoria"
                            className="w-96 p-3 text-black bg-gray-200 rounded-md " />

                    </div>
                
               
                       
                    </div>
                </div>
                <div><button className="m-10 p-3 bg-black text-white rounded-lg " onClick={() => guardar()}>GUARDAR</button></div>
                <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => navigate('/admin/categoria')}
              >
                Cancelar
              </button>
            </div>
            )

}

            export default FormularioCategoria;