import React from 'react'
import axios from 'axios'
import './Header/header.css'
import Header from './Header/Header'
import './app.css'
import { useState, useEffect } from 'react'
// import { ToastContainer, toast } from 'react-toastify'

//  npx json-server --watch src/db.json --port 4006 // To create dummy server
function App() {
  const [task, settask] = useState("")
  const [tasksaver, settasksaver] = useState({
    value: ""
  })
  const editbtn = () => {

  }
  const deletebtn = () => {

  }
  const inputvalue = (event) => {
    console.log(event.target.value);
    settasksaver((prevstate) => ({ ...prevstate, [event.target.id]: event.target.value }))
  }
  const submit = () => {
    axios.post("http://localhost:4006/data", tasksaver).then((res) => {
      // toast.success("Successfully Register")
      console.log("Data Sended ");
    }).catch((err) => {
      console.log("error");
    })
  }

  useEffect(() => {
    axios.get("http://localhost:4006/data").then((res) => {
      settask(res.data)
    }).catch((err) => {
      console.log("error a gya bhi");
    })
  }, [])

  return (
    <>
      <Header />

      <section className='mx-auto my-5 rounded-xl p-3 bg-violet-500 min-h-[85vh]' style={{ width: "35%" }}>

        <section className='upper-part'>
          <div className=''>
            <h1 className='mx-2 text-slate-100 font-bold font-serif text-lg mb-2'>TO-Do-Manager/-Manage your tasks at one place</h1>

            <h2 className='mx-2 text-lg font-serif font-bold text-slate-100'>Add a Task</h2>

            <input onChange={inputvalue} id='value' type="text" className='mx-5 w-80 rounded-lg' /> <button onClick={submit} className='bg-violet-400 text-white p-3 py-1 rounded-md'>Save</button>

            <div className='flex mx-5 mt-3 w-96 pb-3 border-b-2 border-black'>
              <input type="checkbox" />
              <p className='mx-3  font-serif'>Show Finished</p>
            </div>
          </div>
        </section>

        <section className='lower-part'>
          <h3 className='font-bold'>Your Tasks</h3>
          {/* =====Task List===== */}
          <div className='mt-3 flex gap-4'>
            <div className='div-text'>
              {
                task && task.map((item) => {
                  return (
                    <>
                      <p>{item.value}</p>
                    </>
                  )
                })
              }
            </div>
            <div className='div-button flex gap-3'>
              <button onClick={editbtn} className='bg-violet-900 text-white p-1 py-1 rounded-md'>Edit</button>
              <button onClick={deletebtn} className='bg-violet-900 text-white p-1 py-1 rounded-md'>Delete</button>
            </div>
          </div>
        </section>



      </section>
    </>
  )
}

export default App