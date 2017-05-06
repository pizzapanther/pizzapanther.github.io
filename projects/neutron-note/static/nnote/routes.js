const NotFound = { template: '<p>Page not found</p>' };

import Home from './pages/home';
import AddNote from './journal/note-add';

export var Routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/note/add', name: 'note-add', component: AddNote},
];

var router = new VueRouter({
  mode: 'history',
  routes: Routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});

export default router;
