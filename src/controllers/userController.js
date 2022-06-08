const fetch = require('node-fetch');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    const token = req.cookies['jwt'];
    if(token){
        res.clearCookie('jwt');
        res.redirect('/');
    }else{
        res.send('You must be logged in to logout!');
    }
});

router.post('/register', async (req, res) => {
    const user = req.body;
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();
    const userExists = users.find(u => u.username === user.username);

    if(userExists){
        res.send('User already exists!');
        return;
    }else{
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;

        await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            console.log(err);
        });

        res.redirect('/users/login');
    }
});

router.post('/login', async (req, res) => {
    const user = req.body;
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();
    const userExists = users.find(u => u.username === user.username);

    if(userExists){
        const match = await bcrypt.compare(user.password, userExists.password);
        if(match){
            const token = jwt.sign({
                username: user.username
            }, 'secret', {expiresIn: '1h'});

            res.cookie('jwt', token, {httpOnly: true});
            res.redirect('/');
            await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(rs => res.json())
            .then(user => {
                //console.log(user);
            })
            .catch(err => {
                console.log(err);
            })

        }else{
            res.send('Invalid password!');
        }
    }
    else{
        res.send('Invalid username!');
    }
});


module.exports = router;