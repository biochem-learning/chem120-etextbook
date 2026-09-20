import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LessonReader from '../views/LessonReader.vue';
import CreditsView from '../views/CreditsView.vue';
import NotFound from '../views/NotFound.vue';
export default createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/units/:id', component: LessonReader, props: true },
    { path: '/unit:legacyId(\\d+)', redirect: to => '/units/' + to.params.legacyId },
    { path: '/credit', component: CreditsView },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ],
  scrollBehavior(to, from, saved) { return saved || (to.hash ? { el: to.hash, top: 24 } : { top: 0 }); }
});
