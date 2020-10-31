export default [
  {
    path: '/button',
    component: () => import('./components/button.vue'),
  },
  {
    path: '/input',
    component: () => import('./components/input.vue'),
  },
  {
    path: '/radio',
    component: () => import('./components/radio.vue'),
  },
  {
    path: '/checkbox',
    component: () => import('./components/checkbox.vue'),
  },
  {
    path: '/form',
    component: () => import('./components/form.vue'),
  },
  {
    path: '/alert',
    component: () => import('./components/alert.vue'),
  },
  {
    path: '/table-render',
    component: () => import('./components/tableRender.vue'),
  },
  {
    path: '/table-slot',
    component: () => import('./components/table-slot.vue'),
  },
  {
    path: '/tree',
    component: () => import('./components/tree.vue'),
  },
];
