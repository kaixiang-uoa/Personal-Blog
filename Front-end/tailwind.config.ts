/**
 * Tailwind CSS configuration file
 * used to define the project's style system, including colors, sizes, animations, etc.
 * supports dark mode and CSS variable system
 * @see https://tailwindcss.com/docs/configuration
 */
import type { Config } from 'tailwindcss';

export default {
  // specify which files Tailwind should analyze to find class names
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // enable dark mode with class strategy, use .dark class to switch theme
  // @see https://tailwindcss.com/docs/dark-mode
  darkMode: 'class',
  theme: {
    extend: {
      // use CSS variable defined color system, convenient for unified management and theme switching
      // all colors are based on HSL, convenient for adjusting transparency and derived colors
      colors: {
        // basic background color
        background: 'hsl(var(--background))',
        // basic text color
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))', // card background color
          foreground: 'hsl(var(--card-foreground))', // card text color
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))', // popover background color
          foreground: 'hsl(var(--popover-foreground))', // popover text color
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))', // primary operation color
          foreground: 'hsl(var(--primary-foreground))', // primary operation text color
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // secondary operation color
          foreground: 'hsl(var(--secondary-foreground))', // secondary operation text color
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // muted background color, used for secondary information
          foreground: 'hsl(var(--muted-foreground))', // muted text color
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // accent color
          foreground: 'hsl(var(--accent-foreground))', // accent text color
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))', // destructive operation color
          foreground: 'hsl(var(--destructive-foreground))', // destructive operation text color
        },
        border: 'hsl(var(--border))', // border color
        input: 'hsl(var(--input))', // input border color
        ring: 'hsl(var(--ring))', // focus ring color
        // chart colors, used for data visualization
        chart: {
          '1': 'hsl(var(--chart-1))', // Chart primary color 1
          '2': 'hsl(var(--chart-2))', // Chart primary color 2
          '3': 'hsl(var(--chart-3))', // Chart primary color 3
          '4': 'hsl(var(--chart-4))', // Chart primary color 4
          '5': 'hsl(var(--chart-5))', // Chart primary color 5
        },
      },
      // unified management of rounded corners
      // use CSS variables, convenient for global adjustment of component rounded styles
      borderRadius: {
        lg: 'var(--radius)', // large rounded corner
        md: 'calc(var(--radius) - 2px)', // medium rounded corner
        sm: 'calc(var(--radius) - 4px)', // small rounded corner
      },
      // custom animation keyframes
      keyframes: {
        // accordion expand animation
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        // accordion collapse animation
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      // register animation names, can be used directly in class names
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // enabled Tailwind plugins
  // tailwindcss-animate: provides more powerful animation capabilities
  // @see https://github.com/jamiebuilds/tailwindcss-animate
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
