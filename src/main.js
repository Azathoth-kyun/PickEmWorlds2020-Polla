import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from './store'
import router from './router'
import * as firebase from 'firebase';

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyAcrMja-Iyu4kSidGunt9c0qEjsymCAZEQ",
  authDomain: "pollaksel2020.firebaseapp.com",
  databaseURL: "https://pollaksel2020.firebaseio.com",
  projectId: "pollaksel2020",
  storageBucket: "pollaksel2020.appspot.com",
  messagingSenderId: "1065872767020",
  appId: "1:1065872767020:web:2208b116491245a8387989",
  measurementId: "G-NBKK6C20Q0"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
