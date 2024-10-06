import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({img, name, designation, faculty_id}) => {
  return (
    <Link to={`/faculty/${faculty_id}`} className='flex gap-2 w-48 text-center flex-col hover:scale-110 items-center drop-shadow-lg bg-zinc-100 rounded-md p-4'>
        {/* <img className='rounded-md' src={`data:image/png;base64, ${img}`} alt="" /> */}
        <img className='rounded-md' src={`/profile.jpg`} alt="" />
        <p className='font-bold text-lg'>{name}</p>
        <p className='text-sm'>{designation}</p>
    </Link>
  )
}

export default Card