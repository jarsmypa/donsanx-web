/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                orange: {
                    500: '#f97316',
                }
            },
            // Optimización de rendimiento
            animation: {
                'none': 'none',
            }
        },
    },
    plugins: [],
    // Optimizar para producción
    safelist: [],
}
