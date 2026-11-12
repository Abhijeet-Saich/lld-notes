


class Animal{

    constructor(color, weight){
        this.color = color
        this.weight = weight
    }

    makeSound(){
        throw new Error("HOHOHO!!")
    }
}

class Dog extends Animal{

    constructor(color, weight, sound){
        super(color, weight)
        this.sound = sound
    }

    makeSound(){
        console.log(`Dog makes sound of ${this.sound}`)
    }

}

// let d1 = new Dog("Golden", 100, 'Bow Bow')
// console.log(d1)
// d1.makeSound()

// let a1 = new Animal("black", 200)
// console.log(a1)
// a1.makeSound()



class Notification {
  constructor(to, message) {
    if (new.target === Notification) {
      throw new Error("Notification is abstract; use a subclass");
    }
    this.to = to;
    this.message = message;
  }

  send() {                          // children MUST override this
    throw new Error("Subclass must implement send()");
  }

  preview() {                       // children inherit this as-is
    return `To ${this.to}: ${this.message}`;
  }
}

class EmailNotification extends Notification {
  constructor(to, message, subject) {
    super(to, message);             // parent sets to/message first
    this.subject = subject;         // only now is `this` usable
  }
  send() {
    return `Email to ${this.to} [${this.subject}]: ${this.message}`;
  }
}

class SMSNotification extends Notification {
  // no constructor written → JS adds one that calls super(...args)
  send() {
    return `SMS to ${this.to}: ${this.message.slice(0, 160)}`;
  }
}

class PushNotification extends Notification {
  send() {
    return `Push to ${this.to}: ${this.message}`;
  }
}

class WhatsappNotification extends Notification {
    constructor(to, message){
        if(to[0] !== '+') throw new Error("Invalid contact")
        super(to, message)
    }
    send() {
        return `Whatsapp to ${this.to} : ${this.message}`
    }
}


class NotificationFactory {
  static #registry = {
    email: EmailNotification,
    sms: SMSNotification,
    push: PushNotification,
  };

  static register(type, cls){
    console.log('registering', Notification.isPrototypeOf(cls))
    if(Notification.isPrototypeOf(cls)){
        NotificationFactory.#registry[type] = cls
    }
  }

  static create(type, ...args) {
    const Cls = NotificationFactory.#registry[type];
    if (!Cls) throw new Error(`Unknown type: ${type}`);
    return new Cls(...args);        // a class is just a value you can store
  }
}

NotificationFactory.register('whatsapp', WhatsappNotification)

// The caller never writes `new` and never names a concrete class
const userPrefs = ["email", "sms", 'whatsapp'];
for (const type of userPrefs) {
  const n = NotificationFactory.create(type, "+asha", "Report ready", "Update");
  console.log(n.send());            // polymorphism: each one sends its own way
}