import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FormularioCupones() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cupones, setCupones] = useState({
        codigo: '',
        descuento: '',
    });

    const fetchCupones = async () => {
        try {
            setLoading(true);
            const respuesta = await axios.get('/cupones/' + id);
            setCupones(respuesta.data.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };


    useEffect(() => {

        console.log("id", id)

        if (id === "nuevo") {

            setCupones({
                codigo: '',
                descuento: '',
            });

        }
        else {
            fetchCupones(id)
        }

    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCupones({ ...cupones, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (id === 'nuevo') {
                const respuesta = await axios.post('/cupones', cupones);
                console.log(respuesta.data);
                navigate('/admin/cupones');
            } else {
                const respuesta = await axios.put('/cupones/' + id, cupones);
                console.log(respuesta.data);
                navigate('/admin/cupones');
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <div className='p-6 text-2xl font-bold text-center text-white bg-slate-600 '>
                {cupones.id ? "Editar cupones" : "Crear nueva cupones"}
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="max-w-md p5 mx-auto mt-10 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 ">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="codigo">Codigo</label>
                        </div>
                        <input
                            id="codigo"
                            type="text"
                            name="codigo"
                            value={cupones.codigo}
                            onChange={handleChange}

                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

                        <div className="mb-4 ">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="descuento">Descuento</label>
                        </div>
                        <input
                            id="descuento"
                            type="number"
                            name="descuento"
                            value={cupones.descuento}
                            onChange={handleChange}

                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />




                        <div className="flex justify-center bflex space-x-2">
                            <button className="px-4 py-2 bg-slate-600 rounded hover:bg-slate-900 text-white flex items-center justify-center" type="submit" >Guardar</button>
                            <button
                                className="px-4 py-2  text-white bg-red-500 rounded hover:bg-red-800 "
                                type="button"
                                onClick={() => navigate('/admin/cupones')}
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


export default FormularioCupones;