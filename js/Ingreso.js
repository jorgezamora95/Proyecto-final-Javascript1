 class Ingreso extends Dato {
    static contadorIngresos = 0

    constructor(descripcion = "", valor = 0) {
        super(descripcion, valor)
        this._id = ++Ingreso.contadorIngresos
    }

    get id() {
        return this._id
    }
 }