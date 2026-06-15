'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              AI Support Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Monitor support tickets, AI classifications and escalations
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Total Tickets</p>
            <h2 className="text-3xl font-bold">
              {tickets.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Resolved</p>
            <h2 className="text-3xl font-bold text-green-600">
              {resolvedCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600">
              {pendingCount}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500">Escalated</p>
            <h2 className="text-3xl font-bold text-red-600">
              {escalatedCount}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-10 text-center">
              Loading tickets...
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-10 text-center">
              No tickets found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Issue</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Confidence</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">{ticket.id}</td>

                      <td className="p-4">
                        {ticket.customer_name}
                      </td>

                      <td className="p-4">
                        {ticket.email}
                      </td>

                      <td className="p-4 max-w-sm">
                        {ticket.ticket_message}
                      </td>

                      <td className="p-4">
                        {ticket.status?.toLowerCase() === 'resolved' && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Resolved
                          </span>
                        )}

                        {ticket.status?.toLowerCase() === 'pending' && (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            Pending
                          </span>
                        )}

                        {ticket.status?.toLowerCase() === 'escalated' && (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                            Escalated
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
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