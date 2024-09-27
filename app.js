const express = require("express");
const path = require("path");
const cors = require("cors")
const { engine } = require('express-handlebars')
const { PrismaClient } = require("@prisma/client")

const app = express()
const prisma = new PrismaClient()

app.engine('hbs', engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})

app.get('/change-whatsapp/:number', async (req, res) => {
    const { number } = req.params

    try {

        const query = await prisma.infor.findUnique({
            where: {
                id: 0
            }
        })

        if (query) {

            await prisma.infor.update({
                data: {
                    number: number
                },
                where: {
                    id: 0
                }
            })

        } else {

            await prisma.infor.create({
                data: {
                    number: number
                }
            })

        }

        return res.send("TUDO OK!")

    } catch {

        return res.send("OCORREU UM ERRO")
    
    }

})

app.get('/', async (req, res) => {

    try {
        const query = await prisma.infor.findMany()

        return res.render('index', { number: query[0]?.number })

    } catch {
        return res.send("CADASTRE SEU NUMERO DE WHATSAPP")
    }

})

app.get('/telas', async (req, res) => {
    const query = await prisma.infor.findMany()

    return res.render('telas', { number: query[0]?.number })

})

app.get('/internet-celular', async  (req, res) => {
    const query = await prisma.infor.findMany()

    return res.render('internet', { number: query[0]?.number })

})

app.listen('3000', () => console.log('Server is running...'))
