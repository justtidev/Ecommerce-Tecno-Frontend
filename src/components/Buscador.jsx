
export default function Buscador({filtro, setFiltro}){

   
    return (
  

          
            <div className="grid justify-items-stretch m-4  ">
          <label htmlFor="Search" /* className="sr-only" */> </label>
          <input
          
            type="text"
            placeholder= "Buscar producto "
            className="text-md text-gray-600 rounded-m border-2 p-2 sm:text-md sm:w-full shadow-slate-600 shadow-xl
            "   value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
           />
           {/* <span className="absolute  inset-y-0 end-16 flex place-content-center " >
         
            <button type="submit" className="text-gray-700 hover:text-gray-700 absolute-inset-0 flex items-center "
          
            >
              <span className=" sr-only"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </span> */}
        </div>
      

  
        )

}