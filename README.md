# ftvkyo.github.io sources

Sources of my website that get automatically deployed to GitHub Pages which are stored in a different repository.

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
