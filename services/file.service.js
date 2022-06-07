const fs = require('fs')

// // дописати в файл
// fs.appendFile('./data.txt', 'hello', err => {
//     if (err) {
//         console.log(err)
//     }
// })

// // чистимо файл і записуємо нову інфу
// fs.writeFile('./data.txt', 'hello іва', err => {
//     if (err) {
//         console.log(err)
//     }
// })


// fs.readFile('./data.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(data)
//     console.log(data.toString())
// })

// fs.readdir('./', (err, files) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//
//     for (const file of files) {
//         console.log(file)
//         console.log(`./${file}`)
//
//         fs.stat(`./${file}`, (err1, stats) => {
//             console.log(stats.isFile(), 'stats.isFile()')
//             console.log(stats.isDirectory(), 'stats.isDirectory()')
//         })
//         // fs.readFile(`./services/${file}`, (err1, data) => {
//         //     if (err1) {
//         //         console.log(err1)
//         //         return
//         //     }
//         //     console.log(data.toString())
//         // })
//     }
// })

// fs.mkdir('./utils', err => {
//     err && console.log(err)
// })

// fs.rename('./services/toMove.js', './utils/helloWorld.txt', err => {
//     err && console.log(err)
// })

const stream = fs.createReadStream('./utils/hello.txt')
const writeStream = fs.createWriteStream('./utils/hello3.txt')

// stream.on('data', chunk => {
//     console.log(chunk)
//     console.log('----=-=-=-')
//
//     writeStream.write(chunk)
// })
//
// stream.on('end', () => {
//     console.log('file done')
// })

stream.pipe(writeStream)
