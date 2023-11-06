import Axios from "../services/api.js";
import {Staff} from "./Person/Staff.js";
import {Student} from "./Person/Student.js";
import {Customer} from "./Person/Customer.js";

function getElm(selector){
    return document.getElementById(selector);
}

function setElm(selector, value){
    document.getElementById(selector).value = value;
}
export default class UserList {
    constructor(_listElm, _addBtnElm, _searchBtnElm, _sortBtnElm, _submitBtnElm) {
        this.currentList = [];
        this.listElm = getElm(_listElm)
        this.addBtnElm = getElm(_addBtnElm);
        this.searchBtnElm = getElm(_searchBtnElm);
        this.sortBtnElm = getElm(_sortBtnElm);
        this.submitBtnElm = getElm(_submitBtnElm);
        this.currentModal = new UserModal(this, this.submitBtnElm)
        this.setup()
    }
    
    setup() {
        this.addBtnElm.addEventListener("click", () => {
            return this.currentModal.setValues();
        })
        this.searchBtnElm.addEventListener("click", () => {
            let value = getElm("filterByType").value;
            return this.filterByType(value);
        })
        this.sortBtnElm.addEventListener("click", () => {
            if (
                !this.sortBtnElm.getAttribute("state") ||
                this.sortBtnElm.getAttribute("state") === "false"
            ){
                this.sortBtnElm.setAttribute("state", "true")
                this.sortBtnElm.innerText = "Sort Z to A"
            } else {
                this.sortBtnElm.setAttribute("state", "false");
                this.sortBtnElm.innerText = "Sort A to Z"
            }
            return this.sortByName(this.sortBtnElm.getAttribute("state"));
        })
    }
    async importUsers() {
        let result = await this.getUserList();
        let usersValues = result.data;
        let userList = [];
        for (let i = 0; i < usersValues.length; i++) {
            let userRecord = this.checkType(usersValues[i]);
            userList.push(userRecord);
        }
        this.currentList = userList;
        return this.renderList(this.currentList);
    }

    checkType(user) {
        let userInstance;
        switch (user.type) {
            case "staff":
                userInstance = new Staff(user.id, user.fullName, user.type, user.email, user.address);
                userInstance.setStaffInfo(user.salary, user.workdayCount);
                break;
            case "student":
                userInstance = new Student(user.id, user.fullName, user.type, user.email, user.address);
                userInstance.setStudentInfo(user.mathScore, user.physicsScore, user.chemicalScore);
                break;
            case "customer":
                userInstance = new Customer(user.id, user.fullName, user.type, user.email, user.address);
                userInstance.setCustomerInfo(user.companyName, user.orderPrice, user.reviewRating);
                break;
            default:
                return null;
        }
        return userInstance.getInfo();
    }

    getUserList() {
        return Axios.getUsers();
    }


    async deleteUser(obj) {
        await Axios.deleteUser(obj);
        this.currentList = this.currentList.filter(user => user.id !== obj.id)
        return this.renderList(this.currentList);
    }

    renderNoDataList(parentElm) {
        let appendData = ``;
        appendData +=
            `
            <h4 class="text-center" style="margin: 20px auto">No Matched Data</h4>
        `
        parentElm.innerHTML = appendData;
    }

    async filterByType(_type) {
        let currentUsers = await this.getUserList();
        if (_type){
            this.currentList = currentUsers.data.filter(user => user.type === _type);
        } else {
            this.currentList = currentUsers.data;
        }
        return this.renderList(this.currentList);
    }

    sortByName(isAsc = "true") {
        let currentUsers = [...this.currentList];
        for (let i = 0; i < currentUsers.length; i++) {
            for (let j = i + 1; j < currentUsers.length; j++) {
                let thisName = currentUsers[i].fullName.toLowerCase();
                let nextName = currentUsers[j].fullName.toLowerCase();
                if (thisName.charCodeAt(0) > nextName.charCodeAt(0)) {
                    let tempElm = {...currentUsers[j]};
                    currentUsers[j] = {...currentUsers[i]};
                    currentUsers[i] = {...tempElm};
                }
            }
        }

        this.currentList = (isAsc === "true") ? currentUsers : currentUsers.reverse();

        return this.renderList(currentUsers);
    }

    async renderList(filteredList) {
        let listBody = this.listElm;
        let users;
        if (filteredList) {
            users = filteredList;
        } else {
            let res = await this.getUserList();
            this.currentList = res.data;
            users = this.currentList;
        }
        if (users.length <= 0 || !users) return this.renderNoDataList(listBody);

        let appendData = ``;
        for (let i = 0; i < users.length; i++) {
            if (!users[i]) continue;
            let memo = '';
            switch (users[i].type) {
                case "student": memo = `Average Score is ${Math.round(users[i].averageScore)}`; break;
                case "staff": memo = `This Month Salary is ${new Intl.NumberFormat().format(users[i].paycheck)} VND`; break;
                case "customer": memo = `Company ${users[i].companyName} rated ${users[i].reviewRating}<br>
                                        for the ${new Intl.NumberFormat().format(users[i].orderPrice)} VND order`;break;
                default: memo = '';
            }
            appendData +=
                `
                <tr>
                    <td>${users[i].id}</td>
                    <td>${users[i].type.charAt(0).toUpperCase() + users[i].type.slice(1)}</td>
                    <td>${users[i].fullName}</td>
                    <td>${users[i].address}</td>
                    <td>${users[i].email}</td>
                    <td>${memo}</td>
                    <td>
                        <button id='edit-btn-${users[i].id}' class='btn-orange' data-toggle='modal'
                                data-target='#exampleModal'
                                >Edit</button>
                        <button id='delete-btn-${users[i].id}' class='btn-red'
                                >Del</button>
                    </td>
                </tr>
            `;
        }
        listBody.innerHTML = appendData;

        for (let i = 0; i < users.length; i++) {
            if (!users[i]) continue;
            getElm(`edit-btn-${users[i].id}`)
                .addEventListener("click", (
                ) => {
                    this.currentModal.setValues(true, users[i]);
                })
            getElm(`delete-btn-${users[i].id}`)
                .addEventListener("click", (
                ) => {
                    this.deleteUser(users[i])
                })
        }
    }
}

export class UserModal {
    constructor(_userList, _submitBtn) {
        this.userListInstance = _userList;
        this.submitBtnElm = _submitBtn;
        this.typeInputElm = getElm("typeInput");

        this.id = null;
        this.fullName = null;
        this.address = null;
        this.email = null;
        this.type = '';
        this.mathScore = null;
        this.physicsScore = null;
        this.chemicalScore = null;
        this.salary = null;
        this.workdayCount = null;
        this.companyName = null;
        this.orderPrice = null;
        this.reviewRating = null;

        this.setup()
    }

    setup() {
        this.typeInputElm.addEventListener("change", () => this.renderExtraQuestions());
        this.submitBtnElm.addEventListener("click", () => {
            let obj = this.getRegisteredValues();
            console.log(obj)
            if (!obj.id) {
                this.createUser(obj).then(() =>
                    document.getElementsByClassName("close")[0].click());
            } else {
                this.updateUser(obj).then(() =>
                    document.getElementsByClassName("close")[0].click());
            }
        })
    }

    async getUser(obj) {
        let result = await Axios.getUser(obj);
        return result.data;
    }
    async createUser(obj) {
        await Axios.postUser(obj);
        return this.userListInstance.renderList();
    }
    async updateUser(obj) {
        await Axios.putUser(obj);
        return this.userListInstance.renderList();
    }
    getRegisteredValues() {
        let input = {
            fullName: getElm("fullNameInput").value,
            address: getElm("addressInput").value,
            email: getElm("emailInput").value,
            type: getElm("typeInput").value,
            mathScore: getElm("mathScoreInput").value * 1,
            physicsScore: getElm("physicsScoreInput").value * 1,
            chemicalScore: getElm("chemicalScoreInput").value * 1,
            salary: getElm("salaryInput").value * 1,
            workdayCount: getElm("workdayCountInput").value * 1,
            companyName: getElm("companyNameInput").value,
            orderPrice: getElm("orderPriceInput").value * 1,
            reviewRating: getElm("reviewRatingInput").value * 1
        }

        if (input.type !== "student") {
            input.mathScore = null;
            input.physicsScore = null;
            input.chemicalScore = null;
        }
        if (input.type !== "staff") {
            input.salary = null;
            input.workdayCount = null;
        }
        if (input.type !== "customer") {
            input.companyName = null;
            input.orderPrice = null;
            input.reviewRating = null;
        }

        return this.userListInstance.checkType(input);
    }

    setDefaultValues() {
        setElm("idReadOnly", null);
        setElm("fullNameInput", null);
        setElm("addressInput", null);
        setElm("emailInput", null);
        setElm("typeInput", '');
        setElm("mathScoreInput", null);
        setElm("physicsScoreInput", null);
        setElm("chemicalScoreInput", null);
        setElm("salaryInput", null);
        setElm("workdayCountInput", null);
        setElm("companyNameInput", null);
        setElm("orderPriceInput", null);
        setElm("reviewRatingInput", null);
        this.renderExtraQuestions();
    }

    async setValues(_isEdit = false, _obj = null) {
        this.setDefaultValues();

        if (_isEdit) {
            let obj = await this.getUser(_obj);

            if (obj.type !== "student") {
                obj.mathScore = null;
                obj.physicsScore = null;
                obj.chemicalScore = null;
            }
            if (obj.type !== "staff") {
                obj.salary = null;
                obj.workdayCount = null;
            }
            if (obj.type !== "customer") {
                obj.companyName = null;
                obj.orderPrice = null;
                obj.reviewRating = null;
            }

            setElm("idReadOnly", obj.id);
            setElm("fullNameInput", obj.fullName);
            setElm("addressInput", obj.address);
            setElm("emailInput", obj.email);
            setElm("typeInput", obj.type);
            setElm("mathScoreInput", obj.mathScore);
            setElm("physicsScoreInput", obj.physicsScore);
            setElm("chemicalScoreInput", obj.chemicalScore);
            setElm("salaryInput", obj.salary);
            setElm("workdayCountInput", obj.workdayCount);
            setElm("companyNameInput", obj.companyName);
            setElm("orderPriceInput", obj.orderPrice);
            setElm("reviewRatingInput", obj.reviewRating);
            this.renderExtraQuestions();
        }
    }

    renderExtraQuestions() {
        let type = getElm("typeInput");
        let studentQ = getElm("studentQ");
        let staffQ = getElm("staffQ");
        let customerQ = getElm("customerQ");
        function showQuestions(showStudentQ, showStaffQ, showCustomerQ) {
            showStudentQ ? studentQ.classList.remove("hidden") : studentQ.classList.add("hidden");
            showStaffQ ? staffQ.classList.remove("hidden") : staffQ.classList.add("hidden");
            showCustomerQ ? customerQ.classList.remove("hidden") : customerQ.classList.add("hidden");
        }
        switch (type.value) {
            case "student": showQuestions(true, false, false); break;
            case "staff": showQuestions(false, true, false); break;
            case "customer": showQuestions(false, false, true); break;
            default: showQuestions(false, false, false); break;
        }
    }
}