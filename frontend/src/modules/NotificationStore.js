import NotificationService from '../services/NotificationService.js'
import socket from '../services/SocketService.js'

export default { 
    state: {
       notifications: [],
    },
    getters: {
        notifications(state) {
            return state.notifications
        },
        unSeenNotifications(state) {
            return state.notifications.filter(notification => !notification.isSeen)
        }
    },
    mutations: {
        setNotifications(state, {notifications}) {
            state.notifications = notifications
        },
        updateNotification(state, {notification}) {
            let notificationIdx = state.notifications.findIndex(currNotification => currNotification._id === notification._id)
            state.notifications.splice(notificationIdx, 1, notification)
        }
    },
    actions: {
        async loadNotifications(context) {
            let notifications = await NotificationService.query()
            // console.log('notifications store:', notifications)
            context.commit({type: 'setNotifications', notifications})
        },
        async setAllSeen(context) {
            //DELETE
            // context.commit({type: 'setAllSeen'})
            // await NotificationService.setAllSeen()
        },
        async updateNotification(context, {notification}) {
            context.commit({type: 'updateNotification', notification})
            await NotificationService.update(notification)
        }
    }
}