import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Menubar from 'primevue/menubar';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("SelectButton", SelectButton);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("Splitter", Splitter);
  nuxtApp.vueApp.component("SplitterPanel", SplitterPanel);
  nuxtApp.vueApp.component("Menubar", Menubar);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
});

