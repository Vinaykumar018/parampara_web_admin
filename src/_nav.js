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
        name: 'Category',
        to: '/pooja/pooja-category',
      },
      {
        component: CNavItem,
        name: 'Pooja',
        to: '/pooja/pooja-list',
      },
      {
        component: CNavItem,
        name: 'Booking',
        to: '/pooja/booking-list',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Pooja Archana',
  //   to: '/',
  //   icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Pooja Archana Category',
  //       to: '/pooja-archana-category',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pooja Archana',
  //       to: '/pooja-archana',
  //     },
  //   ],
  // },
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
        name: 'Booking',
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
        component:CNavItem,
        name:'Category',
        to:"/bhajan-mandal-category"
      },
      {
        component: CNavItem,
        name: 'Add Mandali',
        to: '/add-bhajan-mandal',
      },
      {
        component:CNavItem,
        name:'Mandali',
        to:"/bhajan-list"
      },
      {
        component: CNavItem,
        name: 'Booking',
        to: '/booking-list-bhajan-mandal',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Brahman Bhoj',
    to: '/',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
    items: [
      {
        component:CNavItem,
        name:'Brahman Bhoj',
        to:"/brahman-bhoj"
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Virtual Service',
  //   to: '/',
  //   icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Virtual Service',
  //       to: '/virtual-services',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Virtual Service Request',
  //       to: '/virtual-services-request',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Daily Pandit',
  //   to: '/',
  //   icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Add Pandit',
  //       to: '/add-daily-pandit',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Subscription Details',
  //       to: '/subscription-details',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Daily Pandit Booking',
  //       to: '/daily-pandit',
  //     },
  //   ],
  // },
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
    component:CNavGroup,
    name:'Story',
    to:'/',
    icon: <TfiLayoutSliderAlt className="nav-icon"/>,
    items: [
    {
      component: CNavItem,
      name: 'Story',
      to: '/story',
    },
    {
      component: CNavItem,
      name: 'Add Story ',
      to: '/story/add-story',
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
    to:'/Terms',
    icon:<FaFileAlt className="nav-icon"/>,
  },
  {
    component:CNavItem,
    name:'Privacy and Policy',
    to:'/privacy',
    icon:<MdPrivacyTip className="nav-icon"/>,
  },
]

export default _nav
