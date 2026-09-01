    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#6366f1',
            mime: {
              navy: '#07182F',
              blue: '#1769E0',
              purple: '#7C3AED',
              lime: '#D8FF38',
              pink: '#FF548B',
              cream: '#F7F5EF'
            }
          },
          boxShadow: {
            glow: '0 0 60px rgba(78, 105, 255, 0.22)',
            card: '0 20px 60px rgba(2, 12, 32, 0.18)'
          },
          animation: {
            float: 'float 6s ease-in-out infinite',
            pulseSoft: 'pulseSoft 3s ease-in-out infinite',
            marquee: 'marquee 24s linear infinite'
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-18px) rotate(3deg)' }
            },
            pulseSoft: {
              '0%, 100%': { opacity: '.45', transform: 'scale(1)' },
              '50%': { opacity: '.85', transform: 'scale(1.08)' }
            },
            marquee: {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' }
            }
          }
        }
      }
    }
