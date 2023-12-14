import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = localStorage.getItem('token') !== null
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}