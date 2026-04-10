tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "on-primary": "#ffffff",
                "secondary-container": "#9e41f5",
                "error": "#ba1a1a",
                "on-surface": "#191c1e",
                "outline": "#777587",
                "surface": "#f7f9fb",
                "error-container": "#ffdad6",
                "surface-container": "#eceef0",
                "on-secondary": "#ffffff",
                "outline-variant": "#c7c4d8",
                "surface-container-highest": "#e0e3e5",
                "inverse-surface": "#2d3133",
                "surface-tint": "#4d44e3",
                "primary": "#3525cd",
                "inverse-on-surface": "#eff1f3",
                "on-tertiary-container": "#d9d8ff",
                "on-primary-fixed": "#0f0069",
                "surface-container-lowest": "#ffffff",
                "secondary": "#831ada",
                "surface-bright": "#f7f9fb",
                "on-background": "#191c1e",
                "surface-dim": "#d8dadc",
                "surface-container-low": "#f2f4f6",
                "primary-fixed-dim": "#c3c0ff",
                "on-secondary-container": "#fffbff",
                "on-error": "#ffffff",
                "surface-variant": "#e0e3e5",
                "secondary-fixed": "#f0dbff",
                "on-secondary-fixed-variant": "#6800b4",
                "secondary-fixed-dim": "#ddb8ff",
                "inverse-primary": "#c3c0ff",
                "tertiary": "#3130c0",
                "on-tertiary": "#ffffff",
                "primary-fixed": "#e2dfff",
                "on-tertiary-fixed": "#07006c",
                "on-tertiary-fixed-variant": "#2f2ebe",
                "primary-container": "#4f46e5",
                "tertiary-fixed": "#e1e0ff",
                "tertiary-fixed-dim": "#c0c1ff",
                "on-primary-container": "#dad7ff",
                "on-secondary-fixed": "#2c0051",
                "on-primary-fixed-variant": "#3323cc",
                "background": "#f7f9fb",
                "on-error-container": "#93000a",
                "on-surface-variant": "#464555",
                "tertiary-container": "#4b4dd8",
                "surface-container-high": "#e6e8ea"
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                full: "9999px"
            },
            fontFamily: {
                headline: ["Inter", "sans-serif"],
                body: ["Inter", "sans-serif"],
                label: ["Inter", "sans-serif"]
            },
            boxShadow: {
                'ambient': '0px 20px 40px rgba(25, 28, 30, 0.06)',
                'soft': '0 10px 40px -10px rgba(0,0,0,0.04)',
                'glow': '0 10px 30px -10px rgba(79, 70, 229, 0.4)',
            }
        }
    }
}
