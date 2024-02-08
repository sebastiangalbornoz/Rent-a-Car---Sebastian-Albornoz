const express = require('express');
const mercadopago = require('mercadopago');

const app = express();

// Configuración de Mercado Pago (reemplaza 'YOUR_ACCESS_TOKEN' con tu token real)
mercadopago.configure({
    access_token: 'TEST-5881565643486924-020719-2df3331d8a6bcad6dba71c1ae67df70d-708373944',
    // Otros parámetros de configuración según sea necesario
});

// Ruta para crear la preferencia de pago
app.post('/create_preference', async (req, res) => {
    try {
        // Lógica para crear la preferencia de pago con Mercado Pago
        const preference = await mercadopago.preferences.create({
            items: [
                {
                    title: 'Alquiler de auto',
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: 5000,  // Reemplaza con el precio total del alquiler
                },
                // Puedes agregar más ítems según sea necesario
            ],
            // Otros parámetros según sea necesario
        });

        // Devuelve el ID de la preferencia
        res.json({
            id: preference.body.id
        });
    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        res.status(500).json({ error: 'Unexpected error' });
    }
});

// Otros middlewares y rutas según sea necesario

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
