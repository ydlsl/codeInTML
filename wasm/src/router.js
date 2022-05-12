import { createRouter, createWebHistory } from 'vue-router'
 
//组件模块
import Wasm from './components/wasm'
import Move from './components/move'

 
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect:'move' },
    { path: '/wasm', name: 'Main', component: Wasm },
    { path: '/move',  name: 'Move', component: Move},

    // { path: '/upload', name: 'upload', component: Upload },
  ]
})