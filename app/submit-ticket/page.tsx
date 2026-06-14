'use client'

import { useState } from 'react'

export default function SubmitTicket() {
  const [customer_name, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [ticket_message, setTicketMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

    alert('Ticket submitted successfully!')

    setCustomerName('')
    setEmail('')
    setTicketMessage('')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Submit Support Ticket</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={customer_name}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <textarea
          placeholder="Describe your issue"
          value={ticket_message}
          onChange={(e) => setTicketMessage(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  )
}