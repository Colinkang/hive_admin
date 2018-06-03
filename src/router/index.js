import Vue from 'vue'
import Router from 'vue-router'
import content from '@/components/content/index.vue';
import Hive from '@/Containers/Hive/index'
import Beekeeper from '@/Containers/Beekeeper/index'
import Organization from '@/Containers/Organization/index'
import Event1 from '@/Containers/Event/index'
import AI from '@/Containers/AI/index'
import UAV from '@/Containers/UAV/index'
import Management from '@/Containers/Management/index'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'content',
      component: content,
      redirect: '/hive',
      children: [
        {
          path: '/hive',
          name: 'hive',
          component: Hive
        },
        {
          path: '/beekeeper',
          name: 'beekeeper',
          component: Beekeeper
        },
        {
          path: '/organization',
          name: 'organization',
          component: Organization
        },
        {
          path: '/event',
          name: 'event',
          component: Event1
        },
        {
          path: '/ai',
          name: 'ai',
          component: AI
        },
        {
          path: '/uav',
          name: 'uav',
          component: UAV
        },
        {
          path: '/management',
          name: 'management',
          component: Management
        },
      ]
    },
  ]
})
