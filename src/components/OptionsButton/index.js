import React, { useEffect, useRef, useState } from "react"
import Icon from "../Icon";
import "./styles/main.css";

const OptionsBtn = ({
	className,
	iconId,
	iconClassName,
	ariaLabel,
	options = [],
	position = "left",
	showPressed = true,
	...props
}) => {
	// const [showOptions, setShowOptions] = useState(false);


	const ref = useRef()

	const [isMenuOpen, setIsMenuOpen] = useState(false)
  
	useEffect(() => {
	  const checkIfClickedOutside = e => {
		// If the menu is open and the clicked target is not within the menu,
		// then close the menu
		if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
		  setIsMenuOpen(false)
		}
	  }
  
	  document.addEventListener("mousedown", checkIfClickedOutside)
  
	  return () => {
		// Cleanup the event listener
		document.removeEventListener("mousedown", checkIfClickedOutside)
	  }
	}, [isMenuOpen])
  

	return (
		<div className="pos-rel" ref={ref}>
			<div
				aria-label={ariaLabel}
				className={`options-btn ${
					isMenuOpen && showPressed ? "options-btn--pressed" : ""
				} ${className || ""}`}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				{...props}
			>
				<Icon id={iconId} className={iconClassName} />
			</div>
			<ul
				className={`options-btn__options ${
					isMenuOpen ? "options-btn__options--active" : ""
				} ${position === "right" ? "options-btn__options--right" : ""}`}
			>
				{options.map((option, index) => (
					<li onClick ={option?.link} className="options-btn__option" key={index}>
						{option.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OptionsBtn;
