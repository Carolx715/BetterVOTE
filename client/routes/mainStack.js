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
import CreateOrg from "../pages/createOrganization";
import TOS from "../pages/TOS";
import userProfile from "../pages/userProfile";

const screens = {
	Welcome: {
		screen: Welcome,
	},
	Login: {
		screen: Login,
	},
	Register: {
		screen: Registration,
	},
	Home: {
		screen: Home,
	},
	Organizations: {
		screen: Organizations,
	},
	CreateOrganization: {
		screen: CreateOrg,
	},
	OrganizationDetails: {
		screen: OrganizationDetails,
	},
	Registration: {
		screen: Registration,
	},
	TOS: {
		screen: TOS,
	},
	Profile: {
		screen: userProfile,
	}
};

const mainStack = createStackNavigator(screens, {
	headerMode: "none",
	navigationOptions: {
		headerVisible: false,
		headerLeft: null,
	},
});

export default createAppContainer(mainStack);
