// const ingresos = [
//     {
//         descripcion: "Quincena",
//         valor: 9000
//     },
//     {
//         descripcion: "Venta",
//         valor: 400
//     }
// ];


// const egresos = [
//     {
//         descripcion: "Renta",
//         valor: 900 
//     },
//     {
//         descripcion: "Ropa",
//         valor: 400
//     }
// ];

const ingresos = [
    new Ingreso("Salario", 20000),
    new Ingreso("Venta Auto", 50000)
];

const egresos = [
    new Egreso("Renta",4000),
    new Egreso("Ropa", 800)
]


const totalIngresos = () => {

    let totalIngreso = 0;

    for (const ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
};



const totalEgresos = () => {
    let totalEgreso = 0;

    for (const egreso of egresos) {
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
};

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 })
}

 const cargarCabecero = () => {


    const totalIngreso = totalIngresos();
    const totalEgreso = totalEgresos();

    const presupuesto = totalIngreso - totalEgreso
    const porcentajeEgreso =  totalIngreso === 0
            ? 0
            : totalEgreso / totalIngreso


    const presupuestoElemento = document.getElementById("presupuesto")
    presupuestoElemento.innerHTML = formatoMoneda(presupuesto)

    const porcentajeEgresoElemento = document.getElementById("porcentaje")
    porcentajeEgresoElemento.innerHTML = formatoPorcentaje(porcentajeEgreso)

    const ingresosElemento = document.getElementById("ingresos")
    ingresosElemento.innerHTML = formatoMoneda(totalIngreso)

    const egresosElemento = document.getElementById("egresos")
    egresosElemento.innerHTML = formatoMoneda(totalEgreso)
    

 }

 const cargarApp = () => {

    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

 }


 const cargarIngresos = () => {
    let ingresosHTML = ""

    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso)
    }

    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;

 }

 const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button type="button"
                    class="elemento_eliminar_btn"
                    onclick='eliminarIngreso(${ingreso.id})'>
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return ingresoHTML
 }

 const cargarEgresos = () => {
    let egresosHTML = ""

    for (const egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML
 }

 const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button type="button"
                    class="elemento_eliminar_btn"
                    onclick='eliminarEgreso(${egreso.id})'>
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return egresoHTML  
 }

 const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex(egreso => egreso.id === id)
    egresos.splice(indiceEliminar, 1)
    cargarCabecero()
    cargarEgresos()
 }

 const eliminarIngreso = (id) => {
    const indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id)
    ingresos.splice(indiceEliminar, 1)
    cargarCabecero()
    cargarIngresos()
 }

 const agregarDato = () => {
    const forma = document.getElementById("forma")

    const tipo = forma.querySelector("#tipo").value
    const descripcion = forma.querySelector("#descripcion").value
    const valor = forma.querySelector("#valor").value

    if (descripcion !== "" && valor !== ""){
       

        if (tipo === "ingreso") {
            ingresos.push(new Ingreso(descripcion, Number(valor)))
            cargarCabecero()
            cargarIngresos()
        }
        if (tipo === "egreso") {
            egresos.push(new Egreso(descripcion, Number(valor)))
            cargarCabecero()
            cargarEgresos()
        }

        forma.querySelector("#descripcion").value = ""
        forma.querySelector("#valor").value = ""

    } else if (descripcion === "" && valor === "") {
        window.alert("Por favor ingrese una descripción y un valor válido")
    } else if (descripcion === "") {
        window.alert("El campo Descripción no puede estar vacío, por favor ingrese una descripción válida")
    } else if (valor === "") {
        window.alert("El campo Valor no puede estar vacío, por favor ingrese un valor válido")
    }   

 }