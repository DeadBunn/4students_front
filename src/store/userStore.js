import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = localStorage.getItem('token') !== null
        this._role = localStorage.getItem('role')
        this._user = {}
        this._balance = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setRole(role){
        this._role = role
    }

    setBalance(balance){
        this._balance = balance
    }

    setLogin(login){
        this._login = login
    }

    setEmail(email){
        this._email = email
    }

    get email(){
        return this._email
    }

    get balance(){
        return this._balance
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get role(){
        return this._role
    }

    get login(){
        return this._login
    }
}