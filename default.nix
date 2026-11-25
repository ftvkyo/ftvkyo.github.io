# The site, built by Hugo with Dart Sass: `nix-build` leaves it in ./result.
let
  pins = import ./npins;
  pkgs = import pins.nixpkgs { };
in
pkgs.stdenvNoCC.mkDerivation {
  name = "ftvkyo-site";
  src = pkgs.lib.cleanSource ./.;
  nativeBuildInputs = [
    pkgs.dart-sass
    pkgs.hugo
  ];
  buildPhase = ''
    runHook preBuild
    HUGO_CACHEDIR=$TMPDIR/hugo hugo --destination $out
    runHook postBuild
  '';
  dontInstall = true;
}
