const express = require('express');
const expressSession = require('express-session');
const port = 5080;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(expressSession({
    secret: 'any',
	name: 'uniqueSessionID',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 10000 * 60,
		secure: false,
		httpOnly: true,
	}
}))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app