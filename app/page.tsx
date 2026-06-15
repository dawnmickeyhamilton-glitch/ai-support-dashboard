'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [tickets, setTickets] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTickets()
  }, [])

  async function fetchTickets() {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('id', { ascending: false })

    if (!error) {
      setTickets(data || [])
    }

    setLoading(false)
  }

  const filteredTickets = useMemo(() => {
    return tickets.filter(
      (ticket) =>
        ticket.customer_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
    )
  }, [tickets, search])

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'resolved'
  ).length

  const pendingCount = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'pending'
  ).length

  const escalatedCount = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'escalated'
  ).length

  return (
    <div className="min-h-screen bg-slate-100 p-8 text-gray-900">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">
            AI Support Dashboard
          </h1>

          <p className="text-lg text-gray-700 mt-3">
            Monitor support tickets, AI classifications and escalations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-700 font-medium">
              Total Tickets
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {tickets.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-700 font-medium">
              Resolved
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {resolvedCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-700 font-medium">
              Pending
            </p>

            <h2 className="text-4xl font-bold text-yellow-600 mt-2">
              {pendingCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-700 font-medium">
              Escalated
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              {escalatedCount}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          {loading ? (
            <div className="p-10 text-center text-gray-700 text-lg">
              Loading tickets...
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-10 text-center text-gray-700 text-lg">
              No tickets found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 text-left text-gray-900 font-bold">
                      ID
                    </th>

                    <th className="p-4 text-left text-gray-900 font-bold">
                      Customer
                    </th>

                    <th className="p-4 text-left text-gray-900 font-bold">
                      Email
                    </th>

                    <th className="p-4 text-left text-gray-900 font-bold">
                      Issue
                    </th>

                    <th className="p-4 text-left text-gray-900 font-bold">
                      Status
                    </th>

                    <th className="p-4 text-left text-gray-900 font-bold">
                      Confidence
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-900 font-medium">
                        {ticket.id}
                      </td>

                      <td className="p-4 text-gray-900 font-medium">
                        {ticket.customer_name}
                      </td>

                      <td className="p-4 text-gray-800">
                        {ticket.email}
                      </td>

                      <td className="p-4 text-gray-800 max-w-sm">
                        {ticket.ticket_message}
                      </td>

                      <td className="p-4">
                        {ticket.status?.toLowerCase() === 'resolved' && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            Resolved
                          </span>
                        )}

                        {ticket.status?.toLowerCase() === 'pending' && (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                            Pending
                          </span>
                        )}

                        {ticket.status?.toLowerCase() === 'escalated' && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                            Escalated
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ticket.confidence >= 80
                              ? 'bg-green-100 text-green-700'
                              : ticket.confidence >= 50
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {ticket.confidence}%
                        </span>
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
  )
}