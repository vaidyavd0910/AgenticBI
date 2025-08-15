import { Button } from "antd";
import React from "react";

export const ButtonComponent = ({
	text,
	variant = "filled", // filled | outlined | text | borderless
	customColor,
	icons = [],
	iconPosition = "left",
	size = "middle",
	disabled = false,
	loading = false,
	style = {},
	className = "",
	onClick = () => {}
}) => {
	const isTextOnly = text && icons.length === 0;

	// Map your variant prop to AntD's "type"
	const variantType =
		variant === "filled"
			? "primary"
			: variant === "outlined"
			? "default"
			: "text"; // AntD doesn't have "borderless", so we handle style manually

	// Base style
	const baseStyle = {
		borderRadius: "5px",
		...(variant === "borderless" && {
			border: "none",
			background: "transparent",
			color: customColor || "inherit"
		}),
		...(customColor &&
			variant === "filled" && {
				backgroundColor: customColor,
				color: "#fff",
				border: "none"
			}),
		...(customColor &&
			variant === "outlined" && {
				color: customColor,
				borderColor: customColor
			}),
		...(customColor &&
			variant === "text" && {
				color: customColor
			}),
		...style
	};

	const renderIcons = () =>
		icons.map((IconComp, index) =>
			typeof IconComp === "function" ? (
				<IconComp key={index} />
			) : (
				<span key={index}>{IconComp}</span>
			)
		);

	return (
		<Button
			type={variantType}
			size={size}
			disabled={disabled}
			loading={loading}
			style={baseStyle}
			className={className}
			onClick={onClick}
		>
			{isTextOnly ? (
				<span style={{ textAlign: "center" }}>{text}</span>
			) : (
				<span
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						flexDirection:
							iconPosition === "right" ? "row-reverse" : "row"
					}}
				>
					{renderIcons()}
					{text && <span>{text}</span>}
				</span>
			)}
		</Button>
	);
};
