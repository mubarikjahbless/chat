module.exports=
    {
      files: ['*.ts', '*.tsx'],
      languageOptions: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          project: 'tsconfig.json',
          tsconfigRootDir: __dirname,
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        'prettier': require('eslint-plugin-prettier'),
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      env: {
        node: true,
        jest: true,
      },
      ignores: ['.eslintrc.js'],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    }
  