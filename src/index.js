import Button from './components/button/index';
import Input from './components/input/index';
import Radio from './components/radio/index';
import RadioGroup from './components/radio-group/index';
import Checkbox from './components/checkbox/index';
import CheckboxGroup from './components/checkbox-group/index';
import Form from './components/form/index';
import FormItem from './components/form-item/index';
import Alert from './components/alert/index';
import Table from './components/table/index';
import Tree from './components/tree/tree.vue';

const components = {
  Button,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Form,
  FormItem,
  Alert,
  Table,
  Tree,
};

const skySoar = {
  ...components,
};

function install(Vue, opts = {}) {
  if (install.installed) return;

  Object.values(skySoar).forEach((component) => {
    Vue.component(component.name, component);
  });

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$SKY_SOAR = {
    size: opts.size || '',
  };
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const skySoarApi = {
  install,
  ...components,
};

export default skySoarApi;
