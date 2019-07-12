console.log('server run!');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);

const logger = require('./services/logger.service')


const authRoutes = require('./api/auth/auth.routes')



app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))



app.get('/', (req, res) => {
    res.send('Good to you!')
})


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://127.0.0.1:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});
