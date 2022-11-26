import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import login from '../../pages/1_login/login.vue'
import daorumoren from '../../pages/2_daorumoren/daorumoren.vue'
import addzhuji from '../../pages/3_addzhuji/addzhuji.vue'
import addjiaohuanji from '../../pages/4_addjiaohuanji/addjiaohuanji.vue'
import addlianlu from '../../pages/5_addlianlu/addlianlu.vue'
import delzhuji from '../../pages/6_delzhuji/delzhuji.vue'
import deljiaohuanji from '../../pages/7_deljiaohuanji/deljiaohuanji.vue'
import dellianlu from '../../pages/8_dellianlu/dellianlu.vue'
import shengcheng from '../../pages/9_shengcheng/shengcheng.vue'
import jianli from '../../pages/10_jianli/jianli.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // } ,
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/daorumoren',
      name: 'daorumoren',
      component: daorumoren
    },
    {
      path: '/addzhuji',
      name: 'addzhuji',
      component: addzhuji
    },
    {
      path: '/addjiaohuanji',
      name: 'addjiaohuanji',
      component: addjiaohuanji
    },
    {
      path: '/addlianlu',
      name: 'addlianlu',
      component: addlianlu
    },
    {
      path: '/delzhuji',
      name: 'delzhuji',
      component: delzhuji
    },
    {
      path: '/deljiaohuanji',
      name: 'deljiaohuanji',
      component: deljiaohuanji
    },
    {
      path: '/dellianlu',
      name: 'dellianlu',
      component: dellianlu
    }
    ,
    {
      path: '/shengcheng',
      name: 'shengcheng',
      component: shengcheng
    }
    ,
    {
      path: '/jianli',
      name: 'jianli',
      component: jianli
    }
  ]
})
