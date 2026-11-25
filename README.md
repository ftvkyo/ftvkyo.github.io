# ftvkyo.github.io sources

Sources of my website, hosted at [tangled.org/rei.gay/ftvkyo.me](https://tangled.org/rei.gay/ftvkyo.me) and mirrored to GitHub.
`nix-build` builds it into `./result`.
On every push to `main`, the spindle at spindle.rei.gay publishes it to the `gh-pages` branch, which GitHub Pages serves (`.tangled/workflows/`).

## SVG optimization

Using tool [`svgo`](https://github.com/svg/svgo).

```sh
svgo -r -f static
svgo -r -f assets/img
svgo -r -f layouts/partials/icon
```

## Convertion to WebP

```sh
cwebp "FILENAME.jpg" -o "FILENAME.webp" -q 80 -m 6

# Bulk:
for i in ./*.jpg ; do cwebp "$i" -o "${i/.jpg/.webp}" -q 80 -m 6 ; done
```
