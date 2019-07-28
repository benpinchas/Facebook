import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatNum', val =>{
    return val.toLocaleString();
})

Vue.filter('timeAgo', ms =>{
    return moment(ms).fromNow()
})

Vue.filter('fDate', ms => {
    return moment(ms).format('LL')
})

Vue.filter('fUsername', username => {
    username = username.toLowerCase()
    let names =  username.split(' ')
    return names.map(name => name[0].toUpperCase()+ name.slice(1,name.length)).join(' ')
})