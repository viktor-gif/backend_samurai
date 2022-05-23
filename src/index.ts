import express from 'express'

const app = express()
const port = 3003

app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('ОК!')
    } else {
        res.send('Hello World!')
    }
  
})

app.get('/users', (req, res) => {
  res.send('<h1>Hello Samurais :-)</h1>')
})
app.post('/users', (req, res) => {
  res.send('<h1>We have created samurai</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// const delay = (ms) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, ms)
//     })
// }
// const readFile = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

// const server = http.createServer(async (req, res) => {
//     switch (req.url) {
//         case '/home': {
//             try {
//                 const data = await readFile('pages/home.html')
//                 res.write(data)
//                 res.end()
//             } catch (err) {
//                 res.write('something wrong, status 500')
//                 res.end()
//             }
//             break
//         }
//         case '/about': {
//             try {
//                 const data = await readFile('pages/about.html')
//                 res.write(data)
//                 res.end()
//             } catch (err) {
//                 res.write('something wrong, status 500')
//                 res.end()
//             }
//             break
//         }
//         case '/del': {
//             try {
//                 await delay(5000)
//                 res.write('DELAY-TEST :-)')
//                 res.end()
//             } catch (err) {
//                 res.write('something wrong, status 500')
//                 res.end()
//             }
//             break
//         }
//         default: {
//             res.write('404 not found')
//             res.end()
//         }
//     }
// })
// server.listen(3003)