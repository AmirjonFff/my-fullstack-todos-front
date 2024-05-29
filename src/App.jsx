import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [issave, setIssave] = useState(true);
  const [id, setId] = useState(null);
  const API = 'https://my-fullstack-todos-api.onrender.com/'

  const getTodos = async () => {
    try {
      const { data } = await axios.get(API);
      setTodos(data);
    } catch (error) { }
  }

  const saveTodos = async (event) => {
    event.preventDefault()
    try {
      if (issave) {
        const { data } = await axios.post(API + 'submit', {
          text
        });
      } else {
        const { data } = await axios.put(API + 'update', {
          _id: id,
          text
        });
        setIssave(true)
      }

      getTodos()
    } catch (error) { }
  }

  const delTodos = async (_id) => {
    try {
      const { data } = await axios.post(API + 'delete', { _id });
      getTodos();
    } catch (error) {

    }
  }

  const compTodos = async (_id) => {
    console.log(_id);
    try {
      const { data } = await axios.put(API + 'updateDone', { _id });
      getTodos()
    } catch (error) { }
  }

  const handleTodos = (el) => {
    setText(el.text)
    setIssave(false)
    setId(el._id)
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <form onSubmit={(e) => saveTodos(e)}>
        <input value={text} onChange={(e) => setText(e.target.value)} type="text" />
        <button>{issave ? 'save' : 'edit'}</button>
      </form>

      <div>
        {todos.map((el) =>
          <div key={el._id}>
            {el.done ?
              <span style={{ color: "red" }}>{el.text}</span>
              : <span>{el.text}</span>
            }
            <button onClick={() => compTodos(el._id)}>comp</button>  <button onClick={() => handleTodos(el)}>edit</button> <button onClick={() => delTodos(el._id)}>del</button></div>
        )}
      </div>
    </>
  )
}

export default App
