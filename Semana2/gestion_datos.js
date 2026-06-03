const validarDatos = (id, nombre, precio) =>{
    if (!id || typeof nombre !== 'string' || nombre.trim() === '' || typeof precio !== 'number' || precio <= 0) {
        console.error(`Error: Datos inválidos para el producto "${nombre || 'Desconocido'}". No se agregara.`);
        return false;
    }
    return true;
};

const inventario = {}

if (validarDatos(101, "Monitor 24 pulgadas", 150)){
    inventario["producto1"] = {id: 101, nombre: "Monitor 24 pulgadas", precio: 150};
}
if ( validarDatos(102, " Teclado Mecánico", 80)){
    inventario["producto2"] = {id: 102, nombre: "Teclado Mecánico", precio: 80};
}
