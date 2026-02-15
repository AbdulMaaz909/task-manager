'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const ViewTimesheet = () => {
    const baseUrl = 'http://localhost:5000/api';
    const [timesheet, setTimesheet] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTimeSheet = async () => {
            try {
                const res = await axios.get(`${baseUrl}/getalltimesheets`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTimesheet(res.data);
                console.log(res.data)
                setLoading(false);
            } catch (error) {
                console.log("Error fetching timesheets:", error)
                setLoading(false)
            }
        }
        fetchTimeSheet();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-full">

            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Employee Timesheet
            </h1>
            {loading ? (
                <p>Loading...</p>
            ) : (<table className='w-full border'>
                <thead>
                    <tr className='bg-gray-200 text-left my-2'>
                        <th className='p-2'>Employee</th>
                        <th className='p-2'>Task</th>
                        <th className='p-2'>Start</th>
                        <th className='p-2'>End</th>
                        <th className='p-2'>Duration</th>
                        <th className='p-2'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheet.map((item) => (
                        <tr key={item._id} className='border-b'>
                            <td className="p-2 font-semibold text-blue-600">
                                {item.user?.name}
                            </td>
                            <td className="p-2">{item.taskName}</td>
                            <td className="p-2">{item.startTime}</td>
                            <td className="p-2">{item.endTime}</td>
                            <td className="p-2">
                                {parseInt(item.duration)} mins
                            </td>
                            <td className="p-2">{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}

        </div>
    )
}

export default ViewTimesheet

