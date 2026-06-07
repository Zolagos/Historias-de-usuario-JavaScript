let notasLocal = localStorage.getItem("notas")
notasLocal = JSON.parse(notasLocal)
const textito = document.getElementById('texto')
const botoncito = document.getElementById('boton')
const lista = document.getElementById('listaNotas')
console.log(textito)
console.log(botoncito)
console.log(lista)

let notas = []

if (notasLocal){
    for (const notita of notasLocal){
        console.log(notita)
        console.log(notasLocal)
        const li = lista.appendChild(document.createElement("li"));
        li.textContent = notita.texto + " ";
        notas.push(notita)
        const button = li.appendChild(document.createElement('input'))
        button.type = 'button'
        button.value = 'Eliminar'
        button.addEventListener('click', (event)=>{
        lista.removeChild(li)
        notas = notas.filter(nota => nota.id !== notita.id);
        localStorage.setItem("notas", JSON.stringify(notas));
        console.log('Se elimino una nota!')
        })
    }
}

botoncito.addEventListener('click', (event) =>{
    const textoValor = textito.value
    if (!textoValor){
        alert('El campo no puede estar vacio!')
        return
    }
    const nuevaNota = {
        id: Date.now(),
        texto: textoValor
    };
    const li = lista.appendChild(document.createElement("li"));
    li.textContent = textito.value + " ";
    notas.push(nuevaNota)
    localStorage.setItem("notas", JSON.stringify(notas))
    console.log('Se agrego una nota!')
    textito.value = "" 
    const button = li.appendChild(document.createElement('input'))
    button.type = 'button'
    button.value = 'Eliminar'
    button.addEventListener('click', (event)=>{
        lista.removeChild(li)
        notas = notas.filter(nota => nota.id !== nuevaNota.id);
        localStorage.setItem("notas", JSON.stringify(notas));
        console.log('Se elimino una nota!')
    })
})
