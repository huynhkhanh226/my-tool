module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.05" }],
      },
      spacing: {
        "header": "72px",
      }
    },
  },
};
