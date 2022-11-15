const express = require('express')
const router = express.Router()
const DB = require('../modules/dbconnection')
const bcrypt = require('bcryptjs')
const session = require('express-session')

router.get("/login", (req,res) => {
    if (req.session.loggedIn) {
        res.redirect("/pages/dashboard")
    } else {
        res.render("login", {
            title: "Sign In"
        })
    }

})

router.get("/registration", (req,res) => {
    res.render("registration", {
        title: "Sign Up"
    })
})

router.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect("/")
})

router.get("/done", (req,res) => {
    res.render("done", {
        title: "Registration Successful"
    })
})

router.get("/dashboard", async (req,res) => {
    if (!req.session.loggedIn) {
        res.redirect("/pages/login")
    } else {
        await DB.User.find({ email: req.session.email})
        .then((users) => {
            res.render("dashboard", {
                title: "Dashboard",
                users:users
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
})

router.post("/post/registration", (req,res) => {
    const { fullname, email, password} = req.body;

    const encpass = bcrypt.hashSync(password, 10);
    new DB.User({
        fullname: fullname,
        email: email,
        password: encpass
    })

    .save()
    .then((user) => {
        console.log(res.session);
        res.redirect("/pages/done")
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/')
        
    })
})

router.post("/post/login", async (req, res) => {
    const { email, password } = req.body;
    await DB.User.findOne({ email: email })
    .then((user) => {
        const encPass = user.password;
        const isValid = bcrypt.compareSync(password, encPass);
        // console.log(isValid)
        if (isValid){
            req.session.email = email;
            req.session.loggedIn = true;
            res.redirect("/pages/dashboard");
            res.end();
        }
        console.log(req.session)
    }).catch((err) => {
        console.log(err);
    })
})



module.exports = router