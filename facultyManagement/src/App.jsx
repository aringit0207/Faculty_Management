import { Route, Routes } from 'react-router-dom'
import './App.css'
import CardList from './components/CardList'
import ErrorPage from './components/ErrorPage'
import Footer from './components/Footer'
import Header from './components/Header'
import FacultyPage from './components/FacultyPage'
import { useEffect, useState } from 'react'

function App() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:8000/faculty');
    const data = await res.json();
    setData(data);
  }

  useEffect( ()=>{
     fetchData();
  },[])

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<CardList data={data} />} />
      <Route path='/faculty/:faculty_id' element={<FacultyPage data={data} />} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
