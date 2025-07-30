
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-gradient-from': '#6366F1', // Indigo 500
        'blue-gradient-to': '#8B5CF6',   // Violet 500
        'green-gradient-from': '#10B981', // Emerald 500
        'green-gradient-to': '#34D399',  // Emerald 400
        'purple-gradient-from': '#8B5CF6', // Violet 500
        'purple-gradient-to': '#EC4899', // Pink 500
        'orange-gradient-from': '#F59E0B', // Amber 500
        'orange-gradient-to': '#F97316', // Orange 500
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
