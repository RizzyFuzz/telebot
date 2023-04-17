{ pkgs }: {
    deps = [
        pkgs.python39Packages.huggingface-hub
        pkgs.nodejs-16_x
        pkgs.nodePackages.typescript
        pkgs.ffmpeg
        pkgs.libuuid
        pkgs.imagemagick
        pkgs.git
    ];
  env = { 
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid              
    ];
};
}