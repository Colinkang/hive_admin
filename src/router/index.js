import Vue from 'vue'
import Router from 'vue-router'
// import Hive from '@/Containers/Hive'
// import HiveMap from '@/Containers/Map'
import content from '../components/content/index.vue';
// import BeeKeeperInfo from '@/Containers/BeeKeeper';
// import UpdatePwd from '@/Containers/BeeKeeper/updatepwd.vue';

import BeeBox from '../Containers/BeeBox/index'
import BeeFarmer from '../Containers/BeeFarmer/index.vue'
import Organization from '../Containers/Organization/index.vue'
import Event from '../Containers/Event/index.vue'
import AI from '../Containers/AI/index.vue'
import Drone from '../Containers/Drone/index.vue'
import Control from '../Containers/Control/index.vue'
import AddBeeBox from '../Containers/BeeBox/add.vue'
import AdminDetail from '../Containers/AdminDetail/index.vue'
import AdminDetailUpdatePwd from '../Containers/AdminDetail/updatepassword.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'content',
            component: content,
            redirect: '/beebox',
            children: [
                {
                    path: 'beebox',
                    component: BeeBox
                },
                {
                    path: 'beefarmer',
                    component: BeeFarmer
                },
                {
                    path: 'organization',
                    component: Organization
                },
                {
                    path: 'event',
                    component: Event
                },
                {
                    path: 'ai',
                    component: AI
                },
                {
                    path: 'dron',
                    component: Drone
                },
                {
                    path: 'control',
                    component: Control
                }
                ,
                {
                    path: 'addbeebox',
                    component: AddBeeBox
                }
                ,
                {
                    path: 'admindetail',
                    component: AdminDetail
                },
                {
                    path: 'updatepwd',
                    component: AdminDetailUpdatePwd
                }
            ]
        }
    ]
})
