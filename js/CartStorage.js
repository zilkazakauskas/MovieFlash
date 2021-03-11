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
        } else if (typeof itemName !== 'undefined') {
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

    set store(data) {
        const itemName = this.#itemName
        localStorage.setItem(itemName, JSON.stringify(data));
    }

    setItem(key, value) {
        const storageData = this.store;
        storageData[key] = value;
        this.store = storageData;
    }

    getItem(key) {
        const storageData = this.store;
        return storageData[key];
    }

    removeItem(key) {
        const storageData = this.store;
        delete storageData[key];
        this.store = storageData;
    }

    get size() {
        const storageData = this.store;
        const size = Object.keys(storageData).length;
        return size;
    }

    clear() {
        const itemName = this.#itemName
        localStorage.removeItem(itemName);
    }
}

export default CartStorage