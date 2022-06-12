[![GitHub Pages](https://github.com/tschreiner/tschreiner.github.io/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/tschreiner/tschreiner.github.io/actions/workflows/gh-pages.yml)
[![pages-build-deployment](https://github.com/tschreiner/tschreiner.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/tschreiner/tschreiner.github.io/actions/workflows/pages/pages-build-deployment)

# tschreiner.github.io

This is my personal website.

## Requirements for deployment and building

* [HUGO](https://gohugo.io/)

## Hosting

After the repository has been built into the gh-pages branch the static code will be deployed and hosted by GitHub Pages.
## Building

### Locally (for development)

Running the development server:

    hugo serve --disableFastRender

Building static HTML

    hugo

### Production

The code will be built by a GitHub Workflow which is defined in [gh-pages.yml](.github/workflows/gh-pages.yml)

## Deployment

This page is built and deployed by a GitHub Action ([gh-pages.yml](.github/workflows/gh-pages.yml)) and will notify me by a Telegram message after successfull deployment.
