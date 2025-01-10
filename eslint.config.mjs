import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import security from 'eslint-plugin-security';
import prettier from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['.cache', '.git', '.husky', '**/node_modules', '**/vite.config.js', '**/*.scss', '**/public'],
  },
  ...fixupConfigRules(
    compat.extends('plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended', 'plugin:react-hooks/recommended'),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      security: fixupPluginRules(security),
      prettier: fixupPluginRules(prettier),
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import/core-modules': ['__STATIC_CONTENT_MANIFEST'],

      react: {
        version: 'detect',
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'import/no-unresolved': 'off',
      'import/extensions': 'off',

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    },
  },
];
