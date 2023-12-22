/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      p1: {
        '50': '#e9fbff',
        '100': '#cef5ff',
        '200': '#a7efff',
        '300': '#6beaff',
        '400': '#26d8ff',
        '500': '#00b4ff',
        '600': '#008aff',
        '700': '#006fff',
        '800': '#005fe6',
        '900': '#0055b3',
        '950': '#001f3f',
      },
      p2: {
        '50': '#fff2f1',
        '100': '#ffe4e1',
        '200': '#ffccc7',
        '300': '#ffa8a0',
        '400': '#ff6f61',
        '500': '#f84c3b',
        '600': '#e52f1d',
        '700': '#c12314',
        '800': '#a02014',
        '900': '#842218',
        '950': '#480d07',
      },

    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

