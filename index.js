// const fs = require('fs')
// const path = require("path");
//
// const sortFolder = (read, gender, write) => {
//     // path.join(__dirname, read) -- путь к каталогу, из
//     //                              которого нужно прочитать содержимое
//     fs.readdir(path.join(__dirname, read), (err, files) => {
//         if (err) return console.log(err)
//     // files -- это массив объектов String, Buffer
//     //          или fs.Dirent, содержащих файлы в каталоге.
//         files.forEach((file) => {
//             const readFolderPath = path.join(__dirname, read, file)
//             // console.log(__dirname+'./boys/'+file)
//             // console.log(path.join(__dirname, 'boys', file))
//             fs.readFile(readFolderPath, (err, data) => {
//                 if (err) return console.log(err)
//
//                 const user = JSON.parse(data.toString())
//
//                 if (user.gender === gender) {
//                     fs.rename(readFolderPath, path.join(__dirname, write, file), err => {
//                         console.log(err)
//                     })
//                 }
//             })
//         })
//
//     })
// }
// sortFolder('girls', 'male', 'boys')
// sortFolder('boys', 'female', 'girls')

// promises
const fs = require('fs/promises')
const path = require('path')

const sortFolder = async (read, gender, write) => {
    try {
        const files = await fs.readdir(path.join(__dirname, read))

        for (const file of files) {
            const readFolderPath = path.join(__dirname, read, file)
            const data = await fs.readFile(readFolderPath)
            const user = JSON.parse(data.toString())

            if (user.gender === gender) {
                await fs.rename(readFolderPath, path.join(__dirname, write, file))
            }
        }
    }catch (e) {
        console.error(e)
    }
}

sortFolder('girls', 'male', 'boys')
sortFolder('boys', 'female', 'girls')
