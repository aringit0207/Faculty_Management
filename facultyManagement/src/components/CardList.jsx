import React from 'react'
import Card from './Card'
import {useEffect, useState} from 'react'
import { useNavigate , Link} from 'react-router-dom';

const CardList = ({data}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [id, setId] = useState(localStorage.getItem("id"))

  useEffect(() => {
    if(!email || !id) navigate('/login')
  },[email])

  return (
    <div> 
     <div>
     {
        email && <div>
            email: {email}
            <button onClick={()=>{
              localStorage.setItem("email", "")
              localStorage.setItem("id", "")
              setEmail("")
            }}>Logout</button>
        </div>
      }
      {
        email && email === "vandantiwari@gmail.com" && <Link to={'/register'}>
              Register a new Faculty
          </Link>
      }
      </div>
      <div className='flex flex-wrap items-center justify-between max-w-4xl mx-auto grow p-12 gap-8'>
       {
         data.map(faculty => <Card key={faculty.faculty_id} img={faculty.profilePic} name={faculty.name} designation={faculty.designation} faculty_id={faculty.faculty_id} />)
       }
    </div>
    </div>
  )
}

export default CardList