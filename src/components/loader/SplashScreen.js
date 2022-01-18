import React from "react";
import "./style.css";
import Icon from "../Icon";

const SplashScreen = () => {
	return (
		<div className="loader">
			<div className="loader__logo-wrapper">
				<Icon id="whatsapp" className="loader__logo" />
			</div>
			<div
				className="loader__progress"
			></div>
			<h1 className="loader__title"> Whatsapp</h1>
			<p className="loader__desc">
				<Icon id="lock" className="loader__icon" />
				End-to-end encrypted. Built by Sandy.
			</p>
		</div>
	);
};

export default SplashScreen;
