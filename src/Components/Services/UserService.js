import * as employeeservice from './EmployeService';
import * as candidatservices from './CandidatService'
import {useState} from 'react' 
const KEYS = {
    users: 'users',
    userId: 'userId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertUser(data) {
    let users = getAllUsers();
    data['id'] = generateUserId()
    users.push(data)
    localStorage.setItem(KEYS.users, JSON.stringify(users))
}

export function generateUserId() {
    if (localStorage.getItem(KEYS.userId) == null)
        localStorage.setItem(KEYS.userId, '0')
    var id = parseInt(localStorage.getItem(KEYS.userId))
    localStorage.setItem(KEYS.userId, (++id).toString())
    return id;
}
export function updateUser(data) {
    let users = getAllUsers();
    let recordIndex = users.findIndex(x => x.id === data.id);
    users[recordIndex] = { ...data }
    localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function deleteUser(id) {
    let users = getAllUsers();
    users = users.filter(x => x.id !== id)
    localStorage.setItem(KEYS.users, JSON.stringify(users))
}
function Adduser (emp) {
    const[users,Setusers] =useState([])
    for (let i = 0; i < emp.length; i++) {
        Setusers([...users,emp[i]]);}
    return (users)
}
export function getAllUsers() {
     let emp =employeeservice.getAllEmployees()
     let cand = candidatservices.getAllCandidats()
      
     var users= Adduser(emp);
     return (users.map(x =>({
        ...x,
       }))
     
    )
}