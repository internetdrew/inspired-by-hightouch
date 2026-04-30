# React + TypeScript + Vite

## Design Notes

### AgentEdit Critique

The `AgentEdit` demo in `src/components/AgentEdit.tsx` should communicate one clear story: an agent targets a specific editable region and applies a precise change to a credible marketing asset.

- Make the agent card the control surface and the email the canvas, not two equal focal points.
- Let hierarchy carry attention; avoid pulse-based emphasis for the primary action.
- Keep motion crisp and product-like by preferring transform and opacity over blur-heavy transitions.
- Make the editable region visibly distinct before and after the change so the payoff is immediate.
- Remove instructional redundancy when the layout itself can explain what happens next.
- Treat copy quality as part of trust; even small mistakes in the mock weaken the demo.

### ReviewPanel Critique

The `ReviewPanel` demo in `src/components/ReviewPanel.tsx` began as a passive moment from the source video: legal review pauses on a visible `Missing end date` issue. In the implementation, that moment had to become interactive without losing its role as the focal interruption in the review flow.

- Preserve the issue state as the clear stop in the sequence, not just another row in the panel.
- Translate the video frame into a usable decision point with an obvious primary action.
- Make the issue card explain what is wrong, why it matters, and what resolves it.
- Ensure the post-fix sequence feels believable by advancing cleanly into the rest of the approvals.
- Use hierarchy and state progression to carry the interaction, rather than relying on decorative emphasis.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
