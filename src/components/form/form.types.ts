import Form from "./class/Form"

export type FormDSL = {
    type: string,
    defaultVal?: FormVal,
    path?: FormPath,
    children?: FormDSL[],
    // path: string, value: any, 
    active?: (context: Form) => number,
    props?: {
        label?: string,
        options?: FormOption[],
    }
}
export type FormPath = (string|number)[]
export type FormVal = string|number
export type FormOption = {value: string|number, label: string}
export type FormProp = 'label'|'options'|'active'