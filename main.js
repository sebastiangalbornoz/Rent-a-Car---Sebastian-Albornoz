document.addEventListener('DOMContentLoaded', function () {
    const autos = [
        {
            modelo: '2018 Honda Civic',
            valorPorDia: 20000,
        },
        {
            modelo: '2020 Honda Civic Sport',
            valorPorDia: 25000,
        },
        {
            modelo: '2021 Honda Civic Type R',
            valorPorDia: 30000,
        },
        {
            modelo: '2019 Ford GT',
            valorPorDia: 50000,
        },
        {
            modelo: '2022 Hond GT',
            valorPorDia: 35000,
        },
        {
            modelo: '2022 Porsche',
            valorPorDia: 40000,
        },
    ];

    const fieldOrder = [
        'modelo',
        'firstName',
        'lastName',
        'dob',
        'valorPorDia',
        'pickupDate',
        'returnDate',
        'clientEmail',
        'contactNumber',
        'diasAlquilados',
        'totalAmount',
        'paymentMethod',
        'additionalInfo',
    ];

    const alquilarButtons = document.querySelectorAll('.btn');

    alquilarButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const auto = autos[index];

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');

            const formContainer = document.createElement('div');
            formContainer.classList.add('form-container', 'larger-container');

            const form = document.createElement('form');

            let pickupDateValue = '';

            // Antes de crear los botones de cancelar y confirmar la renta
            const returnDateInput = document.getElementById('returnDate');

            // Asegurarse de que returnDateInput existe y no es nulo
            if (returnDateInput) {
                returnDateInput.addEventListener('change', function () {
                    const pickupDate = new Date(pickupDateValue);
                    const returnDate = new Date(this.value);

                    if (!isNaN(returnDate.getTime()) && returnDate >= pickupDate) {
                        const diasAlquilados = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
                        const montoTotal = auto.valorPorDia * diasAlquilados;

                        document.getElementById('totalAmount').value = `${montoTotal.toFixed(2)}`;
                        document.getElementById('diasAlquilados').value = diasAlquilados;
                    } else {
                        console.error('Fecha de regreso no válida');
                        document.getElementById('totalAmount').value = '';
                        document.getElementById('diasAlquilados').value = '';
                    }
                });
            }

            fieldOrder.forEach((fieldName) => {
                const inputBox = document.createElement('div');
                inputBox.classList.add('input-box');
                let inputType = 'text';
                let labelText = '';

                switch (fieldName) {
                    case 'modelo':
                        labelText = 'Modelo de auto';
                        break;
                    case 'firstName':
                        labelText = 'Nombre';
                        break;
                    case 'lastName':
                        labelText = 'Apellido';
                        break;
                    case 'dob':
                        labelText = 'Fecha de nacimiento';
                        inputType = 'date';
                        break;
                    case 'valorPorDia':
                        labelText = 'Valor por día';
                        inputType = 'text';
                        break;
                    case 'pickupDate':
                        labelText = 'Fecha de alquiler';
                        inputType = 'date';
                        break;
                    case 'returnDate':
                        labelText = 'Regreso de auto';
                        inputType = 'date';
                        break;
                    case 'clientEmail':
                        labelText = 'Email';
                        break;
                    case 'contactNumber':
                        labelText = 'Numero de contacto';
                        break;
                    case 'diasAlquilados':
                        labelText = 'Días Alquilados';
                        inputType = 'text';
                        break;
                    case 'totalAmount':
                        labelText = 'Total a pagar';
                        inputType = 'text';
                        break;
                    case 'paymentMethod':
                        labelText = 'Metodo de pago';
                        inputType = 'select';
                        break;
                    case 'additionalInfo':
                        labelText = 'Información adicional';
                        break;
                    default:
                        break;
                }

                inputBox.innerHTML = `<span>${labelText}</span>`;

                if (fieldName === 'diasAlquilados' || fieldName === 'totalAmount') {
                    const inputElement = document.createElement('input');
                    inputElement.type = inputType;
                    inputElement.name = fieldName;
                    inputElement.id = fieldName;
                    inputElement.readOnly = true;
                    inputBox.appendChild(inputElement);
                } else {
                    if (inputType === 'select') {
                        const selectBox = document.createElement('select');
                        selectBox.name = fieldName;
                        selectBox.id = fieldName;

                        const paymentOptions = ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Mercado Pago'];

                        paymentOptions.forEach((option) => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option.toLowerCase().replace(/\s/g, '_');
                            optionElement.text = option;
                            selectBox.appendChild(optionElement);
                        });

                        inputBox.appendChild(selectBox);
                    } else {
                        const inputElement = document.createElement('input');
                        inputElement.type = inputType;
                        inputElement.name = fieldName;
                        inputElement.id = fieldName;

                        if (fieldName === 'valorPorDia') {
                            inputElement.value = `$${auto.valorPorDia.toFixed(2)}`;
                            inputElement.readOnly = true;
                        } else if (fieldName === 'modelo') {
                            inputElement.value = auto.modelo;
                            inputElement.readOnly = true;
                        } else if (fieldName === 'pickupDate') {
                            inputElement.value = pickupDateValue;
                            inputElement.addEventListener('change', function () {
                                pickupDateValue = this.value;
                            });
                        }

                        inputBox.appendChild(inputElement);
                    }
                }

                if (fieldName === 'returnDate') {
                    inputBox.querySelector('input').addEventListener('change', function () {
                        const pickupDate = new Date(pickupDateValue);
                        const returnDate = new Date(this.value);

                        if (!isNaN(returnDate.getTime()) && returnDate >= pickupDate) {
                            const diasAlquilados = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
                            const montoTotal = auto.valorPorDia * diasAlquilados;

                            document.getElementById('totalAmount').value = `${montoTotal.toFixed(2)}`;
                            document.getElementById('diasAlquilados').value = diasAlquilados;
                        } else {
                            console.error('Fecha de regreso no válida');
                            document.getElementById('totalAmount').value = '';
                            document.getElementById('diasAlquilados').value = '';
                        }
                    });
                }

                form.appendChild(inputBox);
            });

            // Añadir el botón de Mercado Pago
            const mercadoPagoButton = document.createElement('button');
            mercadoPagoButton.id = 'checkout-btn';
            mercadoPagoButton.className = 'btn-mercado-pago';
            mercadoPagoButton.innerText = 'Pagar con Mercado Pago';
            form.appendChild(mercadoPagoButton);

            // Event listener para el botón de Mercado Pago
            mercadoPagoButton.addEventListener('click', function (event) {
                event.preventDefault();
                iniciarProcesoDePago();
            });

            const cancelButton = document.createElement('button');
            cancelButton.classList.add('btn', 'cancel-btn');
            cancelButton.innerText = 'Cancelar Renta';

            const confirmButton = document.createElement('button');
            confirmButton.classList.add('btn', 'confirm-btn');
            confirmButton.innerText = 'Confirmar Renta';

            confirmButton.addEventListener('click', function (event) {
                event.preventDefault();

                Swal.fire({
                    title: "¡Confirmación exitosa!",
                    text: "Gracias por confirmar la renta.",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                    timer: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        overlay.style.display = 'none';
                    }
                });
            });

            form.appendChild(cancelButton);
            form.appendChild(confirmButton);
            formContainer.appendChild(form);

            overlay.appendChild(formContainer);
            document.body.appendChild(overlay);

            overlay.style.display = 'block';
        });
    });

    // Obtener enlaces de inicio de sesión y registro
    const loginLink = document.querySelector('#login');
    const registroLink = document.querySelector('#registro');

    // Event listener para el enlace de inicio de sesión
    loginLink.addEventListener('click', function () {
        mostrarFormulario('Iniciar Sesión', 'login');
    });

    // Event listener para el enlace de registro
    registroLink.addEventListener('click', function () {
        mostrarFormulario('Registrarse', 'registro');
    });

    // Función para mostrar un formulario modal
    function mostrarFormulario(titulo, tipo) {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        const form = document.createElement('form');

        // Agregar campos al formulario
        const usuarioLabel = document.createElement('label');
        usuarioLabel.for = 'usuario';
        usuarioLabel.innerText = 'Usuario:';
        const usuarioInput = document.createElement('input');
        usuarioInput.type = 'text';
        usuarioInput.id = 'usuario';
        usuarioInput.name = 'usuario';
        form.appendChild(usuarioLabel);
        form.appendChild(usuarioInput);

        const contraseñaLabel = document.createElement('label');
        contraseñaLabel.for = 'contraseña';
        contraseñaLabel.innerText = 'Contraseña:';
        const contraseñaInput = document.createElement('input');
        contraseñaInput.type = 'password';
        contraseñaInput.id = 'contraseña';
        contraseñaInput.name = 'contraseña';
        form.appendChild(contraseñaLabel);
        form.appendChild(contraseñaInput);

        // ... (puedes agregar más campos según tus necesidades)

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('btn', 'cancel-btn');
        cancelButton.innerText = 'Cancelar';

        const confirmButton = document.createElement('button');
        confirmButton.classList.add('btn', 'confirm-btn');
        confirmButton.innerText = 'Confirmar';

        confirmButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Obtener datos del formulario
            const usuario = document.getElementById('usuario').value;
            const contraseña = document.getElementById('contraseña').value;

            // Realizar la acción correspondiente según el tipo de formulario
            if (tipo === 'login') {
                if (validarCredenciales(usuario, contraseña)) {
                    // Usuario autenticado correctamente
                    alert('Inicio de sesión exitoso');
                    overlay.style.display = 'none';
                } else {
                    // Credenciales incorrectas
                    alert('Usuario o contraseña incorrectos');
                }
            } else if (tipo === 'registro') {
                if (registrarUsuario(usuario, contraseña)) {
                    // Registro exitoso
                    alert('Registro exitoso');
                    overlay.style.display = 'none';
                } else {
                    // Usuario ya existente
                    alert('El usuario ya existe');
                }
            }
        });

        form.appendChild(cancelButton);
        form.appendChild(confirmButton);
        formContainer.appendChild(form);

        overlay.appendChild(formContainer);
        document.body.appendChild(overlay);

        overlay.style.display = 'block';
    }

    const mercadopago = new MercadoPago("public_key", {
        locale: "es-AR", // The most common are: 'pt-BR', 'es-Ar' and 'en-Us'
    })

    document.getElementById("checkout-btn").addEventListener("click", function () {

        $('#checkout-btn').attr("disabled", true);

        const orderData = {
            quantity: document.getElementById("quantity").value,
            description: document.getElementById("product-description").innerHTML,
            price: document.getElementById("unit-price").innerHTML
        };

        fetch("http://localhost:8080/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (preference) {
                createCheckoutButton(preference.id);

                $(".shopping-cart").fadeOut(500);
                setTimeout(() => {
                    $(".container_payment").show(500).fadeIn();
                }, 500);
            })
            .catch(function () {
                alert("Unexpected error");
                $('#checkout-btn').attr("disabled", false);
            });
    });

    function iniciarProcesoDePago() {
        // Lógica para iniciar el proceso de pago con Mercado Pago
        // Aquí puedes llamar a funciones específicas para integrar con Mercado Pago
        const preference = {
            items: [
                {
                    title: 'Alquiler de auto',
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: parseFloat(document.getElementById('totalAmount').value),  // Reemplaza con el precio total del alquiler
                },
            ],
        };

        // Realizar la solicitud al servidor para crear la preferencia de Mercado Pago
        fetch('http://localhost:8080/create_preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(preference),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            // Redirige al usuario al link de pago de Mercado Pago
            window.location.href = preference.link;
        })
        .catch(function (error) {
            console.error('Error al iniciar el proceso de pago con Mercado Pago:', error);
            // Puedes mostrar un mensaje de error al usuario si es necesario
        });
    }
});
