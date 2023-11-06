
import {Person} from "./Person.js";
export class Customer extends Person {
    constructor(_id, _fullName, _type, _email, _address, _mathScore) {
        super(_id, _fullName, _type, _email, _address);
    }
    setCustomerInfo(_companyName, _orderPrice, _reviewRating) {
        this.companyName = _companyName;
        this.orderPrice = _orderPrice;
        this.reviewRating = _reviewRating;
    }
    getInfo() {
        let basicInfo =  super.getInfo();
        basicInfo.companyName = this.companyName;
        basicInfo.orderPrice = this.orderPrice;
        basicInfo.reviewRating = this.reviewRating;
        return basicInfo
    }
}

