const routes = require('./app/routes/routes');

const express = require('express');
const session = require('cookie-session');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 5080;

app.set('trust proxy', 1)
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(body_parser.urlencoded({ extended:true }));

// app.use(expressSession({
// 	secret: 'any',
// 	name: 'uniqueSessionID',
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {
// 		maxAge: 10000 * 60,
// 		secure: false,
// 		httpOnly: true,
// 	}
// }))

app.use(session({
	cookie:{
		secure: true,
		maxAge:60000
	},
	secret: 'secret',
	saveUninitialized: true,
	resave: false
}));

if (process.env.ENVIRONMENT === 'DEVL') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

//GET
routes.home(app);
routes.historyScreen(app);
routes.addTransactionScreen(app);
routes.addCategoryScreen(app);
routes.userScreen(app);
routes.logout(app);

//POST
routes.addTransaction(app);
routes.addCategory(app);
routes.saveUser(app);
routes.authUser(app);

//DELETE
routes.deleteTransaction(app)

//UPDATE
routes.editTransactionScreen(app)
routes.editTransaction(app)