/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
}
