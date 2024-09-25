// import React, { Suspense, Fragment, lazy } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import Loader from './components/Loader/Loader';
// import AdminLayout from './layouts/AdminLayout';

// import { BASE_URL } from './config/constant';

// export const renderRoutes = (routes = []) => (
//   <Suspense fallback={<Loader />}>
//     <Routes>
//       {routes.map((route, i) => {
//         const Guard = route.guard || Fragment;
//         const Layout = route.layout || Fragment;
//         const Element = route.element;

//         return (
//           <Route
//             key={i}
//             path={route.path}
//             element={
//               <Guard>
//                 <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
//               </Guard>
//             }
//           />
//         );
//       })}
//     </Routes>
//   </Suspense>
// );

// const routes = [
//   {
//     exact: 'true',
//     path: '/login',
//     element: lazy(() => import('./views/auth/signin/SignIn1'))
//   },
//   {
//     exact: 'true',
//     path: '/auth/signin-1',
//     element: lazy(() => import('./views/auth/signin/SignIn1'))
//   },
//   {
//     exact: 'true',
//     path: '/auth/signup-1',
//     element: lazy(() => import('./views/auth/signup/SignUp1'))
//   },
//   {
//     path: '*',
//     layout: AdminLayout,
//     routes: [
//       {
//         exact: 'true',
//         path: '/app/dashboard/default',
//         element: lazy(() => import('./views/dashboard'))
//       },
//       {
//         exact: 'true',
//         path: '/basic/button',
//         element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
//       },
//       {
//         exact: 'true',
//         path: '/basic/badges',
//         element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
//       },
//       {
//         exact: 'true',
//         path: '/basic/breadcrumb-paging',
//         element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
//       },
//       {
//         exact: 'true',
//         path: '/basic/collapse',
//         element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
//       },
//       {
//         exact: 'true',
//         path: '/basic/tabs-pills',
//         element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
//       },
//       {
//         exact: 'true',
//         path: '/basic/typography',
//         element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
//       },
//       {
//         exact: 'true',
//         path: '/forms/form-basic',
//         element: lazy(() => import('./views/forms/FormsElements'))
//       },
//       {
//         exact: 'true',
//         path: '/tables/bootstrap',
//         element: lazy(() => import('./views/tables/BootstrapTable'))
//       },
//       {
//         exact: 'true',
//         path: '/charts/nvd3',
//         element: lazy(() => import('./views/charts/nvd3-chart'))
//       },
//       {
//         exact: 'true',
//         path: '/maps/google-map',
//         element: lazy(() => import('./views/maps/GoogleMaps'))
//       },
//       {
//         exact: 'true',
//         path: '/sample-page',
//         element: lazy(() => import('./views/extra/SamplePage'))
//       },
      
//       {
//         path: '*',
//         exact: 'true',
//         element: () => <Navigate to={BASE_URL} />
//       }
//     ]
//   }
// ];

// export default routes;










import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/basic/companydetails',
        element: lazy(() => import('./views/ui-elements/basic/Companydetails'))
      },
      {
        exact: 'true',
        path: '/basic/catagorymaster',
        element: lazy(() => import('./views/ui-elements/basic/Catagorymaster'))
      },
      {
        exact: 'true',
        path: '/basic/itemmaster',
        element: lazy(() => import('./views/ui-elements/basic/Itemmaster'))
      },
      {
        exact: 'true',
        path: '/basic/purchasemaster',
        element: lazy(() => import('./views/ui-elements/PurchaseDetails'))
      },
      {
        exact: 'true',
        path: '/basic/designdetails',
        element: lazy(() => import('./views/ui-elements/basic/Designdetails'))
      },
      {
        exact: 'true',
        path: '/basic/partydetails',
        element: lazy(() => import('./views/ui-elements/basic/Partydetails'))
      },
      {
        exact: 'true',
        path: '/basic/taxdetails',
        element: lazy(() => import('./views/ui-elements/basic/Taxdetails'))
      },
      {
        exact: 'true',
        path: '/basic/userdetails',
        element: lazy(() => import('./views/ui-elements/basic/Userdetails'))
      },
      {
        exact: 'true',
        path: '/basic/financialyeardetails',
        element: lazy(() => import('./views/ui-elements/basic/Financialyeardetails'))
      },
      {
        exact: 'true',
        path: '/basic/barcodedetails',
        element: lazy(() => import('./views/ui-elements/BarcodeDetails'))
      },
      {
        exact: 'true',

        path: '/forms/Retailsales',
        element: lazy(() => import('./views/sale/Retailsale'))
      },
      {
        exact: 'true',

        path: '/sale/Bulksale',
        element: lazy(() => import('./views/sale/Bulksale'))
      },
      {
        exact: 'true',

        path: '/sale/bulksalereturn',
        element: lazy(() => import('./views/sale/Bulksalereturn'))
      },
      {
        exact: 'true',
        path: '/reports/salesreports',
        element: lazy(() => import('./views/reports/salesreports'))
      },
      {
        exact: 'true',
        path: '/reports/salestaxreports',
        element: lazy(() => import('./views/reports/SaletaxReport'))
      },
      {
        exact: 'true',
        path: '/reports/stockreport',
        element: lazy(() => import('./views/reports/StockReport'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
