
class Fruit{

    static #ripe = false

    constructor(name){
        this.name = name
    }
}

let f1  = new Fruit("Apple")

console.log(f1.name, Fruit.ripe)