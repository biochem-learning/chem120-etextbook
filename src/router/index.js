import { createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/home-credit/HomeView.vue'
import Unit1View from '../views/units/Unit1Slides.vue'
import Unit2View from '../views/units/Unit2Slides.vue'
import Unit4View from '../views/units/JsonSlides.vue'
import Credit from '../views/home-credit/CreditsView.vue'

const routes=[
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/unit1',
    name: 'unti1',
    component: Unit1View
  },

  {
    path: '/unit2',
    name: 'unit2',
    component: Unit2View
  },

  {
    path: '/unit4',
    name: 'unit4',
    component: Unit4View,
    props: true
  },


  {
    path: '/credit',
    name: 'credit',
    component: Credit
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
