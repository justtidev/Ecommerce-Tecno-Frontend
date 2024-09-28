import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FormularioCategoria() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoria, setCategoria] = useState({
        nombre: '',
    });

    const fetchCategoria = async () => {
        try {
            setLoading(true);
            const respuesta = await axios.get('/categoria/' + id);
            setCategoria(respuesta.data.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };


    useEffect(() => {

        console.log("id", id)

        if (id === "nuevo") {

            setCategoria({
                nombre:'',
            });

        }
         else {
            fetchCategoria(id)
        }

    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoria({ ...categoria, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (id === 'nuevo') {
                const respuesta = await axios.post('/categoria', categoria);
                console.log(respuesta.data);
                navigate('/admin/categoria');
            } else {
                const respuesta = await axios.put('/categoria/' + id, categoria);
                console.log(respuesta.data);
                navigate('/admin/categoria');
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <div className='p-6 text-2xl font-bold text-center text-white bg-slate-600 '>
                {categoria.id ? "Editar categoria" : "Crear nueva categoria"}
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="max-w-md p5 mx-auto mt-10 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 ">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">Nombre</label>
                        </div>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={categoria.nombre}
                            onChange={handleChange}

                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />



                        <div className="flex justify-center bflex space-x-2">
                            <button className="px-4 py-2 bg-slate-600 rounded hover:bg-slate-900 text-white flex items-center justify-center" type="submit" >Guardar</button>
                            <button
                                className="px-4 py-2  text-white bg-red-500 rounded hover:bg-red-800 "
                                type="button"
                                onClick={() => navigate('/admin/categoria')}
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


export default FormularioCategoria;