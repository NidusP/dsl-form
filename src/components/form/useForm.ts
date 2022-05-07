import { FormDSL } from './form.types';
import Form from "./class/Form"

export const useForm = (dsl:FormDSL) => {
    return new Form(dsl)
}