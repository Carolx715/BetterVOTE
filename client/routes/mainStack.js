import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";

//pages
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Home from "../pages/home";
import Registration from "../pages/registration"; 

const screens = {
	Welcome: {
		screen: Welcome,
	},
	Login: {
		screen: Login,
	},
	Home: {
		screen: Home,
	},
	Registration: {
		screen: Registration, 
	}
};

const mainStack = createStackNavigator(screens, {
	headerMode: "none",
	navigationOptions: {
		headerVisible: false,
	},
});

export default createAppContainer(mainStack);
