import React from 'react'
import axios from 'axios'
import './Header/header.css'
import Header from './Header/Header'
import './app.css'
import { useState, useEffect } from 'react'
// const { v4: uuidv4 } = require('uuid');
// import { ToastContainer, toast } from 'react-toastify'

//  npx json-server --watch src/db.json --port 4006 // To create dummy server
function App() {
  const [task, settask] = useState("")


  const editbtn = () => {

  }
  const deletebtn = () => {
    document.getElementById('task-div').style.display = 'none';
  }

  const [tasksaver, settasksaver] = useState([{ value: "" }])
  const inputvalue = (event) => {
    console.log(event.target.value);
    settasksaver((prevstate) => ({ ...prevstate, [event.target.id]: event.target.value }))
  }
  const submit = () => {
    axios.post("http://localhost:4006/data", tasksaver).then((res) => {
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

  // ==========================================================
  

  const [check2Visible, setCheck2Visible] = useState();
  const handleCheckbox = (event, itemId) => {
    const isChecked = event.target.checked;
    setCheck3Visible(isChecked)
    const element = document.getElementById(`namecheck_${itemId}`);   
    const element2 = document.getElementById(`namecheck2_${itemId}`);
    setCheck2Visible(element2);
    if (element) {
      if (isChecked) {
        element.classList.add('line-through');
        console.log("Task completed")
        element2.style.display='none'
      } else {
        element.classList.remove('line-through');
        console.log("Task pending");
      }
    }
  };

  const finishedornot = (event) => {
    const isChecked = event.target.checked
    console.log('checked-in',isChecked);
    if (check2Visible) {
      if (isChecked) {
        check2Visible.style.display='flex';
      } else {
        check2Visible.style.display='none';
      }
    }

  }

  // ================================================================




  return (
    <>
      <Header />

      <section className='mx-auto my-5 rounded-xl p-3 bg-violet-500 min-h-[85vh]' style={{ width: "35%" }}>

        <section className='upper-part'>
          <div className=''>
            <h1 className='mx-2 text-slate-100 font-bold font-serif text-lg mb-2'>TO-Do-Manager/-Manage your tasks at one place</h1>

            <h2 className='mx-2 text-lg font-serif font-bold text-slate-100'>Add a Task</h2>

            <input onChange={inputvalue} id='value' type="text" className='mx-5 w-80 rounded-lg' /> <button onClick={submit} className='bg-violet-400 text-white p-3 py-1 rounded-md'>Save</button>
          </div>
        </section>

        <section className='lower-part'>
          <div className='flex mx-5  w-96 pb-3 border-b-2 border-black'>
            <input type="checkbox" onChange={finishedornot} />
            <p className='mx-3  font-serif'>Show Finished</p>
          </div>
          <h3 className='font-bold mt-4'>Your Tasks</h3>
          {/* =====Task List===== */}
          <div className='mt-3 flex gap-4'>
            <div className='div-text'>
              {
                task && task.map((item) => {
                  return (
                    <>

                      <div className='mt-3 flex gap-4'>
                        <div className='div-text'>
                    
                          <div key={item.id} id={`namecheck2_${item.id}`} className='flex gap-4'>
                              <div>
                                <input onChange={(e) => handleCheckbox(e, item.id)} type="checkbox" />
                              </div>

                              <div id={`namecheck_${item.id}`}>{item.value}</div>
                              <div >{item.id}</div>
                              <div className='buttons flex gap-4'>
                                <button onClick={() => editbtn(item.id)} className='bg-violet-900 text-white p-1 py-1 rounded-md'>Edit</button>
                                <button onClick={() => deletebtn(item.id)} className='bg-violet-900 text-white p-1 py-1 rounded-md'>Delete</button>
                              </div>
                            </div>
    
                        </div>
                      </div>
                      {/* ================================================================================= */}


                      {/* I modified the handleCheckbox function to accept itemId as a parameter so that we can identify the specific item.
                      
                      I added unique identifiers to the id attribute of the <div> elements using the itemId. This ensures that each <div> has a unique id.
                      
                      The handleCheckbox function now uses document.getElementById with the dynamically generated id to target the specific <div> element associated with the checkbox.
                      
                      Now, the 'line-through' class will be applied or removed for each item individually based on whether its checkbox is checked or not. */}
                      {/* ================================================================================= */}
                    </>
                  )
                })
              }
            </div>
          </div>
        </section>



      </section>
    </>
  )
}

export default App