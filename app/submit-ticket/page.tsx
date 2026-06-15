'use client'

import { useState } from 'react'

export default function SubmitTicket() {
  const [customer_name, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [ticket_message, setTicketMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setSuccess('')

    try {
      await fetch('http://localhost:5678/webhook/support-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name,
          email,
          ticket_message,
        }),
      })

      setSuccess(
        'Ticket submitted successfully. Our AI support system is reviewing your request.'
      )

      setCustomerName('')
      setEmail('')
      setTicketMessage('')
    } catch (error) {
      alert('Failed to submit ticket.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Submit Support Ticket
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Tell us about your issue and our AI support system will review it instantly.
        </p>

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-800">
              Describe Your Issue
            </label>

            <textarea
              rows={6}
              placeholder="Explain your problem here..."
              value={ticket_message}
              onChange={(e) => setTicketMessage(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition"
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </form>

      </div>
    </div>
  )
}