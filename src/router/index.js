import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Prueba from '@/views/Prueba_Screen.vue'
import Dashboard from '@/views/Dashboard.vue'
import Tabla from '@/views/Tabla.vue'
import Predict from '@/views/Predict.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Polla KSEL - Login'
    }
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: Prueba,
    meta: {
      title: 'Pantalla_Prueba',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Polla KSEL - Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/tabla',
    name: 'tabla',
    component: Tabla,
    meta: {
      title: 'Polla KSEL - Tabla',
      requiresAuth: true
    }
  },
  {
    path: '/predict',
    name: 'predict',
    component: Predict,
    meta: {
      title: 'Polla KSEL - Predecir',
      requiresAuth: true
    }
  }
//   {
//     path: '/about',
//     name: 'About',
//     route level code-splitting
//     this generates a separate chunk (about.[hash].js) for this route
//     which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) => {
  document.title = to.meta.title
  next();
  if (to.matched.some(route => route.meta.requiresAuth)){
    const user = firebase.auth().currentUser;
    if(user) {
      next();
    }else{
      document.title = 'Polla KSEL - Login';
      next({
        name: 'login'
      })
    }
  }else{
    next();
  }
});
export default router
