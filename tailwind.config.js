/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					lg: "4rem",
					xl: "5rem",
				},
			},
			fontFamily: {
				DMSans: ["DM Sans", "sans-serif"],
			},

			screens: {
				"2xl": "1920px",
			},
			keyframes: {
				slideDown: {
					"0%": { transform: "translateY(-100%)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				slideUp: {
					"0%": { transform: "translateY(0%)", opacity: "1" },
					"100%": { transform: "translateY(-100%)", opacity: "0" },
				},
			},
			animation: {
				slideDown: "slideDown 0.5s ease-out forwards",
				slideUp: "slideUp 0.5s ease-out forwards",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				mainColor: "#050B20",
				buttonColor: "#405FF2",
				darktext: "#021526",
				lighttext: "#2D3648",
				greytext: "#021526B2",
				orange: "#F93B1D",
				colorerror: "#F93B1D",
				colorsuccess: "#45A849",
				secondarygrey: "#808A93",
				darkblack: "#0D0E0F",
				lightblack: "#131415",
				primary: "#F15A22",
				secondary: "#D2CFBB",
				greytext: "#C6D2D2",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
