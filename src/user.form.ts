import { FormPath } from './components/form/form.types';
import { FormDSL } from "./components/form"
import Form from './components/form/class/Form';

const form : FormDSL = {
    type: 'form',
    children: [{
        type: 'form-group',
        children: [{
            type: 'input',
            path: ['basic', 'username'],
            defaultVal: 'lisa',
            props: {
                label: '姓名'
            }
        },{
            type: 'radio',
            path: ['basic', 'sex'],
            defaultVal: 'man',
            props: {
                label: '性别',
                options: [
                    { value: 'man', label: '男' },
                    { value: 'woman', label: '女' },
                ]
            }
        }]
    },{
        type: 'form-group',
        // {
        //     type: 'textarea',
        //     path: ['product', 'detail']
        // },
        children: [{
            type: 'branch',
            // , context: Form
            active(context: Form){
                return context.getValueByPath(['basic', 'sex']) === 'man' ? 0 : 
                context.getValueByPath(['basic', 'sex']) === 'woman' ? 1 : -1 
                // if(path === 'basic.sex'){
                //     // 0 -> man display color  1 -> woman display shape
                //     // context.props.update('dispalyIndex', value)
                //     return value === 'man' ? 0 : 
                //     value === 'woman' ? 1 : -1 
                // }
                // return -1
            },
            props: {
                
            },
            // hooks: {
            //     ondatachange(key: string, value: any, context: any){
            //         if(key === 'basic.sex'){
            //             // 0 -> man display color  1 -> woman display shape
            //             context.props.update('dispalyIndex', value)
            //         }
            //     }
            // },
            children: [{
                type: 'radio',
                path: ['product', 'color'],
                props: {
                    label: '颜色',
                    options: [
                        { value: 'red', label: '红色' },
                        { value: 'blue', label: '蓝色' },
                    ]
                }
            },{
                type: 'radio',
                path: ['product', 'shape'],
                props: {
                    label: '形状',
                    options: [
                        // box
                        { value: 'rectangle', label: '矩形' },
                        { value: 'circle', label: '圆形' },
                    ]
                }
            }]
        }]
    }]
}
export default form