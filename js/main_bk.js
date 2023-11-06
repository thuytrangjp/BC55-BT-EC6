//
// await renderList();
// getElm("typeInput").addEventListener("change", () => renderExtraQuestions())
// getElm("add-btn").addEventListener("click", () => showValuesToFields())
// getElm("submit-btn").addEventListener("click", () => {
//     let obj = getRegisteredValues();
//     console.log(obj)
//     if (!obj.id) {
//         createUser(obj).then(r => document.getElementsByClassName("close")[0].click());
//     } else {
//         updateUser(obj).then(r => document.getElementsByClassName("close")[0].click());
//     }
// })
//
// function getElm(selector){
//     return document.getElementById(selector);
// }
// function setElm(selector, value){
//     document.getElementById(selector).value = value;
// }
// function getRegisteredValues() {
//     return {
//         id: getElm("idReadOnly").value,
//         fullName: getElm("fullNameInput").value,
//         address: getElm("addressInput").value,
//         email: getElm("emailInput").value,
//         type: getElm("typeInput").value,
//         mathScore: getElm("mathScoreInput").value,
//         physicsScore: getElm("physicsScoreInput").value,
//         chemicalScore: getElm("chemicalScoreInput").value,
//         salary: getElm("salaryInput").value,
//         workdayCount: getElm("workdayCountInput").value,
//         companyName: getElm("companyNameInput").value,
//         orderPrice: getElm("orderPriceInput").value,
//         reviewRating: getElm("reviewRatingInput").value
//     }
// }
//
// function getNullValues() {
//     return {
//         id: null,
//         fullName: null,
//         address: null,
//         email: null,
//         type: '',
//         mathScore: null,
//         physicsScore: null,
//         chemicalScore: null,
//         salary: null,
//         workdayCount: null,
//         companyName: null,
//         orderPrice: null,
//         reviewRating: null,
//     }
// }
//
// function showValuesToFields(obj) {
//     obj = obj ? obj : getNullValues();
//     setElm("idReadOnly", obj.id);
//     setElm("fullNameInput", obj.fullName);
//     setElm("addressInput", obj.address);
//     setElm("emailInput", obj.email);
//     setElm("typeInput", obj.type);
//     setElm("mathScoreInput", obj.mathScore);
//     setElm("physicsScoreInput", obj.physicsScore);
//     setElm("chemicalScoreInput", obj.chemicalScore);
//     setElm("salaryInput", obj.salary);
//     setElm("workdayCountInput", obj.workdayCount);
//     setElm("companyNameInput", obj.companyName);
//     setElm("orderPriceInput", obj.orderPrice);
//     setElm("reviewRatingInput", obj.reviewRating);
//     renderExtraQuestions();
// }
//
// function validation(obj) {
//     // Validation
//     return obj;
// }
//
// function renderExtraQuestions() {
//     let type = getElm("typeInput");
//     function showQuestions(showStudentQ, showStaffQ, showCustomerQ) {
//         let studentQ = getElm("studentQ");
//         let staffQ = getElm("staffQ");
//         let customerQ = getElm("customerQ");
//         showStudentQ ? studentQ.classList.remove("hidden") : studentQ.classList.add("hidden");
//         showStaffQ ? staffQ.classList.remove("hidden") : staffQ.classList.add("hidden");
//         showCustomerQ ? customerQ.classList.remove("hidden") : customerQ.classList.add("hidden");
//     }
//     switch (type.value) {
//         case "student": showQuestions(true, false, false); break;
//         case "staff": showQuestions(false, true, false); break;
//         case "customer": showQuestions(false, false, true); break;
//         default: showQuestions(false, false, false); break;
//     }
// }
//
// function renderModal(user) {
//     if (!user || !user.id){
//         showValuesToFields();
//     }
// }
//
// function renderNoDataList(parentElm) {
//     let appendData = ``;
//     appendData +=
//         `
//             <h4 class="text-center" style="margin: 20px auto">No Matched Data</h4>
//         `
//     parentElm.innerHTML = appendData;
// }
//
// async function renderList(filterValues) {
//     let listBody = getElm("record-list");
//
//     let result = await getUserList();
//     let users = result ? result.data : null;
//
//     if (users.length <= 0 || !users) return renderNoDataList(listBody);
//
//     let appendData = ``;
//     for (let i = 0; i < users.length; i++) {
//         appendData +=
//             `
//                 <tr>
//                     <td>${users[i].id}</td>
//                     <td>${users[i].type.charAt(0).toUpperCase() + users[i].type.slice(1)}</td>
//                     <td>${users[i].fullName}</td>
//                     <td>${users[i].address}</td>
//                     <td>${users[i].email}</td>
//                     <td>
//                         <button id='edit-btn-${i + 1}' class='btn-orange' data-toggle='modal'
//                                 data-target='#exampleModal'
//                                 >Edit</button>
//                         <button id='delete-btn-${i + 1}' class='btn-red'
//                                 >Del</button>
//                     </td>
//                 </tr>
//             `;
//     }
//     listBody.innerHTML = appendData;
//
//     for (let i = 0; i < users.length; i++) {
//         getElm(`edit-btn-${i + 1}`)
//             .addEventListener("click", (
//             ) => {
//                 getUser(users[i]);
//             })
//         getElm(`delete-btn-${i + 1}`)
//             .addEventListener("click", (
//             ) => {
//                 deleteUser(users[i])
//             })
//     }
// }
// function submitData(data) {
//     if (!data.id) {
//         return createUser(data);
//     } else {
//         return updateUser(data);
//     }
// }
// function getUserList() {
//     return Axios.getUsers();
// }
// async function createUser(obj) {
//     let result = await Axios.postUser(obj);
//     return renderList();
// }
// async function getUser(obj) {
//     let result = await Axios.getUser(obj);
//     return showValuesToFields(result.data);
// }
// async function updateUser(obj) {
//     await Axios.putUser(obj);
//     return renderList();
// }
// async function deleteUser(obj) {
//     await Axios.deleteUser(obj);
//     return renderList();
// }