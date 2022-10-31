const app = require('./config/server')
const routes = require('./app/routes/routes')

//GET
routes.home(app)
routes.historyScreen(app)
routes.addTransactionScreen(app)
routes.addCategoryScreen(app)
routes.userScreen(app)
routes.logout(app)

//POST
routes.addTransaction(app)
routes.addCategory(app)
routes.saveUser(app)
routes.authUser(app)