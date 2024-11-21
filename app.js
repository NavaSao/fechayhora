const express = require('express');
const app = express();
const logMiddleware = require('./middlewares/middleware');
const ruta1 = require('./routes/ruta1');
const ruta2 = require('./routes/ruta2');



app.use(logMiddleware);

app.use(express.static('public'));

app.use('/ruta1', ruta1);
app.use('/ruta2', ruta2);

function saludar(req, res, next) {
    console.log("A continuacion la hora:");
    next();
}

app.get("/", (req, res) => {
    res.redirect('/Home');
});


app.get("/Home", saludar, (req, res) => {
    // Obtener la hora actual
    const now = new Date();
    const horaEntrada = now.toLocaleTimeString();

    
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="home">
                    Bienvenido a Home1.
                </div>
                <p>La hora de entrada es: ${horaEntrada}</p>
                <br>
                <button onclick="window.location.href='/Home2'">Ir a Home 2</button>
            </body>
        </html>
    `);
});


app.get("/Home2", saludar, (req, res) => {
    const now = new Date();
    const horaEntrada = now.toLocaleTimeString(); 
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="home2">Hola, estás en home2</div>
                 <p>La hora de entrada es: ${horaEntrada}</p>
                <br>
                <button onclick="window.location.href='/Home'">Volver a Home</button>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});