# ftvkyo.github.io sources

Sources of my website that get automatically deployed to GitHub Pages which are stored in a different repository.

## SVG optimization

Using tool [`svgo`](https://github.com/svg/svgo).

```sh
svgo -r -f static
svgo -r -f assets/img
svgo -r -f layouts/partials/icon
```
