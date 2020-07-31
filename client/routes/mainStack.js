import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";

//pages
import Welcome from "../blank_pages/welcome";
import Home from "../blank_pages/home";

const screens = {
	Welcome: {
		screen: Welcome,
	},
	Home: {
		screen: Home,
	},
};

const mainStack = createStackNavigator(screens, {
	defaultNavigationOptions: {
		headerTintColor: "#444",
		headerStyle: { backgroundColor: "#eee", height: 60 },
	},
});

export default createAppContainer(mainStack);
