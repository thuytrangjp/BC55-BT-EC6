export class Person {
    constructor(_id, _fullName, _type, _email, _address) {
        this.id = _id;
        this.fullName = _fullName;
        this.type = _type;
        this.address = _address;
        this.email = _email;
    }

    getInfo() {
        return {
            id: this.id,
            fullName: this.fullName,
            type: this.type,
            address: this.address,
            email: this.email,
        }
    }
}
