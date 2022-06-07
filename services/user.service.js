function createBillionUsers() {
    console.log(100000)
}

function createUser(name, age) {
    return{
        name,
        age,
        sayHello: () => {
            console.log(`hi im ${name}`)
        }
    }
}

module.exports = {
    createUser
}

createBillionUsers()
