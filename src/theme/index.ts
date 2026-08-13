import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
	palette: {
		primary: {
			main: "#6B7F1D", // verde oliva
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#D8CDB6", // bege
			contrastText: "#2B2B2B",
		},
		background: {
			default: "#F6F3EC",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#2B2B2B",
			secondary: "#6F6A5E",
		},
	},
	shape: {
		borderRadius: 16,
	},
	typography: {
		fontFamily: [
			"Poppins",
			"Roboto",
			"sans-serif",
		].join(","),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 12,
					fontWeight: 600,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 20,
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 24,
				},
			},
		},
	},
});