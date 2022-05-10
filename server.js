const express = require('express')
const http = require('http')
const favicon = require('serve-favicon')
const path = require('path')

let count = 0

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

app.get('/students', (req, res) => {
    count++
    res.send('STUDENTS: ' + count)
    res.end()
})
app.listen(3002, () => {

})




// const server = http.createServer((req, res) => {
//     count++

//     switch (req.url) {
//         case '/students':
//             res.write('STUDENTS')
//             break
//         case '/courses':
//             res.write('FRONT + BACK')
//             break
//         default:
//             res.write('404 not found')
//     }

//     res.write(' IT-KAMASUTRA: ' + count)
//     res.end()
// })



// server.listen(3002)

