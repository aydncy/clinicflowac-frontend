import { useState, useEffect } from 'react'

export default function App() {
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const clinicId = 'clinic-456'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const pRes = await fetch(`http://localhost:8083/patients/list/${clinicId}`)
      const pData = await pRes.json()
      setPatients(pData.patients || [])

      const aRes = await fetch(`http://localhost:8083/appointments/list/${clinicId}`)
      const aData = await aRes.json()
      setAppointments(aData.appointments || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-5xl font-bold text-white mb-8'>ClinicFlowAC Dashboard</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-800'>Patients</h3>
            <p className='text-3xl font-bold text-blue-600 mt-2'>{patients.length}</p>
          </div>
          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-800'>Appointments</h3>
            <p className='text-3xl font-bold text-green-600 mt-2'>{appointments.length}</p>
          </div>
          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <h3 className='text-lg font-semibold text-gray-800'>Revenue</h3>
            <p className='text-3xl font-bold text-purple-600 mt-2'>$0</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Patients</h2>
            {loading ? (
              <p className='text-gray-600'>Loading...</p>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-2 text-left'>ID</th>
                      <th className='px-4 py-2 text-left'>Name</th>
                      <th className='px-4 py-2 text-left'>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(p => (
                      <tr key={p.id} className='border-b hover:bg-gray-50'>
                        <td className='px-4 py-2'>{p.id}</td>
                        <td className='px-4 py-2'>{p.name}</td>
                        <td className='px-4 py-2'>{p.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className='bg-white rounded-lg p-6 shadow-lg'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Appointments</h2>
            {loading ? (
              <p className='text-gray-600'>Loading...</p>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='px-4 py-2 text-left'>ID</th>
                      <th className='px-4 py-2 text-left'>Patient</th>
                      <th className='px-4 py-2 text-left'>Date</th>
                      <th className='px-4 py-2 text-left'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(a => (
                      <tr key={a.id} className='border-b hover:bg-gray-50'>
                        <td className='px-4 py-2'>{a.id}</td>
                        <td className='px-4 py-2'>{a.patient_id}</td>
                        <td className='px-4 py-2'>{new Date(a.date).toLocaleDateString()}</td>
                        <td className='px-4 py-2'>
                          <span className='bg-green-100 text-green-800 px-2 py-1 rounded'>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}