import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FormularioUsuario = ()=> {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

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
    const fetchUsuario = async () => {
        try{
            setLoading(true);
            const respuesta = await axios.get('/usuario/' + id);
            setUsuario(respuesta.data.data);
           setLoading(false);
        }catch (error){
            setError(error.message);
            setLoading(false);
        }
    };


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
       
           
        else{
            fetchUsuario(id)

        }
        
    }, [id])

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        if (event.target.name === 'disponible') {
            setUsuario({ ...usuario, [event.target.name]: event.target.checked });

        } else {
            const { name, value } = event.target;
            setUsuario({ ...usuario, [name]: value });
          
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (id === 'nuevo') {
                const respuesta = await axios.post('/usuario ', usuario);

                console.log('llego' + respuesta.data);
                navigate('/admin/usuario');
            } else {
                const respuesta = await axios.put('/usuario/' + id, usuario);
                console.log(respuesta.data);
                navigate('/admin/usuario');
            }
        } catch (error) {
            setError(error.message);
        }

    };

   
    return ( <div>
        <div className='p-6 text-2xl font-bold text-center text-white bg-grey-800'>
            {usuario.id ? "Editar usuario" : "Crear nuevo usuario"}
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
                            value={usuario.nombre}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=" mb-4  ">
                        <label className="block mb-2 text-sm font-bold text-gray-700" > apellido</label>

                        <input
                            id="apellido"
                            type="text"
                            name="apellido"
                            value={usuario.apellido}
                            onChange={handleChange}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

                    </div>
                    <div className="block mb-2 text-sm font-bold text-gray-700">
                        <label className="p-3">Email</label>

                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={usuario.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

                    </div>

                    <div className="block mb-2 text-sm font-bold text-gray-700">
                        <label className="p-3">Contraseña</label>

                        <input
                            id="contraseña"
                            type="text"
                            name="contraseña"
                            value={usuario.contraseña}
                            onChange={handleChange}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />


                    </div>

                    <div className="block mb-2 text-sm font-bold text-gray-700">
                            <label className="p-3">Rol</label>

                        <input
                            id="rol "
                            type="text"
                            name="rol"
                            value={usuario.rol}
                            onChange={handleChange}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
                    </div>


                    <div className='flex justify-center'>
                        <button className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type= "submit" >Guardar</button>
                        <button
                            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => navigate('/admin/usuario')}
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

       
    )

}

export default FormularioUsuario;