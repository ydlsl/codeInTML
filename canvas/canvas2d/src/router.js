import { createRouter, createWebHistory } from 'vue-router'
 
//组件模块
import Main from './components/fabric'
import Move from './components/move'
import Draw from './components/draw'
import ChangeBox from './components/changeBox'
 
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect:'fabric' },
    { path: '/fabric', name: 'Main', component: Main },
    { path: '/move',  name: 'Move', component: Move},
    { path: '/draw',  name: 'Draw', component: Draw},
    { path: '/changeBox', name: 'changeBox', component: ChangeBox },
  ]
})