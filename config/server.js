const express = require('express');
const port = 5080;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app