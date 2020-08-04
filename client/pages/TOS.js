import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "../styles/globalStyles";
import { vh, vw } from "react-native-expo-viewport-units";

export default function TOS() {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/background.jpg")}
				style={styles.backgroundImage}
			/>
			<ScrollView>
				<View style={{ marginLeft: vw(5), marginRight: vh(5) }}>
					<View
						style={{
							justifyContent: "center",
							alignItem: "center",
							width: "100%",
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
							}}
						>
							Welcome to BetterVote!{"\n"}
							{"\n"}
						</Text>
					</View>
					<Text style={{ marginTop: vh(-3) }}>
						These terms and conditions outline the rules and regulations for the
						use of BetterVote Name's Website, located at Website.com.
						{"\n"}
						{"\n"}
						By accessing this website we assume you accept these terms and
						conditions. Do not continue to use Website Name if you do not agree
						to take all of the terms and conditions stated on this page.{"\n"}
						{"\n"}
						The following terminology applies to these Terms and Conditions,
						Privacy Statement and Disclaimer Notice and all Agreements:
						“Client”, “You” and “Your” refers to you, the person log on this
						website and compliant to the BetterVote's terms and conditions. “The
						Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company.
						“Party”, “Parties”, or “Us”, refers to both the Client and
						ourselves. All terms refer to the offer, acceptance and
						consideration of payment necessary to undertake the process of our
						assistance to the Client in the most appropriate manner for the
						express purpose of meeting the Client's needs in respect of
						provision of the Company's stated services, in accordance with and
						subject to, prevailing law of Netherlands. Any use of the above
						terminology or other words in the singular, plural, capitalization
						and/or he/she or they, are taken as interchangeable and therefore as
						referring to same.{"\n"}
						{"\n"}
						<Text
							style={{
								fontWeight: "bold",
							}}
						>
							Cookies {"\n"}
							{"\n"}
						</Text>
						We employ the use of cookies. By accessing Website Name, you agreed
						to use cookies in agreement with the Company Name's Privacy Policy.
						{"\n"}
						{"\n"}
						Most interactive websites use cookies to let us retrieve the user's
						details for each visit. Cookies are used by our website to enable
						the functionality of certain areas to make it easier for people
						visiting our website. Some of our affiliate/advertising partners may
						also use cookies. {"\n"}
						{"\n"}
						<Text style={{ fontWeight: "bold" }}>License</Text>
						{"\n"}
						{"\n"}
						Unless otherwise stated, Company Name and/or its licensors own the
						intellectual property rights for all material on Website Name. All
						intellectual property rights are reserved. You may access this from
						Website Name for your own personal use subjected to restrictions set
						in these terms and conditions.{"\n"}
						{"\n"}
						<Text style={{ fontWeight: "bold" }}>
							Redistribute content from Website Name {"\n"}
							{"\n"}
						</Text>
						Parts of this website offer an opportunity for users to post and
						exchange opinions and information in certain areas of the website.
						Company Name does not filter, edit, publish or review Comments prior
						to their presence on the website. Comments do not reflect the views
						and opinions of Company Name,its agents and/or affiliates. Comments
						reflect the views and opinions of the person who post their views
						and opinions. To the extent permitted by applicable laws, Company
						Name shall not be liable for the Comments or for any liability,
						damages or expenses caused and/or suffered as a result of any use of
						and/or posting of and/or appearance of the Comments on this website.{" "}
						{"\n"}
						{"\n"}
						Company Name reserves the right to monitor all Comments and to
						remove any Comments which can be considered inappropriate, offensive
						or causes breach of these Terms and Conditions. {"\n"}
						{"\n"}
						You warrant and represent that: {"\n"}
						{"\n"}
						You hereby grant Company Name a non-exclusive license to use,
						reproduce, edit and authorize others to use, reproduce and edit any
						of your Comments in any and all forms, formats or media. {"\n"}
						{"\n"}
						<Text style={{ fontWeight: "bold" }}>
							Hyperlinking to our Content{"\n"}
							{"\n"}
						</Text>
						The following organizations may link to our Website without prior
						written approval: {"\n"}
						{"\n"}
						These organizations may link to our home page, to publications or to
						other Website information so long as the link: (a) is not in any way
						deceptive; (b) does not falsely imply sponsorship, endorsement or
						approval of the linking party and its products and/or services; and
						(c) fits within the context of the linking party's site. {"\n"}
						{"\n"}
						<Text style={{ fontWeight: "bold", alignItem: "center" }}>
							Content Liability {"\n"}
							{"\n"}
						</Text>
						We shall not be hold responsible for any content that appears on
						your Website. You agree to protect and defend us against all claims
						that is rising on your Website. No link(s) should appear on any
						Website that may be interpreted as libelous, obscene or criminal, or
						which infringes, otherwise violates, or advocates the infringement
						or other violation of, any third party rights. {"\n"}
						{"\n"}
						<Text style={{ fontWeight: "bold", alignItem: "center" }}>
							Reservation of Rights{"\n"}
							{"\n"}
						</Text>
						We reserve the right to request that you remove all links or any
						particular link to our Website. You approve to immediately remove
						all links to our Website upon request. We also reserve the right to
						amen these terms and conditions and it's linking policy at any time.
						By continuously linking to our Website, you agree to be bound to and
						follow these linking terms and conditions. {"\n"}
						{"\n"}
						To the maximum extent permitted by applicable law, we exclude all
						representations, warranties and conditions relating to our website
						and the use of this website. Nothing in this disclaimer will: {"\n"}
						{"\n"}
						The limitations and prohibitions of liability set in this Section
						and elsewhere in this disclaimer: (a) are subject to the preceding
						paragraph; and (b) govern all liabilities arising under the
						disclaimer, including liabilities arising in contract, in tort and
						for breach of statutory duty. {"\n"}
						{"\n"}
						As long as the website and the information and services on the
						website are provided free of charge, we will not be liable for any
						loss or damage of any nature. {"\n"}
						{"\n"}
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}
