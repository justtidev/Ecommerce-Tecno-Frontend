import { useState } from "react";
export default function Buscador(){
    const [filtro, setFiltro] = useState('');
    return (
    <div className=' px-4 py-4 mx-20'>

            <input
              type='text'
              className=' w-1/4 border border-gray-400 rounded'
              placeholder='Buscar por nombre'
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            
            
            /></div>

    
        )

}