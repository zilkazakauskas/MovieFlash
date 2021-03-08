const singleton = Symbol();
const singletonEnforcer = Symbol()

class CartStorage {
    #itemName = '';

    constructor(enforcer) {
        if (enforcer != singletonEnforcer) throw "Cannot construct singleton";
    }

    static instance(itemName) {
        if (typeof itemName === 'string') {
            if (itemName.trim() === '') {
                throw 'Storage name is empty!'
            } else if (!this[singleton]) {
                this[singleton] = new CartStorage(singletonEnforcer);
                this[singleton].#itemName = itemName;
            }
        } else if (typeof myVar !== 'undefined') {
            throw `Type of 'itemName' is not allowed!`;
        }
        if (!this[singleton]) {
            throw `TypeCart have no instance!`;
        }
        return this[singleton];
    }

    get store() {
        const itemName = this.#itemName;
        const storageData = localStorage.getItem(itemName);
        return storageData ? JSON.parse(storageData) : {};
    }

    set store(tickets) {
        const itemName = this.#itemName
        localStorage.setItem(itemName, JSON.stringify(tickets));
    }

    setItem(key, value) {
        const tickets = this.store;
        tickets[key] = value;
        this.store = tickets;
    }

    getValue(key) {
        const tickets = this.store;
        return tickets[key];
    }

    removeItem(key) {
        const tickets = this.store;
        delete tickets[key];
        this.store = tickets;
    }
}

export default CartStorage