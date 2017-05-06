const NotFound = { template: '<p>Page not found</p>' };

export var Routes = [
  
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
