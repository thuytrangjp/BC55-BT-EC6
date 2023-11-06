import {Person} from "./Person.js";
export class Student extends Person {
    constructor(_id, _fullName, _type, _email, _address) {
        super(_id, _fullName, _type, _email, _address);
    }
    setStudentInfo(_mathScore, _physicsScore, _chemicalScore) {
        this.mathScore = _mathScore;
        this.physicsScore = _physicsScore;
        this.chemicalScore = _chemicalScore;
    }
    calculateAverageScore() {
        return (this.mathScore + this.physicsScore + this.chemicalScore) / 3
    }
    getInfo() {
        let basicInfo =  super.getInfo();
        basicInfo.mathScore = this.mathScore;
        basicInfo.physicsScore = this.physicsScore;
        basicInfo.chemicalScore = this.chemicalScore;
        basicInfo.averageScore = this.calculateAverageScore();
        return basicInfo
    }
}