import React from 'react'
import { auth } from '../Firebase';

export default function PrivateRoutes({ component: Component, alt:Alt}) {
    const user = auth.currentUser
    if (user) {
        return <Component />;
       }else{
         return <Alt/>
       }
}
