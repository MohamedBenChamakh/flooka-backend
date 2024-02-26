const http = require('http');
const app = require('./src/app');
const server = http.createServer(app);
const cors = require('cors');

//CROSS-ORIGIN
const corsOptions = {
    origin: ['https://flooka-tv.vercel.app'], // Pass the allowed origins as an array
    methods: ['GET', 'POST'], // Optionally, specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Optionally, specify allowed headers
    credentials: true, // Optionally, enable credentials
};

app.use(cors(corsOptions));
app.set('view engine', 'ejs');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);