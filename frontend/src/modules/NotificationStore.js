import NotificationService from '../services/NotificationService.js'

export default { 
    state: {
       notifications: []
    },
    getters: {
        notifications(state) {
            return state.notifications
        }
    },
    mutations: {
        setNotifications(state, {notifications}) {
            state.notifications = notifications
        },
        setAllSeen(state) {
            state.notifications.forEach(notification => notification.isSeen = true)
        }
    },
    actions: {
        async loadNotifications(context) {
            let notifications = await NotificationService.query()
            console.log('notifications store:', notifications)
            context.commit({type: 'setNotifications', notifications})
        },
        async setAllSeen(context) {
            context.commit({type: 'setAllSeen'})
        }
    }
}