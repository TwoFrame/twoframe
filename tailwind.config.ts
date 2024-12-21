import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
    darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|input|navbar|spinner|tabs|user|ripple|form|avatar).js"
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
  			'color-light-grey': 'var(--color-light-grey)',
  			'color-light-green': '(var--color-light-green)',
  			'background-light-grey': 'var(--background-light-grey)',
  			'background-default': 'var(--background-default)',
  			'background-light-green': 'var(--background-light-green)',
  			'blue-primary': 'var(--blue-primary)',
  			'blue-secondary': 'var(--blue-secondary)',
			
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
