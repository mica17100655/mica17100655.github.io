const productos = [
    { id:1, nombre:"Remera", precio: 3000, categoria: "ropa", imagen: "remera.jfif"},
    { id:2, nombre:"Gorra", precio: 1500, categoria: "accesorios", imagen: "gorra.jfif"},
    { id:3, nombre:"Zapatillas", precio: 8000, categoria: "calzado", imagen: "remera.jfif"},
    { id:4, nombre:"Buzo", precio: 6000, categoria: "ropa", imagen: "remera.jfif"},
    { id:5, nombre:"Mochila", precio: 3500, categoria: "accasorios", imagen: "remera.jfif"},
    { id:6, nombre:"Gorra", precio: 1500, categoria: "accesorios", imagen: "gorra.jfif"},
];

const container = document.getElementById('articulo');

productos.forEach(productos => {
    const div = document.createElement("div");
    div.className = 'card p-4 col-md-4 my-2';
    div.innerHTML = 
    `<div class= "card h-100">
    <img src="${productos.imagen}" style="width:50%; margin: 0 auto;">
    <div class= "card-body d-flex flex-column text-center">
    <h5 class= "card-title">${productos.nombre}</h5>
    <p class= "card-text">${productos.precio}</p>
    <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${productos.id})">
        <i class="bi bi-gift-fill"></i>
        Agregar al carrito
    </button>
    </div>
    </div>`;
    container.appendChild(div);

});

 // Variable para almacenar el contador del carrito
 let contadorCarrito = 0;
 // Array para almacenar los productos del carrito
 let carrito = [];
 // Función para agregar productos al carrito
 function agregarAlCarrito(idProducto) {
     // Buscar el producto en el array de productos
     const producto = productos.find(p => p.id === idProducto);
     if (producto) {
         // Incrementar el contador
         contadorCarrito++;
         // Actualizar el contador en el botón del carrito
         document.getElementById('contador').textContent = contadorCarrito;
         // Agregar el producto al carrito (o incrementar cantidad si ya existe)
         const productoEnCarrito = carrito.find(p => p.id === idProducto);
         if (productoEnCarrito) {
             productoEnCarrito.cantidad++;
         } else {
             carrito.push({...producto, cantidad: 1});
         }
         // Opcional: Mostrar notificación
         alert(`¡${producto.nombre} agregado al carrito!`);
         
     }
 }

 // Función para mostrar/ocultar el carrito
    document.getElementById('verCarrito').addEventListener('click', function()
    {
        const carritoDiv = document.getElementById('carrito');
        // alternamos la clase 'd-none' para mostrar o ocultar el carrito
        carritoDiv.classList.toggle('d-none');
        actualizarCarrito()
    })
 // Obtenemos el elemento de la lista del carrito
 const listaCarrito = document.getElementById("lista-carrito");
 // Obtenemos el elemento del total 
 const totalspan = document.getElementById("total");
 // Obtenemos el elemento del contador
 const contador = document.getElementById("contador");
 // Evento para mostrar el carrito al hacer clic en el botón
 function actualizarCarrito()
   {
      listaCarrito.innerHTML = "";
      let total = 0;
      carrito.forEach(productos =>
       {
        //creamos un nuevo elemento de la lista
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between lead";
        item.textContent = `${productos.nombre} x ${productos.cantidad}`;
        const precio = document.createElement("span");
        precio.textContent = `${productos.precio * productos.cantidad}`;
        item.appendChild(precio);
        listaCarrito.appendChild(item);
        total += productos.precio * productos.cantidad;
       }
       );
      totalspan.textContent = total;
      contador.textContent = carrito.reduce((sum, productos) => sum + productos, 0);
   }
// Función para finalizar la compra y enviar mensaje por whatsaap
   function finalizarCompra()
     {
         if (carrito.length === 0)
         {
            alert("El carrito está vacío");
            return;
         }   
        //Calcular el total
        const total = carrito.reduce((sum, productos) => sum + (productos.precio * productos.cantidad), 0);
        // Crear mensaje con los productos
        let mensaje = "¡Hola! Quiero realizar la siguiente compra:%0A%0A";
        carrito.forEach(productos =>
        {
            mensaje += `-${productos.nombre} x ${productos.cantidad}: ${productos.precio * productos.cantidad}%0A`;
        });
        mensaje += `%0ATotal: $${total}%0A%0A Y proceder con el pago y coordinar envio`
        const telefono = "5491162934053";
        const urlWhatsApp = `https: wa.me/${telefono}?text=${mensaje}`;
        window.open(urlWhatsApp,'_blank');
        carrito = [];
        actualizarCarrito();
        document.getElementById('carrito').classList.add('d-none');
     }