var cuentas = [
    { nombre: "Mali", saldo: 200, password: 'helloworld', movimientos: [] },
    { nombre: "Gera", saldo: 290, password: 'l33t', movimientos: [] },
    { nombre: "Maui", saldo: 67, password: '123', movimientos: [] }
];
let CuentaID = ""
let inputUser = document.getElementById('inputUser')
let inputPass = document.getElementById('inputPassword')
let btningresar = document.getElementById('btnIngresar')
let btnconsultarSaldo = document.getElementById('btnconsultarSaldo')
let btnretirarMonto = document.getElementById('btnretirarMonto')
let btningresarMonto = document.getElementById('btningresarMonto')
let btnsalir = document.getElementById('btnsalir')
let btncancelar = document.getElementById('cancel')
let btnretirar = document.getElementById('btnRetirar')
let btnMovimientos = document.getElementById('btnConsultarMovimientos')
let btnIngresarCuenta = document.getElementById('btnIngresaraCuenta')
let inputMontoRetirar = document.getElementById('inputMontoRetiro')
let inputMontoIngresar = document.getElementById('inputMontoIngresar')
let displayUserForm = document.getElementById('userForm')
let displayMenu = document.getElementById('menu')
let displayMenuInicio = document.getElementById('menuInicio')
let displayMonto = document.getElementById('mostrarMonto')
let displayMenuRetirar = document.getElementById('menuRetirar')
let displayMenuIngresar = document.getElementById('menuIngresar')
let displayMenuMovimientos = document.getElementById('menuMovimientos')
btningresar.addEventListener('click', checkUser)
btnconsultarSaldo.addEventListener('click', consultarSaldo)
btnretirarMonto.addEventListener('click', retirarMonto)
btningresarMonto.addEventListener('click', ingresarMonto)
btnsalir.addEventListener('click', salir)
btnretirar.addEventListener('click', retiroCuenta)
btnIngresarCuenta.addEventListener('click', ingresaraCuenta)
btnMovimientos.addEventListener('click', ConsultaMovimientos)
btncancelar.addEventListener('click', cancelar)
inputUser.onfocus = function () {
    clearMessage()
}
inputPass.onfocus = function () {
    clearMessage()
}
inputMontoRetirar.onfocus = function () {
    clearMessage()
}
inputMontoIngresar.onfocus = function () {
    clearMessage()
}
function clearMessage(){
    document.getElementById('message').style.display = "none"
    document.getElementById('message').innerHTML = ""
}
function cancelar() {
    btncancelar.style.display = "none"
    document.getElementById('message').style.display = "none"
    limpiarInputs()
    menuCuenta()
}
function limpiarInputs(){
    let elements = document.getElementsByTagName("input");
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}
function checkUser() {
    let user = document.getElementById('inputUser').value
    let pass = document.getElementById('inputPassword').value
    let obtenerCliente = cuentas.find((cuentas) => cuentas.nombre === user);
    if (obtenerCliente === undefined) {
        document.getElementById('message').style.display = "block"
        document.getElementById('message').innerHTML = "Usuario incorrecto"
    } else {
        let checkPass = cuentas.find((cuentas) => cuentas.nombre === user && cuentas.password === pass);
        if (checkPass === undefined) {
            document.getElementById('message').style.display = "block"
            document.getElementById('message').innerHTML = "Password incorrecto"
        } else {
            CuentaID = cuentas.findIndex((cuentas) => cuentas.nombre === user && cuentas.password === pass);
            document.getElementById('welcome').innerHTML = `Hola ${cuentas[CuentaID].nombre}`
            menuCuenta();
        }
    }
}
function inicializar() {
    limpiarInputs()
    document.getElementById('welcome').innerHTML = ''
    CuentaID = ""
    displayMonto.innerHTML = ""
    document.getElementById('detalleMovimientos').innerHTML = ""
}
function menuCuenta() {
    displayUserForm.style.display = "none"
    displayMenu.style.display = "block"
    displayMenuInicio.style.display = "block"
    displayMenuRetirar.style.display = "none"
    displayMenuIngresar.style.display = "none"
    displayMenuMovimientos.style.display = "none"
    displayMonto.innerHTML = ""
}
function consultarSaldo() {
    document.getElementById('mostrarMonto').innerHTML = `$${cuentas[CuentaID].saldo}`;
}
function ingresarMonto() {
    document.getElementById('menuInicio').style.display = "none"
    document.getElementById('menuIngresar').style.display = "block"
    let maximo = 990 - cuentas[CuentaID].saldo
    document.getElementById('labelMontoIngreso').innerHTML = `Cuanto deseas ingresar? El monto máximo a ingresar es <strong>$${maximo}</strong>`
    btncancelar.style.display = "block"
}
function retirarMonto() {
    let maximo = cuentas[CuentaID].saldo - 10
    document.getElementById('menuInicio').style.display = "none"
    document.getElementById('menuRetirar').style.display = "block"
    document.getElementById('labelMontoRetiro').innerHTML = `Cuanto deseas retirar? El máximo es <strong>$${maximo}</strong>`
    btncancelar.style.display = "block"
}
function salir() {
    inicializar()
    displayMenu.style.display = "none"
    displayUserForm.style.display = "block"
}
function retiroCuenta() {
    let montoRetiro = parseFloat(document.getElementById('inputMontoRetiro').value)
    if(isNaN(montoRetiro)){
        document.getElementById('message').style.display = "block"
        document.getElementById('message').innerHTML = "Favor de escribir el monto"
        return false
    }
    let saldoNuevo = cuentas[CuentaID].saldo - montoRetiro
    if (saldoNuevo < 10) {
        document.getElementById('message').style.display = "block"
        document.getElementById('message').innerHTML = "Su cuenta no debe tener un saldo menor a $10"
    } else {
        document.getElementById('messageOK').style.display = "block"
        document.getElementById('messageOK').innerHTML = `Retiro: $${montoRetiro}, saldo nuevo: $${saldoNuevo}`
        cuentas[CuentaID].saldo = saldoNuevo;
        let tipomovimiento = {
            Tipo: "Retiro",
            Cantidad: `$${montoRetiro}`
        }
        cuentas[CuentaID].movimientos.push(tipomovimiento)
        document.getElementById('inputMontoRetiro').value = ''
        btncancelar.style.display = "none"
        menuCuenta()
        setTimeout(function () {
            document.getElementById('messageOK').style.display = "none"
        }, 2000)
    }
}
function ingresaraCuenta() {
    let montoIngreso = parseFloat(document.getElementById('inputMontoIngresar').value)
    if(isNaN(montoIngreso)){
        document.getElementById('message').style.display = "block"
        document.getElementById('message').innerHTML = "Favor de escribir el monto"
        return false
    }
    let saldoNuevo = cuentas[CuentaID].saldo + montoIngreso
    console.log(saldoNuevo)
    if (saldoNuevo > 990) {
        document.getElementById('message').style.display = "block"
        document.getElementById('message').innerHTML = "Su cuenta no debe tener más de $990"
    } else {
        document.getElementById('messageOK').style.display = "block"
        document.getElementById('messageOK').innerHTML = `Ingresado: $${montoIngreso}, saldo nuevo: $${saldoNuevo}`
        cuentas[CuentaID].saldo = saldoNuevo;
        let tipomovimiento = {
            Tipo: "Ingreso",
            Cantidad: `$${montoIngreso}`
        }
        cuentas[CuentaID].movimientos.push(tipomovimiento)
        document.getElementById('inputMontoIngresar').value = ''
        btncancelar.style.display = "none"
        menuCuenta()
        setTimeout(function () {
            document.getElementById('messageOK').style.display = "none"
        }, 2000)
    }
}
function ConsultaMovimientos() {
    let listaMovimientos = document.getElementById('detalleMovimientos')
    listaMovimientos.innerHTML = ""
    displayMenuMovimientos.style.display = "block"
    displayMenuInicio.style.display = "none"
    btncancelar.style.display = "block"
    if (cuentas[CuentaID].movimientos.length == 0) {
        listaMovimientos.innerHTML += `<h6>Sin movimientos</h6>`
    } else {
        for (let i = 0; i < cuentas[CuentaID].movimientos.length; i++) {
            let movimiento = `${cuentas[CuentaID].movimientos[i].Tipo}:${cuentas[CuentaID].movimientos[i].Cantidad} `;
            listaMovimientos.innerHTML += `<li>${movimiento}</li>`
        }
    }
}
