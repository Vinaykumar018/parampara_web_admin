import React from 'react'
import CIcon from '@coreui/icons-react'
import { FaUsers,FaStore } from "react-icons/fa6";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { MdMessage,MdPrivacyTip } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

import {
  cilBell,
  cilUser,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSitemap,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/user',
    icon: <FaUsers className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pandit',
    to: '/pandit',
    icon: <FaUsers className="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Pooja',
    to: 'javascript:void(0)',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pooja Category',
        to: '/pooja/pooja-category',
      },
      {
        component: CNavItem,
        name: 'Pooja List',
        to: '/pooja/pooja-list',
      },
      {
        component: CNavItem,
        name: 'Booking List',
        to: '/pooja/booking-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pooja Archana',
    to: '/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pooja Archana Category',
        to: '/pooja-archana-category',
      },
      {
        component: CNavItem,
        name: 'Pooja Archana',
        to: '/pooja-archana',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Bhavya Ayojan',
    to: '/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Ayojan',
        to: '/add-bhavya-ayojan',
      },
      {
        component: CNavItem,
        name: 'Booking List',
        to: '/booking-list-bhavya-ayojan',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Bhajan Mandal',
    to: '/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Mandal',
        to: '/add-bhajan-mandal',
      },
      {
        component: CNavItem,
        name: 'Booking List',
        to: '/list-bhajan-mandal',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Virtual Service',
    to: '/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Virtual Service',
        to: '/virtual-services',
      },
      {
        component: CNavItem,
        name: 'Virtual Service Request',
        to: '/virtual-services-request',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Daily Pandit',
    to: '/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Pandit',
        to: '/add-daily-pandit',
      },
      {
        component: CNavItem,
        name: 'Subscription Details',
        to: '/subscription-details',
      },
      {
        component: CNavItem,
        name: 'Daily Pandit Booking',
        to: '/daily-pandit',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'E-Commerce',
    to: '/',
    icon: <FaStore className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Product Category',
        to: '/product-category',
      },
      {
        component: CNavItem,
        name: 'Products',
        to: '/product',
      },
      {
        component: CNavItem,
        name: 'Order',
        to: '/order',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Enquiries List',
    to: '/enquiries',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Enquiries List',
        to: '/enquiries',
      },
    ],
  },
  
  {
    component: CNavTitle,
    name: 'Frontend Setting',
  },
  {
    component:CNavGroup,
    name:'Slider',
    to:'/',
    icon: <TfiLayoutSliderAlt className="nav-icon"/>,
    items: [
      {
        component: CNavItem,
        name: 'Slider Category',
        to: '/slider/cateogry',
      },
      {
        component: CNavItem,
        name: 'Slider ',
        to: '/slider',
      }],
  },
  {
    component:CNavItem,
    name:'Enqueries',
    to:'/',
    icon: <MdMessage className="nav-icon"/>,
  },
  {
    component:CNavItem,
    name:'About Us',
    to:'/',
    icon:<FaFileAlt className="nav-icon"/>,
  },
  {
    component:CNavItem,
    name:'Terms and Conditions',
    to:'/',
    icon:<FaFileAlt className="nav-icon"/>,
  },
  {
    component:CNavItem,
    name:'Privacy and Policy',
    to:'/',
    icon:<MdPrivacyTip className="nav-icon"/>,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
