import { useEffect, useState } from "react"

import Form from "./class/Form"
import { FormDSL, FormOption } from "./form.types"
import FormNode from "./class/FormNode"

import classes from './form.module.scss'
// 声明文件
// declare module "*.scss" {
//     const scss: Record<string, string>
//     export default scss
// }
export const FormRender = ({ form }: {form: Form}) => {
    const node = form.getRoot()

    return <FormNodeRender node={ node }></FormNodeRender>
}

const FormNodeRender = ({node}: { node: FormNode}) => {

    const type = node.getType(),
        label = node.getProp('label') as string,
        options = node.getProp('options') as FormOption[],
        path = node.getPath(),
        [defaultValue, setDefaultValue] = useState(node.getVal()),
        [actived, setActived] = useState(node.getActived()),
        [ver, setVer] = useState(0)

    node.on('data-change', function(val){
        setDefaultValue(val)
        setVer(ver + 1)
    })
   
    node.on('active-change', function(val){
        setActived(val)
    })
    if(!actived) return null
    switch(type){
        case 'input': 
            return <div>
                <label>{ label }</label><input type="text" defaultValue={ defaultValue } key={ ver } onChange={ (e) => {
                    console.log(defaultValue, e.target.value, 'change')
                    setDefaultValue(e.target.value)
                    node.onDataChange(e.target.value)
                } }/>
            </div>
        case 'radio': 
            return <div>
                <label>{ label }</label>
                {
                    options.map((item) =>
                        <span key={item.value}>
                            <input type="radio" 
                                id={item.value + ''} 
                                name={path} 
                                value={item.value}
                                checked={ defaultValue === item.value } 
                                onChange={ (e) => {
                                    const val = e.target.value
                                    setDefaultValue(val)
                                    node.onDataChange(val)
                                } }/>
                            <label htmlFor={item.value + ''}>{item.label}</label>
                        </span>)
                }
            </div>
        case 'form': 
            return <form>{ 
                node.getChildren().map((childNode, index) => <FormNodeRender key={ index } node={childNode}></FormNodeRender>)
            }</form>
        case 'branch': 
            return <div className={classes['form-branch']}>{ 
                node.getChildren().map((node, index) => <FormNodeRender key={ index } node={node}></FormNodeRender>)
            }</div>
        case 'form-group':
            return <div className={classes['form-group']}>{ 
                node.getChildren().map((node, index) => <FormNodeRender key={ index } node={node}></FormNodeRender>)
            }</div>
        default: 
            return null
    }
}