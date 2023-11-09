document.addEventListener("DOMContentLoaded", function () {
    const cuentas = [
        { nombre: "Felipe", saldo: 200, password: "1234" },
        { nombre: "Camila", saldo: 290, password: "1234" },
        { nombre: "Danae", saldo: 67, password: "1234" }
    ];

    let cuentaSeleccionada = null;

    const selectCuenta = document.querySelector('.cuenta');
    const inputPassword = document.getElementById('password');
    const botonIngresar = document.getElementById('botonIngresar');
    const operaciones = document.getElementById('operaciones');
    const consultarBtn = document.getElementById('consultar');
    const ingresarBtn = document.getElementById('ingresar');
    const retirarBtn = document.getElementById('retirar');
    const resultado = document.getElementById('resultado');

    
    cuentas.forEach((cuenta, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = cuenta.nombre;
        selectCuenta.appendChild(option);
    });

    botonIngresar.addEventListener('click', () => {
        const opcion = selectCuenta.value;
        const password = inputPassword.value;

        if (cuentas[opcion].password === password) {
            cuentaSeleccionada = cuentas[opcion];
            operaciones.style.display = "block";
            resultado.textContent = `Hola, ${cuentaSeleccionada.nombre}. Selecciona una operación.`;
        } else {
            resultado.textContent = "Contraseña incorrecta. Inténtelo de nuevo.";
        }
    });

    consultarBtn.addEventListener('click', () => {
        if (cuentaSeleccionada) {
            resultado.textContent = `Su saldo actual es: $${cuentaSeleccionada.saldo}`;
        }
    });

    ingresarBtn.addEventListener('click', () => {
        if (cuentaSeleccionada) {
            let monto = prompt("Ingrese el monto que desea abonar a su cuenta:");
            monto = parseInt(monto);

            if (monto > 0) {
                cuentaSeleccionada.saldo += monto;
                if (cuentaSeleccionada.saldo > 990) {
                    alert("No puede tener más de $990 en su cuenta, intente nuevamente.")
                    cuentaSeleccionada.saldo -= monto;
                } else {
                    resultado.textContent = `Se han ingresado $${monto}. Su saldo actual es: $${cuentaSeleccionada.saldo}`;
                }
            } else {
                resultado.textContent = "Ingrese un monto válido.";
            }
        }
    });

    retirarBtn.addEventListener('click', () => {
        if (cuentaSeleccionada) {
            let monto = prompt("Ingrese el monto a retirar:");
            monto = parseInt(monto);

            if (monto > 0 && cuentaSeleccionada.saldo - monto >= 10) {
                cuentaSeleccionada.saldo -= monto;
                resultado.textContent = `Se han retirado $${monto}. Su saldo actual es: $${cuentaSeleccionada.saldo}`;
            } else {
                alert("Monto inválido o excede su límite de retiro.");
            }
        }
    });
});

