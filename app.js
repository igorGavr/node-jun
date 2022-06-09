const fs = require('fs')

fs.readFile('t1.txt', 'utf-8', (err, data) => {
    console.log(data)
})
let text = fs.readFileSync('t1.txt', 'utf-8')
console.log(text)
console.log('--------')
//
//
// const logTime = () => {
//   return new Date()
// }
// const x = () => {
//     console.log('sdfsf')
// }
// fs.appendFile('readme.log', logTime()+' hahah'+'\n', err => {
//     console.log(err)
// })
//
//
// x()


// const arg = process.argv
// const a = +arg[2]
// const b = +arg[3]
// if (a>b){
//     console.log(a)
// }else {
//     console.log(b)
// }










