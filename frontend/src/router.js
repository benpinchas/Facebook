import Vue from 'vue'
import Router from 'vue-router'
import UserProfile from './views/UserProfile.vue'
import HomePage from './views/HomePage.vue'
import NewsFeed from './views/NewsFeed.vue'
import PostDetails from './views/PostDetails.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '',
          component: NewsFeed
        },
        {
          path: 'post/:postId',
          component: PostDetails
        }
      ]
    },
    {
      path: '/user/:userId',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/post/:postId',
      name: 'NewsFeed',
      component: NewsFeed
    },
  ]
})
