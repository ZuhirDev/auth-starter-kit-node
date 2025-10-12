import React from 'react'
import NotificationSend from './NotificationSend'

const NotificationAdmin = () => {
  return (
    <div>
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Notifications panel</h1>
          <p className="mt-2 text-muted-foreground">Create and send notifications to all the users</p>
        </div>
        
        <NotificationSend />
      </div>
    </div>
  )
}

export default NotificationAdmin
