import { useState } from 'react'
import './App.css'
import { FormRender, useForm } from './components/form'
import userForm from './user.form'

function App() {
  // const [count, setCount] = useState(0)
  const form = useForm(userForm)
  return (
    <div className="App">
      <h1>app</h1>
      <FormRender form={ form }></FormRender>
      <button onClick={ () => console.log(form.getValues()) }>submit</button>
      <button onClick={ () => form.setValues({
        basic: {
          username: 'username',
          sex: 'woman'
        },
        product: {
          shape: 'circle'
        }
      }) }>reset</button>
    </div>
  )
}

export default App
