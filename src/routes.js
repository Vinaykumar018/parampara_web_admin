import { element } from 'prop-types';
import React from 'react';
import EnquiriesList from './views/enquries/EnquiriesList';

// Parmpara Admin Routes
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const PoojaForm = React.lazy(
  () => import('./views/Pooja/PoojaList/AddPoojaForm'),
);
const UpdateUserForm = React.lazy(() => import('./views/users/UpdateUserForm'));

//users

const Users = React.lazy(() => import('./views/users/Users'));

const AddUserForm = React.lazy(() => import('./views/users/AddUserForm'));
// Pandit routes
const Pandit = React.lazy(() => import('./views/pandit/Pandit'));
const updatePandit = React.lazy(() => import('./views/pandit/UpdatePandit'));
// const updatePandit=React.lazy(()=>)
//Pooja routes
const PoojaList = React.lazy(() => import('./views/Pooja/PoojaList/PoojaList'));
const PoojaCategory = React.lazy(
  () => import('./views/Pooja/PoojaCategory/PoojaCategory'),
);
const PoojaBookingList = React.lazy(() => import('./views/Pooja/BookingList'));

//pooja archana routes
const PoojaArchana = React.lazy(
  () => import('./views/PoojaArchana/PoojaArchana'),
);
const PoojaArchanaCategory = React.lazy(
  () => import('./views/PoojaArchana/PoojaArchanaCategory'),
);

//bHAVYA AYOJAN

const addBhavyaAyojan = React.lazy(
  () => import('./views/BhavyAyojan/AddAyojan'),
);
const BookingListBhavyaAyojan = React.lazy(
  () => import('./views/BhavyAyojan/BookingListBhavyaAyojan'),
);

//bhajan mandal
const bhajanList = React.lazy(
  () => import('./views/BhajanMandal/Bhajan-mandal-list/BhajanMandal'),
);
const addBhajanMandal = React.lazy(
  () => import('./views/BhajanMandal/Bhajan-mandal-list/AddMandal'),
);


const PreviewMandal = React.lazy(
  () => import('./views/BhajanMandal/Bhajan-mandal-list/PreviewMandal'),
);
const BookingListBhajanMandal = React.lazy(
  () => import('./views/BhajanMandal/BookingListBhajanMandal'),
);
const UpdateBhajanMandal = React.lazy(
  () => import('./views/BhajanMandal/Bhajan-mandal-list/UpdateBhajanMandal'),
);
const BhajanMandalCategory = React.lazy(
  () =>
    import('./views/BhajanMandal/Bhajan-mandal-category/BhajanMandalCategoryList'),
);

//virtua services

const virtualServices = React.lazy(
  () => import('./views/VirtualServices/VirtualServices'),
);

const VirtualServicesRequest = React.lazy(
  () => import('./views/VirtualServices/VirtualServicesRequest'),
);

//daily Pandit

const dailyPandit = React.lazy(() => import('./views/dailyPandit/DailyPandit'));
const addDailyPandit = React.lazy(
  () => import('./views/dailyPandit/AddPandit'),
);
const SubscriptionDetails = React.lazy(
  () => import('./views/dailyPandit/SubscriptionDetails'),
);
const AddPandit = React.lazy(() => import('./views/pandit/AddPandit'));

//ecommerce
const proudct = React.lazy(() => import('./views/eCommerce/Product/Product'));
const brahmanBhoj = React.lazy(()=>import('./views/BrahmanBhoj/BrahmanBhoj'));
// const addProduct = React.lazy(() => import('./views/eCommerce/Product/ProductAdd'));
const addProduct = React.lazy(() => import('./views/eCommerce/Product/ProductAdd'));

const updateProduct = React.lazy(()=> import('./views/eCommerce/Product/ProductUpdate'));
const ProductCategory = React.lazy(
  () => import('./views/eCommerce/ProductCategory/ProductCategory'),
);
const Order = React.lazy(() => import('./views/eCommerce/Order'));
const singleOrder = React.lazy(()=>import('./views/eCommerce/SingleOderDetails'));
//enquires
const Enqueries = React.lazy(() => import('./views/enquries/EnquiriesList'));

//slider
const Slider = React.lazy(() => import('./views/slider/MainSliders'));
const AddsliderCateogry = React.lazy(
  () => import('./views/slider/SliderCategories'),
);

const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(
  () => import('./views/theme/typography/Typography'),
);

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'));
const Breadcrumbs = React.lazy(
  () => import('./views/base/breadcrumbs/Breadcrumbs'),
);
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const ListGroups = React.lazy(
  () => import('./views/base/list-groups/ListGroups'),
);
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(
  () => import('./views/base/paginations/Paginations'),
);
const Placeholders = React.lazy(
  () => import('./views/base/placeholders/Placeholders'),
);
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const Progress = React.lazy(() => import('./views/base/progress/Progress'));
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'));
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const ButtonGroups = React.lazy(
  () => import('./views/buttons/button-groups/ButtonGroups'),
);
const Dropdowns = React.lazy(
  () => import('./views/buttons/dropdowns/Dropdowns'),
);

//Forms
const ChecksRadios = React.lazy(
  () => import('./views/forms/checks-radios/ChecksRadios'),
);
const FloatingLabels = React.lazy(
  () => import('./views/forms/floating-labels/FloatingLabels'),
);
const FormControl = React.lazy(
  () => import('./views/forms/form-control/FormControl'),
);
const InputGroup = React.lazy(
  () => import('./views/forms/input-group/InputGroup'),
);
const Layout = React.lazy(() => import('./views/forms/layout/Layout'));
const Range = React.lazy(() => import('./views/forms/range/Range'));
const Select = React.lazy(() => import('./views/forms/select/Select'));
const Validation = React.lazy(
  () => import('./views/forms/validation/Validation'),
);

const Charts = React.lazy(() => import('./views/charts/Charts'));

const UpdatePoojaList = React.lazy(
  () => import('./views/Pooja/PoojaList/UpdatePoojaList'),
);
// Icons
const CoreUIIcons = React.lazy(
  () => import('./views/icons/coreui-icons/CoreUIIcons'),
);
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));

const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const PanditProfile=React.lazy(()=>import('./views/pandit/PanditProfileData'))

//terms and conditions

const PrivacyPolicy = React.lazy(
  () => import('./views/pages/PrivacyAndPolicy/PrivacyAndPolicy'),
);
const Terms = React.lazy(
  () => import('./views/pages/TermsAndConditonPage/TermsAndConditionsPage'),
);
const UserProfilePage = React.lazy(() => import('./views/users/userProfilePage'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // Parampara Start
  //user
  { path: '/user', name: 'User', element: Users },
  { path: '/add-user', name: 'Add user', element: AddUserForm },
  { path: '/update-user/:id', name: 'Update user', element: UpdateUserForm },
  { path: '/user/:id', name: 'User Profile', element: UserProfilePage },

  //pandit

  { path: '/pandit', name: 'Pandit', element: Pandit },
  { path: '/pandit/update-pandit/:id', name: 'Pandit', element: updatePandit },
  { path: '/add-pandit', name: 'Pandit', element: AddPandit },
  { path: '/pandit/:id', name: 'Pandit Profile', element:PanditProfile},

  //only pooja
  {
    path: '/pooja/booking-list',
    name: 'Booking List',
    element: PoojaBookingList,
  },
  { path: '/pooja/pooja-list', name: 'Pooja List', element: PoojaList },
  {
    path: '/pooja/pooja-update-list/:id',
    name: 'Pooja Update List',
    element: UpdatePoojaList,
  },
  {
    path: '/pooja/pooja-category',
    name: 'Pooja Category',
    element: PoojaCategory,
  },
  { path: '/pooja/add-pooja', name: 'Add New Pooja', element: PoojaForm },

  //pooja archana
  { path: '/pooja-archana', name: 'Pooja Archana', element: PoojaArchana },
  {
    path: '/pooja-archana-category',
    name: 'Pooja Archana Category',
    element: PoojaArchanaCategory,
  },

  //bhavya ayojan
  {
    path: '/add-bhavya-ayojan',
    name: 'Add Bhavya Ayojan',
    element: addBhavyaAyojan,
  },
  {
    path: '/booking-list-bhavya-ayojan',
    name: 'Booking List Bhavya Ayojan',
    element: BookingListBhavyaAyojan,
  },

  //bhajan mandal
  { path: '/bhajan-list', name: 'Bhajan List', element: bhajanList },
  {
    path: '/preview/:id',
    name: 'Preview Bhajan Mandal',
    element: PreviewMandal,
  },
  {
    path: '/add-bhajan-mandal',
    name: 'Add Bhajan Mandal',
    element: addBhajanMandal,
  },
  {
    path: '/booking-list-bhajan-mandal',
    name: 'Booking List Bhajan Mandal',
    element: BookingListBhajanMandal,
  },
  {
    path: '/update-bhajan-mandal/:id',
    name: 'Update Bhajan Mandal',
    element: UpdateBhajanMandal,
  },
  {
    path: '/bhajan-mandal-category',
    name: 'Bhajan Mandal Category',
    element: BhajanMandalCategory,
  },

  //virtual services
  {
    path: '/virtual-services',
    name: 'Virtual Services',
    element: virtualServices,
  },
  {
    path: '/virtual-services-request',
    name: 'Virtual Services Request',
    element: VirtualServicesRequest,
  },

  //daily pandit
  { path: '/daily-pandit', name: 'Daily Pandit', element: dailyPandit },
  {
    path: '/add-daily-pandit',
    name: 'Add Daily Pandit',
    element: addDailyPandit,
  },
  {
    path: '/subscription-details',
    name: 'Subscription Details',
    element: SubscriptionDetails,
  },
  { path: '/brahman-bhoj', name: 'Brahman Bhoj', element:brahmanBhoj},
  //ecommerce
  { path: '/product', name: 'Product', element: proudct },
  {
    path: '/product-category',
    name: 'Product Category',
    element: ProductCategory,
  },
  {
    path:'/add-product',
    name: 'Add Product',
    element:addProduct, 
  },
  {
    path:'/product/update-product/:id',
    name:'Update Product',
    element:updateProduct,
  },
  { path: '/order', name: 'Order', element: Order },
  { path: '/order-details/:orderId',naem:"Order Details", element:singleOrder},

  //enquires

  { path: '/enquiries', name: 'Enquiries List', element: Enqueries },

  //slider

  { path: '/slider', name: 'Slider', element: Slider },
  {
    path: '/slider/cateogry',
    name: 'Slider Category',
    element: AddsliderCateogry,
  },

  { path: '/privacy', name: 'Privacy Policy', element: PrivacyPolicy },
  { path: '/terms', name: 'Terms and Conditions', element: Terms },

  // Parampara End
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    element: ButtonGroups,
  },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  {
    path: '/forms/checks-radios',
    name: 'Checks & Radios',
    element: ChecksRadios,
  },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  {
    path: '/forms/floating-labels',
    name: 'Floating Labels',
    element: FloatingLabels,
  },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  {
    path: '/notifications',
    name: 'Notifications',
    element: Alerts,
    exact: true,
  },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
];

export default routes;
