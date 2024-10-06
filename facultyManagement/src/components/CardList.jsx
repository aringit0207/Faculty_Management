import React from 'react'
import Card from './Card'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const CardList = ({ data }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [id, setId] = useState(localStorage.getItem("id"))

  useEffect(() => {
    if (!email || !id) navigate('/login')
  }, [email])

  return (
    <div>
      <div className="flex justify-end items-center space-x-4 p-4">
        {email && (
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-800 bg-gray-200 px-3 py-1 rounded-md shadow-md"> {email}
            </span>
            <button
              onClick={() => {
                localStorage.setItem("email", "");
                localStorage.setItem("id", "");
                setEmail("");
              }}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
        {email === "vandantiwari@gmail.com" && (
          <Link to={'/register'}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Register a new Faculty
            </button>
          </Link>
        )}
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