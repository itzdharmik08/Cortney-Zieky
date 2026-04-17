/** @type {import('tailwindcss').Config} */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['ClashGrotesk','sans-serif'],
            },
            colors: {
                primary: '#10B981',
                'primary-dark': '#059669',
                cream: '#FCF8F4',
                'gray-50': '#FAFAFA',
                'gray-100': '#F5F5F5',
                'gray-200': '#E5E5E5',
                'gray-400': '#A3A3A3',
                'gray-600': '#525252',
                'gray-800': '#262626',
                'gray-900': '#171717',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
}
