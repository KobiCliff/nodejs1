const express = require('express')
const server = express()
require('dotenv').config()
const path = require('path')
const bcrypt = require('bcryptjs')
const session = require('express-session')

server.unsubscribe(express.json())
server.use(express.urlencoded({
    extended: false
}))

server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    expires: 600000
}))


server.set("view engine", "ejs")
server.set("views", path.join(__dirname, "views"))

server.use(express.static(path.join(__dirname,"public")))

server.get("/", (req,res) => {
    res.render("index", {
        title: "Home Page"
    })
})

// server.get("/login", (req,res) => {
//     res.render("login", {
//         title: "Sign In"
//     })
// })

// server.get("/registration", (req,res) => {
//     res.render("registration", {
//         title: "Sign Up"
//     })
// })

// server.get("/logout", (req,res) => {
//     res.render("logout", {
//         title: "Sign Out"
//     })
// })

const pagesRouter = require("./routers/pages")
server.use("/pages", pagesRouter)


const DB = require("./modules/dbconnection");


const port = process.env.PRT || 8001
server.listen(port, () => {
    console.log(`Server is running ${port}`)
})