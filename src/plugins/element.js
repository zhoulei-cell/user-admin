import Vue from 'vue'
import {
  Button,
  Select,
  Card,
  Form,
  FormItem,
  Input,
  Loading,
  Message,
  MessageBox,
  Row,
  Col,
  Container,
  Aside,
  Header,
  Footer,
  Main,
  Menu,
  MenuItem,
  Submenu,
  Table,
  TableColumn,
  Switch,
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Pagination
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading.directive)
Vue.use(Row)
Vue.use(Col)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Dialog)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tooltip)
Vue.use(Pagination)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
