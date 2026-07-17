# bmstack.eu

Source code for [bmstack.eu](https://bmstack.eu), the personal CV website of Marian Bodnar.

The website presents a professional profile spanning Data Science and Data Engineering, with experience, education, certifications, technical skills and a downloadable bilingual CV. It is designed as a personal portfolio rather than a company or agency website.

## Features

- English and Slovak content
- Responsive layout for desktop, mobile and foldable displays
- Data Science and Data Engineering experience
- Education and certification sections
- Downloadable two-page CV in English and Slovak
- Open Graph and social sharing preview
- No cookies, tracking or analytics
- Search engine indexing intentionally disabled

## Technology

- React 19
- Vite 7
- JavaScript and CSS
- GitHub Actions
- GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Pushes to the `main` branch trigger the included GitHub Actions workflow, which builds the project and deploys the `dist` directory to GitHub Pages.

## License

This is a proprietary project. The source code, visual design, text, graphics, images and other original content may not be copied, modified, distributed or used to create derivative works without prior written permission.

See [LICENSE](LICENSE) for the complete terms.
