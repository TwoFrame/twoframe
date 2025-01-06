import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
    darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(alert|breadcrumbs|button|card|date-picker|divider|dropdown|form|image|input|modal|navbar|skeleton|spinner|toggle|tabs|user|ripple|calendar|date-input|popover|menu|avatar).js"
  ],
  plugins: [typography,nextui({
    addCommonColors: true,
  }), require("tailwindcss-animate")],
  theme: {
  	extend: {
  		fontFamily: {
  			micro: [
  				'micro',
  				'sans'
  			]
  		},
  		colors: {
			color: {
				'light-grey': 'var(--color-light-grey)',
				'light-green': 'var(--color-light-green)',
				'light-blue': 'var(--color-light-blue)',
				lime: 'var(--color-lime)',

			},
			background: {
				'light-grey':  'var(--background-light-grey)',
				'dark-grey': 'var(--background-dark-grey)',
				'light-green': 'var(--background-light-green)',
				default: 'var(--background-default)',
			},

			'primary': 'var(--blue-primary)',
			'secondary': 'var(--blue-secondary)',
			
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
  	}
  }
};

export default config;
