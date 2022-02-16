import { 
  DashboardOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
    {
      key: 'home',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'home',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
  {
    key: 'corporate',
    path: `${APP_PREFIX_PATH}/corporate`,
    title: 'corporate',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'user',
    path: `${APP_PREFIX_PATH}/user`,
    title: 'user',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: []
  },
]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
