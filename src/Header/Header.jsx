import React from 'react'

function Header() {
    return (
        <>
            <section >
                    <nav className='flex justify-around text-white py-1 bg-violet-800'>
                   
                    <div className="logo">
                        <span className='font-bold  text-xl'>Task Manager</span>
                    </div>
                    
                    <ul className="flex gap-8 ">
                        <li className='cursor-pointer hover:font-bold transition-all'>
                            Home
                        </li>

                        <li className='cursor-pointer hover:font-bold transition-all '>
                            Your Tasks
                        </li>
                    </ul>
                </nav>
            </section>




        </>
    )
}

export default Header