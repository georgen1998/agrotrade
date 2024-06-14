import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLemon,
  faUserSecret,
  faUserPlus,
  faUserEdit,
  faTrash,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import '@flaticon/flaticon-uicons/css/all/all.css';

library.add(faLemon, faUserSecret, faUserPlus, faUserEdit, faTrash, faList);

Vue.component('font-awesome-icon', FontAwesomeIcon);
