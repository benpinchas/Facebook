const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);

const logger = require('./services/logger.service')



if (process.env.NODE_ENV !== 'production' || true) {
    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}


app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}


const authRoutes = require('./api/auth/auth.routes.js')
app.use('/api/auth', authRoutes)


const postRoutes = require('./api/post/post.routes.js')
app.use('/api/post', postRoutes)

const userRoutse = require ('./api/user/user.routes.js')
app.use('/api/user', userRoutse)


const friendshipRoutes = require ('./api/friendship/friendship.routes.js')
app.use('/api/friendship', friendshipRoutes)


const notificationsRoutes = require ('./api/notification/notification.routes.js')
app.use('/api/notification', notificationsRoutes)








app.get('/', (req, res) => {
    res.send('hello')
})



const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});
