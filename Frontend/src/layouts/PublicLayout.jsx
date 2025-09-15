import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <Outlet />
      </main>
      
    </div>
  )
}

export default PublicLayout
