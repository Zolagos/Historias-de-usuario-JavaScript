// Task 1, creación de objetos 
const objetoProducto = {
    categoria1:{
        id: 1,
        nombre: 'Secadora',
        precio: 25
    },
    categoria2:{
        id: 2,
        nombre: 'Lavadora',
        precio: 62
    },
    categoria3:{
        id: 3,
        nombre: 'Licuadora',
        precio: 14
    }
}

// Task 2, implementación del set
let lista = [2,7,9,4,2,5,3,1,7,6,8,4,9]
lista = new Set(lista);
console.log(lista)

lista.add(11)
console.log(lista)

console.log("¿El Set contiene el número 3?:", lista.has(3));
console.log("¿El Set contiene el número 9?:", lista.has(9));

lista.delete(2);
console.log("Set después de eliminar el 2:", lista);

for (const numeros of lista ){
    console.log(numeros)
}

// Task 3, creacion de un map
const mapeo = new Map()
mapeo.set(objetoProducto.categoria1,objetoProducto.categoria1.nombre)
mapeo.set(objetoProducto.categoria2,objetoProducto.categoria2.nombre)
mapeo.set(objetoProducto.categoria3,objetoProducto.categoria3.nombre)

// Task 4,  utilizacion del for...in for...of forEach() 
for (const objeto in objetoProducto){
    console.log(objeto)
}

for (const numeros of lista ){
    console.log(numeros)
}
 
mapeo.forEach((valor,llave)=>{
    console.log(`- La categoría [${llave}] incluye el producto: ${valor}`)
})

// Task 5, validación
const validar = (id, nombre, precio)=>{
    if (!id){
        console.error('Id no existe!')
    }
    if (!nombre){
        console.error('Nombre no existe!')
    }
    if (!precio){
        console.error('Precio no existe!')
    }else if (precio < 0){
        console.error('Precio no puede ser negativo!')
    }

}

for (const validacion in objetoProducto){
    validar(validacion.id, validacion.nombre, validacion.precio)
}

