import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const Route = createFileRoute('/create')({
  component: CreateTournamentPage,
})

function CreateTournamentPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  async function handleCreate() {
    const res = await fetch('http://localhost:8000/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, date }),
    })

    const data = await res.json()

    navigate({
      to: '/admin/$code',
      params: { code: data.admin_code },
    })
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Tournament</h2>

      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Tournament name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 border rounded"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button onClick={handleCreate}>Create</Button>
    </div>
  )
}
