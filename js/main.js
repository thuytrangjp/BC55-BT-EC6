import UserList from './models/UserList.js';

let userList = new UserList("record-list", "add-btn", "search-btn", "sort-btn", "submit-btn");
await userList.importUsers();