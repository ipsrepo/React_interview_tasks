import React from'react';
const DynamicInput = React.lazy(() => import('../components/dynamicInput/dynamicInput'));

const routes = [
    {
        path: '/',
        name: 'Home',
        component: DynamicInput
    }
]

export default routes;
