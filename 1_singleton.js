

class Database{

    static #instance = null

    static getInstance(){
        if(!Database.#instance) Database.#instance = new Database()
        return Database.#instance
    }

    constructor(){
        if(Database.#instance){
            throw new Error("Instance Already Created")
        }
        this.queryCount = 0
    }

    query(sql){
        console.log(`SQL QUERY : ${sql}`)
        this.queryCount++
    }
}

// let c1 = Database.getInstance()
// console.log(c1)
// c1.query("SELECT * FROM ROOMS")
// c1.query("SELECT * FROM USERS")
// let c2 = Database.getInstance()
// console.log(c2, c2 == c1)
// let c3 = new Database()




class Logger{

    static #initialized = false
    #logs = null

    constructor(){
        if(Logger.#initialized){
            throw new Error("Class already initialized!!")
        }
        this.#logs = []
        Logger.#initialized = true
    }

    log(msg){
        this.#logs.push(msg)
        console.log(msg)
    }

    getLogs(){
        return [...this.#logs]
    }

    get count(){
        return this.#logs.length
    }
}


let l1 = new Logger()
console.log(l1, l1.logs)
l1.log("bkl")
l1.log("mkc")
l1.log("tmkoc")
console.log(l1.getLogs(), l1.count)
let l2 = new Logger()