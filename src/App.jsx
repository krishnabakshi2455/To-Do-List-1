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



  const [tasksaver, settasksaver] = useState([{ value: "" }])
  const inputvalue = (event) => {
    console.log(event.target.value);
    settasksaver((prevstate) => ({ ...prevstate, [event.target.id]: event.target.value }))
  }
  /*
  this one  is used for adding new task in the list of tasks
*/
  // =========================================================
  const submit = () => {
    axios.post("http://localhost:4006/data", tasksaver).then((res) => {
      console.log("Data Sended ");
    }).catch((err) => {
      console.log("error");
    })
  }
  /*
  this  function is used to send all data to the server
  */
  // ===========================================

  useEffect(() => {
    axios.get("http://localhost:4006/data").then((res) => {
      settask(res.data)
    }).catch((err) => {
      console.log("error a gya bhi");
    })
  }, [])
  /*
  here we are getting data from the server and setting it to the state using useeffect hook
  [] means that this will run only once so no need to rerender again and again if there is any change in the data
  [] means that we want to run this code only once so we can write anything inside the useffect hook
  */
  // ==========================================================
  

  const [check2Visible, setCheck2Visible] = useState();
  const handleCheckbox = (event, itemId) => {
    const isChecked = event.target.checked;
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
  /*
  This function handles checkbox click events. It adds or removes "line-through" class from task elements depending on whether they were checked or unchecked
  This function is used to check whether task is done or not by adding "line-through" class in css when checkbox is checked
  This function will be called when checkbox in front of each task is clicked
  */
  // ==============================================

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
 


  /*
  this function handles the visibility of finished or unfinishied task
  */

  // ================================================================


  const deletebtn = (eventId) => {
    // Assuming eventId is the identifier of the task  to be deleted
    axios.delete(`http://localhost:4006/data/${eventId}`)
      .then((res) => {
        // Assuming the server responds with a success message upon successful deletion
        alert("Task Deleted Successfully!");
      })
      .catch((err) => {
        // Log any errors that occur during the request
        console.error("Error deleting task:", err);
        // Optionally, display an error message to the user
        alert("Failed to delete task. Please try again later.");
      });
  };
  /*
  I changed the function parameter to eventId to make it clear that it represents the identifier of the task you want to delete.
I used string interpolation (${}) to construct the URL, which is a cleaner and more readable way to concatenate strings and variables.
I added error handling for the catch block to log any errors that occur during the request and provide feedback to the user in case of failure
  */
// =======================================================================


  return (
    <>
      <Header />

      <section className='mx-auto my-5 rounded-xl p-3 bg-violet-500 min-h-[85vh] sec-1'>

        <section className='upper-part'>
          <div className=''>
            <h1 className='mx-2 text-slate-100 font-bold font-serif text-lg mb-2 sub-heading'>TO-Do-Manager/-Manage your tasks at one place</h1>

            <h2 className='mx-2 text-lg font-serif font-bold text-slate-100'>Add a Task</h2>

            <input onChange={inputvalue} id='value' type="text" className='mx-5 w-80 rounded-lg input-main' /> <button onClick={submit} className='bg-violet-400 text-white p-3 py-1 rounded-md save-btn'>Save</button>
          </div>
        </section>

        <section className='lower-part'>
          <div className='flex mx-5  w-96 pb-3 border-b-2 border-black check-div'>
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