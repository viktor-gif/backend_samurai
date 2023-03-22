const http = require('http')
const fs = require('fs')
const { deflateRawSync } = require('zlib')
const { createCipheriv } = require('crypto')

let requestCount = 0

const server = http.createServer(async (req, res) => {

    if (!req.url.includes('favicon.ico')) {
        requestCount++
    }

    const delay = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, ms) 
        })
    }
    const readFile = (path) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    resolve(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    switch (req.url) {
        
        case '/home':
            const data = await readFile('./pages/home.html')
            try {
                res.write(data)
                res.end()
            } catch (err) {
                res.write(err.message)
                res.end()
            }
            
            // fs.readFile('./pages/home.html', (err, data) => {
            //     if (err) {
            //         res.write(err.message)
            //     } else {
            //         res.write(data)
            //     }
            //     res.end()
            // })
            break
        case '/about':
            await delay(3000)
            res.write('THIS IS ABOUT PAGE')
            res.end()
            break
        
        // case '/students':
        //     res.write('STUDENTS')
        //     break
        // case '/':
        //     res.write('IT-kamasutra: ' + requestCount)
        //     break
        // case '/courses':
        //     res.write('FRONT + BACK')
        //     break

        default:
            res.write('404 not found')
            res.end()
    }
    

    // console.log('req.url ' + req.url)

})

server.listen(3004)

