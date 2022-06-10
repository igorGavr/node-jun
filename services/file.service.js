const fs = require('fs/promises')
const path = require('path')

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json')
// process.cwd() -- этот метод возвращает строку,
// указывающую текущий рабочий каталог процесса node.js.
module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dbPath)  // зчитуємо файл
            return data.toString()        // переводимо в стрінгу
                ? JSON.parse(data.toString()).sort (((a, b) => a.id - b.id)) // якщо дані є то
                : [];                 // парсимо їх і сортуємо якщо немає то повертаємо пустий масив
        }catch (e) {
            console.error(e)
        }
    },
    writer: async (users) => {
        try {
            await fs.writeFile(dbPath, JSON.stringify(users)) //
        }catch (e) {
            console.error(e)
        }
    }
}
