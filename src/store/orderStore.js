import {makeAutoObservable} from "mobx";

export default class OrderStore {
    constructor() {
        this._types = []
        
        this._devices = []
        this._selectedType = {}
        this._selectedTegs = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    
    setDevices(devices) {
        this._devices = devices
    }


    get types() {
        return this._types
    }
    
    get devices() {
        return this._devices
    }
    
}