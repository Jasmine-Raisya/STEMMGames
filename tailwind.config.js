/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "System"],
                inter: ["Inter", "System"],
            },
            spacing: {
                // 4px base grid
                0.5: "2px",
                1: "4px",
                2: "8px",
                3: "12px",
                4: "16px",
                5: "20px",
                6: "24px",
                8: "32px",
                10: "40px",
                12: "48px",
                16: "64px",
            },
            colors: {
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                primary: "var(--color-primary)",
                accent: "var(--color-accent)",
                text: 'var(--color-text)',
                'text-muted': 'var(--color-text-muted)',
                border: 'var(--color-border)',
                engineering: 'var(--color-engineering)',
                health: 'var(--color-health)',
            },
            borderRadius: {
                "2xl": "16px",
                full: "9999px",
            },
        },
    },
    plugins: [],
};
