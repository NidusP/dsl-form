import { Emitter } from './../../Emitter';
import FormNode from "./FormNode";
import type { FormDSL, FormPath } from "../form.types"
import { Map, fromJS } from 'immutable'
export default class Form extends Emitter{
    private _root: FormNode
    private _data: Map<string, any> = Map({})
    constructor(dsl: FormDSL){
        super()
        this._root = FormNode.fromDSL(dsl, this)
    }

    public getRoot(){
        return this._root
    }

    public getValues(){
        return this._data.toJS()
    }


    public getValueByPath(path:FormPath){
        return this._data.getIn(path) as string|number
    }
    public setValues(vals: any){
        const data = fromJS(vals) as Map<string, any>
        this._root.updated(data)
    }

    public onDataChange(path: FormPath, val: any){
        // this._data.set(path.join('.'), val)
        this._data = this._data.setIn(path, val)
        this.emit('data-change', path.join(','))
    }
}


