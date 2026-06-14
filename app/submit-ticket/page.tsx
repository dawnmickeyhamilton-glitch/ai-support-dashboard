'use client'

import { useState } from 'react'

export default function SubmitTicket() {
  const [customer_name, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [ticket_message, setTicketMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

      setSuccess(true)
      setCustomerName('')
      setEmail('')
      setTicketMessage('')
    } catch (error) {
      console.error(error)
      alert('Failed to submit ticket')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Submit Support Ticket</h1>

      {success && (
        <p style={{ color: 'green' }}>
          Ticket submitted successfully!
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={customer_name}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Describe your issue"
            value={ticket_message}
            onChange={(e) => setTicketMessage(e.target.value)}
            required
            rows={6}
            style={{
              width: '100%',
              padding: '10px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Submit Ticket
        </button>
      </form>
    </div>
  )
}