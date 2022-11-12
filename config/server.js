const express = require('express');
const expressSession = require('express-session');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 5080;

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(body_parser.urlencoded({ extended:true }));

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