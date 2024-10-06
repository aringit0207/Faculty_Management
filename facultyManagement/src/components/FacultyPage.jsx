import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FacultyPage = ({ data }) => {
    const { faculty_id } = useParams();
    const [fData, setFData] = useState({});
    const [email, setEmail] = useState(localStorage.getItem("email"))
    useEffect(() => {
        const res = data.filter(f => f.faculty_id == faculty_id);
        setFData(res[0]);
    }, [])

    const handleLeave = async () => {
        setFData({ ...fData, leaves: Number(fData.leaves) + 1 + "" })
        const res = await fetch(`http://localhost:8000/faculty/${fData?.faculty_id}`, {
            method: "PATCH",
        });
        const json = await res.json();
    }
    return (
        <div className='grow flex'>
            <div className='bg-zinc-100 p-8 flex flex-col items-center gap-4'>
                {/* <img className='w-48 p-2 border-2 rounded-md' src={`data:image/png;base64, ${fData?.profilePic}`} alt="" /> */}
                <img className='w-48 p-2 border-2 rounded-md' src={`/profile.jpg`} alt="" />
                <p className='text-2xl font-bold'>{fData?.name}</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Faculty id</td>
                            <td>{fData?.faculty_id}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{fData?.department}</td>
                        </tr>
                        <tr>
                            <td>Designation</td>
                            <td>{fData?.designation}</td>
                        </tr>
                        <tr>
                            <td>Qualification</td>
                            <td>{fData?.qualification}</td>
                        </tr>
                        <tr>
                            <td>Contact No.</td>
                            <td>{fData?.contact_info}</td>
                        </tr>
                        <tr>
                            <td>Email id</td>
                            <td>{fData?.email}</td>
                        </tr>
                        <tr>
                            <td>Salary</td>
                            <td>{fData?.salary} &#8377;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='p-8'>

                <div className=''>
                    <p className='text-2xl font-bold'>Time Table</p>
                    <table className='my-4'>
                        <thead className='font-bold'>
                            <tr>
                                <td>Time</td>
                                <td>Venue</td>
                                <td>Subject</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10:00 - 11:00 AM</td>
                                <td>LT Building Room No. 402</td>
                                <td>Operating Systems</td>
                            </tr>
                            <tr>
                                <td>11:00 - 12:00 AM</td>
                                <td>LT Building Room No. 302</td>
                                <td>Operating System</td>
                            </tr>
                            <tr>
                                <td>12:00 - 1:00 PM</td>
                                <td>LT Building Room No. 202</td>
                                <td>Operating Systems</td>
                            </tr>
                            <tr>
                                <td>1:00 - 2:00 PM</td>
                                <td colSpan={2}>Lunch Break</td>
                            </tr>
                            <tr>
                                <td>2:00 - 3:00 PM</td>
                                <td>LT Building Room No. 401</td>
                                <td>Operating Systems</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='my-4 flex flex-col gap-4'>
                    <p className='text-2xl font-bold'>Leaves</p>
                    <p> {fData?.leaves === "0" ? "No leave" : fData?.leaves + " leaves"} in this semester </p>
                    {
                        email && email === "vandantiwari@gmail.com" && <button onClick={handleLeave} className='bg-sky-500 px-8 py-2 rounded-md w-fit text-white'>Add Leave</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default FacultyPage