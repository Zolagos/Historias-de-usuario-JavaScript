const valorcitoNombre = document.getElementById('inputProducto');
const valorcitoPrecio = document.getElementById('inputPrecio');
const valorcitoDescripcion = document.getElementById('inputDescripcion');
const botoncitoAgregar = document.getElementById('botonAgregar');
const tablaBody = document.getElementById('tabla');
const datosVacios = document.getElementById('identificador');

// URL de la API local (JSON Server)
const API_URL = 'http://localhost:3000/productos';

// Variable de estado para saber si creamos o editamos
let editandoId = null; 


// OPERACIONES CRUD CON FETCH API Y LOCAL STORAGE


/**
 * GET: Obtener lista de elementos
 * Integra Fetch API (principal) y Local Storage (respaldo)
 */
const obtenerProductos = async () => {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('Servidor no respondió correctamente');
        
        const productos = await respuesta.json();
        
        // Guardamos una copia de seguridad en Local Storage
        localStorage.setItem('productosBackup', JSON.stringify(productos));
        
        console.log("GET [API] -> Productos obtenidos:", productos);
        datosVacios.textContent = ''; // Limpiar mensajes de error
        renderizarTabla(productos);

    } catch (error) {
        console.warn("GET [Error API] -> Falló la conexión. Buscando en Local Storage...", error);
        
        // Si la API falla, recuperamos el respaldo de Local Storage
        const productosLocales = JSON.parse(localStorage.getItem('productosBackup')) || [];
        
        console.log("GET [Local Storage] -> Productos recuperados:", productosLocales);
        datosVacios.textContent = '⚠️ Sin conexión al servidor: Mostrando datos guardados localmente.';
        renderizarTabla(productosLocales);
    }
};

/**
 * POST: Agregar nuevo elemento
 */
const agregarProductoAPI = async (nuevoProducto) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });
        
        if (!respuesta.ok) throw new Error('No se pudo guardar');
        const data = await respuesta.json();
        
        console.log("POST [API] -> Producto agregado:", data);
        datosVacios.textContent = '✅ ¡Producto añadido exitosamente!';
        
        obtenerProductos(); // Recargar la tabla y actualizar Local Storage
    } catch (error) {
        console.error("POST [Error] ->", error);
        datosVacios.textContent = '❌ Error al agregar el producto. Revisa tu conexión.';
    }
};

/**
 * PUT: Actualizar un elemento existente
 */
const actualizarProductoAPI = async (id, productoActualizado) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado)
        });
        
        if (!respuesta.ok) throw new Error('No se pudo actualizar');
        const data = await respuesta.json();
        
        console.log("PUT [API] -> Producto actualizado:", data);
        datosVacios.textContent = '✅ ¡Producto actualizado exitosamente!';
        
        // Resetear el estado del formulario
        editandoId = null;
        botoncitoAgregar.textContent = 'Agregar';
        
        obtenerProductos(); 
    } catch (error) {
        console.error("PUT [Error] ->", error);
        datosVacios.textContent = '❌ Error al actualizar el producto.';
    }
};

/**
 * DELETE: Eliminar un elemento
 */
const eliminarProductoAPI = async (id) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!respuesta.ok) throw new Error('No se pudo eliminar');
        
        console.log(`DELETE [API] -> Producto con ID ${id} eliminado`);
        datosVacios.textContent = '🗑️ ¡Producto eliminado!';
        
        obtenerProductos(); 
    } catch (error) {
        console.error("DELETE [Error] ->", error);
        datosVacios.textContent = '❌ Error al eliminar el producto.';
    }
};


// MANEJO DEL DOM Y RENDERIZADO


const renderizarTabla = (productos) => {
    tablaBody.innerHTML = ''; // Limpiar antes de reescribir

    productos.forEach(producto => {
        const tr = document.createElement('tr');
        
        const tdNombre = document.createElement('td');
        const tdDescripcion = document.createElement('td');
        const tdPrecio = document.createElement('td');
        const tdAcciones = document.createElement('td');
        
        // Creación de botones
        const btnEliminar = document.createElement('button');
        const btnEditar = document.createElement('button');
        
        tdNombre.textContent = producto.nombre;
        tdDescripcion.textContent = producto.descripcion;
        tdPrecio.textContent = producto.precio;
        
        btnEliminar.textContent = 'Eliminar';
        btnEditar.textContent = 'Editar';
        
        // Estilos en línea básicos para diferenciar botones
        btnEditar.style.backgroundColor = '#f39c12';
        btnEditar.style.marginRight = '10px';
        
        // Asignación de eventos
        btnEliminar.addEventListener('click', () => eliminarProductoAPI(producto.id));
        btnEditar.addEventListener('click', () => prepararEdicion(producto));

        // Ensamblaje de la fila
        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);
        
        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdAcciones);
        
        tablaBody.appendChild(tr);
    });
};

const prepararEdicion = (producto) => {
    // Llenar inputs con los datos seleccionados
    valorcitoNombre.value = producto.nombre;
    valorcitoPrecio.value = producto.precio;
    valorcitoDescripcion.value = producto.descripcion;
    
    // Cambiar a modo edición
    editandoId = producto.id;
    botoncitoAgregar.textContent = 'Guardar Cambios';
    datosVacios.textContent = '✏️ Editando producto...';
};

// VALIDACIONES DE ENTRADA Y FORMULARIO

const manejarFormulario = () => {
    const datosNombre = valorcitoNombre.value.trim();
    const datosPrecio = valorcitoPrecio.value.trim();
    const datosDescripcion = valorcitoDescripcion.value.trim();
    
    // Validación 1: Campos vacíos
    if (!datosNombre || !datosPrecio || !datosDescripcion){
        datosVacios.textContent = '¡Ningún campo puede estar vacío!';
        return;
    }

    // Validación 2: Tipo de dato numérico
    const validarPrecio = Number(datosPrecio);
    if (isNaN(validarPrecio)){
        datosVacios.textContent = '¡El precio debe ser un número válido!';
        return;
    } else if (validarPrecio < 0){
        datosVacios.textContent = '¡El precio no puede ser negativo!';
        return;
    }

    // Preparar objeto para enviar
    const productoObj = {
        nombre: datosNombre,
        descripcion: datosDescripcion,
        precio: validarPrecio
    };

    // Ejecutar POST o PUT según el estado
    if (editandoId) {
        actualizarProductoAPI(editandoId, productoObj);
    } else {
        agregarProductoAPI(productoObj);
    }

    // Resetear formulario visualmente
    valorcitoNombre.value = '';
    valorcitoPrecio.value = '';
    valorcitoDescripcion.value = '';
};


//INICIALIZACIÓN
// Escuchador principal del botón de formulario
botoncitoAgregar.addEventListener('click', (event) => {
    event.preventDefault(); // Previene recarga si está dentro de un form
    manejarFormulario();
});

// Carga inicial de datos al abrir la página
obtenerProductos();