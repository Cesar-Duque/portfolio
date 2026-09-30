/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0B0B",
          soft: "#111111",
          raised: "#161616",
          elevated: "#1C1C1C",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        text: {
          DEFAULT: "#A1A1AA",
          soft: "#71717A",
          muted: "#52525B",
          heading: "#FAFAFA",
        },
        accent: {
          DEFAULT: "#C084FC",
          soft: "rgba(192,132,252,0.12)",
          ring: "rgba(192,132,252,0.4)",
          2: "#60A5FA",
        },
        terminal: {
          bg: "#0A0A0A",
          green: "#4ADE80",
          yellow: "#FACC15",
          red: "#F87171",
          cursor: "#C084FC",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
        xl2: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(192,132,252,0.45)",
        soft: "0 20px 60px -20px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "grad-accent": "radial-gradient(1200px 600px at 20% -10%, rgba(192,132,252,0.18), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(96,165,250,0.10), transparent 60%)",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter2: "-0.04em",
      },
      animation: {
        "blob": "blob 18s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "scanline": "scanline 4s linear infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-20px,20px) scale(0.97)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
}
