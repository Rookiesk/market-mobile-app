/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";
import SideBar from "./Components/Sidebar";
import Home from './Components/Home'
import Dev from './Components/Dev'

const DrawerExample = DrawerNavigator(
    {
        Dev: { screen: Dev },
        Home: { screen: Home },
    },
    {
        initialRouteName: "Dev",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

export default DrawerExample;
