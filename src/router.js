import { createRouter, createWebHistory } from 'vue-router';
import SupplierForm from './components/SupplierForm.vue';
import SupplierTable from './components/SupplierTable.vue';
import SupplierUpdate from './components/SupplierUpdate.vue';  

const routes = [
  {
    path: '/',
    name: 'SupplierForm',
    component: SupplierForm,
  },
  {
    path: '/supplier-table',
    name: 'SupplierTable',
    component: SupplierTable,
  },
  {
    path: '/supplier-update/:id',  
    name: 'SupplierUpdate',
    component: SupplierUpdate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
