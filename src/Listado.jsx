

/*
{
    "ok": true,
    "msg": "Listado de productos",
    "status": 200,
    "data": [
        {
            "id": 3,
            "nombre": "Notebook Gfast 15,6” ",
            "descripcionBreve": "Intel Celeron 4GB 120GB SSD N-150-W i4120W",
            "precioUnitario": "300000.00",
            "stock": 50,
            "descripcionDetallada": "Intel Celeron 4GB 120GB SSD N-150-W i4120W",
            "costoProducto": "100000.00",
            "createdAt": "2024-08-23T23:15:34.000Z",
            "updatedAt": "2024-09-24T21:23:49.000Z",
            "CategoriumId": 2,
            "Imagens": [
                {
                    "id": 1,
                    "ubicacion": "https://p1-ofp.static.pub//medias/26050595576_LOQ15IRX9WHBKLTLunaGreyIMG_202309261024281711014451866.png",
                    "nroDeOrden": 1,
                    "createdAt": "2024-08-24T00:00:20.000Z",
                    "updatedAt": "2024-09-24T16:12:10.000Z",
                    "ProductoId": 3
                },
                {
                    "id": 28,
                    "ubicacion": "https://p3-ofp.static.pub//fes/cms/2024/05/20/vr1ibpj08p4hes6j5zym7gd2q4yyk9886452.png",
                    "nroDeOrden": 2,
                    "createdAt": "2024-09-24T20:11:22.000Z",
                    "updatedAt": "2024-09-24T20:12:55.000Z",
                    "ProductoId": 3
                },
                {
                    "id": 29,
                    "ubicacion": "https://p3-ofp.static.pub//fes/cms/2024/05/20/hh4x4fa0iac2wufaqqe3ys8blgvohj649076.png",
                    "nroDeOrden": 3,
                    "createdAt": "2024-09-24T20:14:11.000Z",
                    "updatedAt": "2024-09-24T20:14:11.000Z",
                    "ProductoId": 3
                }
            ]
        },
        {
            "id": 4,
            "nombre": "Notebook Hp Intel I3-n305",
            "descripcionBreve": "8gb 256gb 14'' Hd Win11 Azul Claro",
            "precioUnitario": "400000.00",
            "stock": 100,
            "descripcionDetallada": "8gb 256gb 14'' Hd Win11 Azul Claro",
            "costoProducto": "200000.00",
            "createdAt": "2024-09-07T00:34:36.000Z",
            "updatedAt": "2024-09-24T21:24:44.000Z",
            "CategoriumId": 2,
            "Imagens": []
        },
        {
            "id": 6,
            "nombre": "Tablet Philco Tp7a464 7''",
            "descripcionBreve": "64gb 4gb Android Negro",
            "precioUnitario": "389000.99",
            "stock": 20,
            "descripcionDetallada": "64gb 4gb Android Negro",
            "costoProducto": "200000.00",
            "createdAt": "2024-09-07T00:41:03.000Z",
            "updatedAt": "2024-09-24T21:25:54.000Z",
            "CategoriumId": 4,
            "Imagens": []
        },
        {
            "id": 8,
            "nombre": "Ratón inalámbrico",
            "descripcionBreve": "recargable, inalámbrico, óptico, LED RGB, negro",
            "precioUnitario": "13000.00",
            "stock": 20,
            "descripcionDetallada": "recargable, inalámbrico, óptico, LED RGB, negro",
            "costoProducto": "8000.00",
            "createdAt": "2024-09-24T21:26:57.000Z",
            "updatedAt": "2024-09-24T21:26:57.000Z",
            "CategoriumId": 6,
            "Imagens": []
        },
        {
            "id": 9,
            "nombre": "Teclado gamer Redragon Kumara K552",
            "descripcionBreve": "QWERTY Outemu Red español latinoamérica color negro con luz RGB",
            "precioUnitario": "75000.00",
            "stock": 100,
            "descripcionDetallada": "QWERTY Outemu Red español latinoamérica color negro con luz RGB",
            "costoProducto": "50000.00",
            "createdAt": "2024-09-24T21:28:08.000Z",
            "updatedAt": "2024-09-24T21:28:08.000Z",
            "CategoriumId": 6,
            "Imagens": []
        },
        {
            "id": 10,
            "nombre": "Monitor Dahua 22 Full Hd",
            "descripcionBreve": "1080p 75hz Led Hdmi Color Negro",
            "precioUnitario": "196000.00",
            "stock": 40,
            "descripcionDetallada": "1080p 75hz Led Hdmi Color Negro",
            "costoProducto": "9999.00",
            "createdAt": "2024-09-24T21:29:20.000Z",
            "updatedAt": "2024-09-24T21:29:20.000Z",
            "CategoriumId": 3,
            "Imagens": []
        }
    ]
}

*/


function Listado(props) {

  const { productos } = props;
  const prod= productos[{}]
  console.log(prod.Imagens[0].ubicacion)



  return (
    <div className="p-5">
      <div className=' *: font-bold   text-center p-6'>
        Listado de Productos
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 " >
        {productos.map((producto, index) =>


          <div key={index} className="bg-gray-200   mb-1  md:mb-4 p-2 rounded-md " >



             <div>  <img src={[producto].Imagens[0].ubicacion} alt=".." className="" /> </div> 
            <div><img className="w-40" src="src\imagenes\Notebook_Acer1.jpg" alt="Foto" /> </div>
            <div>Id:{producto.id}</div>
            <div> {producto.nombre}</div>
            <div> {producto.descripcionBreve}</div>
            <div> {producto.precio}</div>
          </div>,

        )}
      </div>

    </div>
  )
}

export default Listado