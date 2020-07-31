import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";

//pages
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Home from "../pages/home";
import Organizations from "../pages/organizations";
import OrganizationDetails from "../pages/organizationDetails";
import Registration from "../pages/registration";

const screens = {
	Welcome: {
		screen: Welcome,
	},
	Login: {
		screen: Login,
	},
	Register: {
		screen: Register,
	},
	Home: {
		screen: Home,
	},
	Organizations: {
		screen: Organizations,
	},
	OrganizationDetails: {
		screen: OrganizationDetails,
	},
	Registration: {
		screen: Registration,
	},
};

const mainStack = createStackNavigator(screens, {
	headerMode: "none",
	navigationOptions: {
		headerVisible: false,
	},
});

export default createAppContainer(mainStack);
