import {Person} from "./Person.js";
export class Staff extends Person {
    constructor(_id, _fullName, _type, _email, _address) {
        super(_id, _fullName, _type, _email, _address);
    }
    setStaffInfo(_salary, _workdayCount) {
        this.salary = _salary;
        this.workdayCount = _workdayCount;
    }
    calculateSalary() {
        return this.salary * this.workdayCount
    }
    getInfo() {
        let basicInfo =  super.getInfo();
        basicInfo.salary = this.salary;
        basicInfo.workdayCount = this.workdayCount;
        basicInfo.paycheck = this.calculateSalary();
        return basicInfo
    }
}