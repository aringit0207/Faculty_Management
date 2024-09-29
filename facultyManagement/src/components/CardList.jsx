import React from 'react'
import Card from './Card'

const CardList = ({data}) => {
  return (
    <div className='flex flex-wrap items-center justify-between max-w-4xl mx-auto grow p-12 gap-8'>
       {
         data.map(faculty => <Card key={faculty.faculty_id} img={faculty.profilePic} name={faculty.name} designation={faculty.designation} faculty_id={faculty.faculty_id} />)
       }
    </div>
  )
}

export default CardList