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
        // Agrega más autos según sea necesario
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
        'totalAmount',
        'paymentMethod',
        'additionalInfo',
    ];

    const alquilarButtons = document.querySelectorAll('.btn');

    alquilarButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const auto = autos[index];
            auto.modelo = auto.modelo; // Esto es para asegurarse de que el modelo esté actualizado

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');

            const formContainer = document.createElement('div');
            formContainer.classList.add('form-container', 'larger-container');

            const form = document.createElement('form');

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
                        inputElement.value = `$${auto.valorPorDia}`;
                        inputElement.readOnly = true;
                    } else if (fieldName === 'modelo') {
                        inputElement.value = auto.modelo;
                        inputElement.readOnly = true;
                    }

                    inputBox.appendChild(inputElement);
                }

                if (fieldName === 'returnDate') {
                    inputBox.querySelector('input').addEventListener('change', function () {
                        const pickupDate = new Date(document.getElementById('pickupDate').value);
                        const returnDate = new Date(this.value);
                        const diasAlquilados = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
                        const montoTotal = auto.valorPorDia * diasAlquilados;

                        document.getElementById('totalAmount').value = `$${montoTotal.toFixed(2)}`;
                    });
                }

                form.appendChild(inputBox);
            });

            const cancelButton = document.createElement('button');
            cancelButton.classList.add('btn', 'cancel-btn');
            cancelButton.innerText = 'Cancelar Renta';

            const confirmButton = document.createElement('button');
            confirmButton.classList.add('btn', 'confirm-btn');
            confirmButton.innerText = 'Confirmar Renta';

            confirmButton.addEventListener('click', function () {
                const additionalInfo = document.getElementById('additionalInfo').value;

                fetch('URL_DE_TU_SERVIDOR', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        modelo: auto.modelo,
                        pickupDate: document.getElementById('pickupDate').value,
                        returnDate: document.getElementById('returnDate').value,
                        totalAmount: document.getElementById('totalAmount').value,
                        additionalInfo: additionalInfo,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => console.error('Error:', error));

                Swal.fire({
                    title: 'Resumen del alquiler',
                    html: `
                        <p>Modelo del auto: ${auto.modelo}</p>
                        <p>Fechas: ${pickupDate.toDateString()} - ${returnDate.toDateString()}</p>
                        <p>Total a pagar: $${montoTotal.toFixed(2)}</p>
                        <p>Información adicional: ${additionalInfo}</p>
                    `,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    showClass: {
                        popup: 'animate__animated animate__fadeInUp animate__faster',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown animate__faster',
                    },
                });

                overlay.style.display = 'none';
            });

            form.appendChild(cancelButton);
            form.appendChild(confirmButton);
            formContainer.appendChild(form);

            overlay.appendChild(formContainer);
            document.body.appendChild(overlay);

            overlay.style.display = 'block';
        });
    });
});
