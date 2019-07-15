import Vue from 'vue'
import Router from 'vue-router'
import NewsFeed from './components/NewsFeed/NewsFeed.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewsFeed',
      component: NewsFeed
    },
    {
      path: '/user/:userId',
      name: 'NewsFeed',
      component: NewsFeed
    },
    {
      path: '/post/:postId',
      name: 'NewsFeed',
      component: NewsFeed
    },
  ]
})
