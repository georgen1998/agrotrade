import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/pages/login/LoginComponent.vue'),
  },
  {
    path: '/add-event',
    name: 'add-event',
    component: () => import('../components/pages/create-event/CreateEventComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list-events',
    name: 'list-events',
    component: () => import('../components/pages/list-event/ListEventComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-event/:id',
    name: 'update-event',
    component: () => import('../components/pages/edit-event/EditEventComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-person',
    name: 'add-person',
    component: () => import('../components/pages/create-person/CreatePersonComponent.vue'),
  },
  {
    path: '/list-person/:id',
    name: 'list-person',
    component: () => import('../components/pages/list-person/ListPersonComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-person/:id',
    name: 'edit-person',
    component: () => import('../components/pages/edit-person/EditPersonComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: () => import('../components/pages/create-product/CreateProductComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list-products',
    name: 'list-products',
    component: () => import('../components/pages/list-product/ListProductComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-product/:id',
    name: 'update-product',
    component: () => import('../components/pages/edit-product/EditProductComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list-event-products/:id',
    name: 'list-event-products',
    component: () => import('../components/pages/list-product/ListProductComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-post',
    name: 'add-post',
    component: () => import('../components/pages/create-post/CreatePostComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list-posts',
    name: 'list-posts',
    component: () => import('../components/pages/list-post/ListPostComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-post/:id',
    name: 'update-post',
    component: () => import('../components/pages/edit-post/EditPostComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../components/pages/map/MapComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list-farmers-events/:id',
    name: 'list-farmers-events',
    component: () => import('../components/pages/farmers-in-events/FarmerInEvent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/productdetails/:id',
    name: 'productdetails',
    component: () => import('../components/pages/ProductDetailsAndFarmers/ProductDetailsAndFarmers.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-review/:id',
    name: 'add-review',
    component: () => import('../components/pages/create-review/CreateReviewComponent.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../components/pages/viewFavorites/ViewFavorites.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/farmer-products/:id',
    name: 'farmer-products',
    component: () => import('../components/pages/Farmers-Products/FarmerProducts.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
