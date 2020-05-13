const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const handlebars = require('express-handlebars')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    const viewsPath = path.join(__dirname, '/views')
    app.use('/', express.static(viewsPath));


app.get('/', (req, res) => {
    const axios = require('axios')
    axios.get('https://api.hgbrasil.com/finance?array_limit=1&fields=only_results,currencies&key=762f83be').then((response) => {
    const dollar = response.data.currencies.USD.buy
    const USD = dollar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    console.log(dollar, USD)
    res.render('index', {USD: USD})
    })
})


app.listen(3000)


/*
const axios = require('axios')

axios.get('https://api.hgbrasil.com/finance?array_limit=1&fields=only_results,currencies&key=762f83be').then((response) => {
    
    var dolar = response.data.currencies.USD.buy
    var mostrardolar = ''
    console.log(dolar)
})
*/







