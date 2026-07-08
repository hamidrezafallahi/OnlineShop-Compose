import plugin from 'tailwindcss/plugin';

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./layout/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			borderColor: {
				border: "hsl(210, 16%, 82%)", // رنگ دلخواهت
			},
			screens: {
				xs: '431px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			fontSize: {
				'3xs': '8px',
				'2xs': '10px',
				md: '16px'
			},
			fontFamily: {
				iranSansLight: ['IRANSans-Light', 'sans-serif'],
			},
			colors: {
				primary: 'var(--primary-color)',
				foreground: 'hsl(var(--primary-color))',
				background: 'hsl(var(--secondary-color))',
				secondary: 'var(--secondary-color)',
				highlight: 'var(--highlight-color)',
				neutral: 'var(--neutral-color)',
				success: 'var(--success-color)',
				error: 'var(--error-color)',
				warning: 'var(--warning-color)',
				info: 'var(--info-color)',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			keyframes: {

				popUpDisappear: {
					'0%': {
						transform: 'translateY(-10%)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '0'
					}
				}
			},
			animation: {

				popUpDisappear: 'popUpDisappear 300ms forwards'
			}
		}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.hidden-show-scrollbar': {
					'scrollbar-width': 'none', /* Firefox */
					'-ms-overflow-style': 'none', /* IE 10+ */
				},
				'.hidden-show-scrollbar::-webkit-scrollbar': {
					display: 'none', /* Chrome, Safari */
				},
				'.hidden-show-scrollbar:hover::-webkit-scrollbar': {
					display: 'block',
				},
			})
		}),
	],
};
