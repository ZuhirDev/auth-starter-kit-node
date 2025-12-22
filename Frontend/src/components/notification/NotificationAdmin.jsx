import React from 'react'
import NotificationSend from './NotificationSend'
import { useTranslation } from 'react-i18next'

const NotificationAdmin = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground">{t('common:notificationsPanel')}</h1>
          <p className="mt-2 text-muted-foreground">{t('common:notificationsDescription')}</p>
        </div>
        
        <NotificationSend />
      </div>
    </div>
  )
}

export default NotificationAdmin
