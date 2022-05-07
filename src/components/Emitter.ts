type Topic = string|number
type Handler = (...args: any[]) => void
export class Emitter {
    private _handles: Map<Topic, Handler[]> = new Map()
 
    public on(topic: Topic, hanlder: Handler){
        if(!this._handles.has(topic)){
            this._handles.set(topic, [])
        }
        this._handles.get(topic)?.push(hanlder)
    }

    public emit(topic: Topic, ...data: any[]){
        if(this._handles.has(topic)){
            this._handles.get(topic)?.forEach(handler => handler(...data))
        }
    }
}