module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',                     // Use ESLint's recommended rules
    'plugin:react/recommended',               // Use recommended rules from eslint-plugin-react
    'plugin:react/jsx-runtime',               // Use JSX runtime rules from eslint-plugin-react
    'plugin:react-hooks/recommended',         // Use recommended rules from eslint-plugin-react-hooks
    'react-app',                              // Use Create React App's default ESLint rules
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],   // Ignore specific patterns in linting
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },  // Use ECMAScript latest version and module type
  settings: { react: { version: '18.2' } },    // Set React version for eslint-plugin-react
  plugins: ['react-refresh'],                 // Use eslint-plugin-react-refresh for React Refresh support
  rules: {
    'react/jsx-no-target-blank': 'off',       // Disable warning for target="_blank" in JSX
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off'                 // Disable PropTypes validation for React components
  },
};
