import express from 'express'

const app = express()
const port = 3004

app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('OK!')
    } else {
        res.send('Hello world')
    }
    
})

app.get('/samurais', (req, res) => {
    res.send('Hello samurais!!!!!')
})

app.post('/samurais', (req, res) => {
    res.send('We have created samurai')
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})