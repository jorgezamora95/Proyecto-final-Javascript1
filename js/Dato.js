class Dato {

    constructor(descripcion = "", valor = 0) {
        this._descripcion = descripcion
        this._valor = valor
    }

    get descripcion() {
        return this._descripcion
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion
    }

    get valor() {
        return this._valor
    }

    set valor(valor) {
        this._valor = this.validarNumero(valor)
    }

    validarNumero(valor) {
        if (isNaN(valor)) {
            throw new Error("El valor debe ser un número")
        } else {
            return 0
            console.error("Ingrese un valor númerico")
        }
    }
}

