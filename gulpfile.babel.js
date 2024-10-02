/* Gulp Core
--------------------------------------------------- */
const { series, parallel, src, dest, watch } = require("gulp");

/* Plugins
--------------------------------------------------- */
// colors
const c = require("ansi-colors");

// server
const browserSync = require("browser-sync");

// error handling
const notify = require("gulp-notify");
const errorHandle = require("gulp-error-handle");

// pug
const pug = require("gulp-pug");
const htmlBeautify = require("gulp-html-beautify");

// style
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const postcssScss = require("postcss-scss");
const autoprefixer = require("autoprefixer");

// optimize style
const stripCssComments = require("gulp-strip-css-comments");
const combineMqSort = require("postcss-sort-media-queries");
const cleanCSS = require("gulp-clean-css");

// js
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const concat = require("gulp-concat");

// optimize js
const uglify = require("gulp-uglify");

// optimize image
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminGiflossy = require("imagemin-giflossy");

// other
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const changed = require("gulp-changed");
const del = require("del");

// custom project
const deleteFile = require("gulp-delete-file");
const multiDest = require("gulp-multi-dest");

/* ------------------------------------------------------------------------------
@name: Config Directory
@description: Config Directory for SRC (development) and BUILD (production)
--------------------------------------------------------------------------------- */
// root
const SRC = "src";
const BUILD = "public";
const fileName = "app";

const optionsHTML = {
  indent_size: 2,
  indent_char: " ",
  eol: "\n",
  end_with_newline: true,
};

// dev
const DEV_PATH = {
  // view: {
  //   watch: `${SRC}/pug/**/*.pug`,
  //   pages: `${SRC}/pug/pages/*.pug`,
  // },
  style: `${SRC}/scss/**/*.scss`,
  script: {
    vendor: {
      order: [
        `${SRC}/scripts/vendors/moment.js`,
        `${SRC}/scripts/vendors/jquery.min.js`,
        `${SRC}/scripts/vendors/popper.min.js`,
        `${SRC}/scripts/vendors/bootstrap.min.js`,
        `${SRC}/scripts/vendors/detect.js`,
        `${SRC}/scripts/vendors/fastclick.js`,
        `${SRC}/scripts/vendors/jquery.blockUI.js`,
        `${SRC}/scripts/vendors/waves.js`,
        `${SRC}/scripts/vendors/jquery.nicescroll.js`,
        `${SRC}/scripts/vendors/jquery.slimscroll.js`,
        `${SRC}/scripts/vendors/jquery.scrollTo.min.js`,
        `${SRC}/scripts/vendors/scroll-lock.js`,
        `${SRC}/scripts/vendors/jquery.dataTables.min.js`,
        `${SRC}/scripts/vendors/dataTables.bootstrap4.min.js`,
        `${SRC}/scripts/vendors/dataTables.responsive.min.js`,
        `${SRC}/scripts/vendors/responsive.bootstrap4.min.js`,
        `${SRC}/scripts/vendors/dataTables.buttons.min.js`,
        `${SRC}/scripts/vendors/buttons.bootstrap4.min.js`,
        `${SRC}/scripts/vendors/jszip.min.js`,
        `${SRC}/scripts/vendors/pdfmake.min.js`,
        `${SRC}/scripts/vendors/vfs_fonts.js`,
        `${SRC}/scripts/vendors/buttons.html5.min.js`,
        `${SRC}/scripts/vendors/buttons.print.min.js`,
        `${SRC}/scripts/vendors/buttons.colVis.min.js`,
        `${SRC}/scripts/vendors/dataTables.rowGroup.min.js`,
        `${SRC}/scripts/vendors/rwd-table.min.js`,
        `${SRC}/scripts/vendors/sweetalert2.min.js`,
        `${SRC}/scripts/vendors/dropify.min.js`,
        `${SRC}/scripts/vendors/switchery.min.js`,
        `${SRC}/scripts/vendors/parsley.min.js`,
        `${SRC}/scripts/vendors/tinymce/tinymce.min.js`,
        `${SRC}/scripts/vendors/select2.min.js`,
        `${SRC}/scripts/vendors/bootstrap-datepicker.min.js`,
        `${SRC}/scripts/vendors/daterangepicker.js`,
        `${SRC}/scripts/vendors/toastr.min.js`,
        `${SRC}/scripts/vendors/morris.min.js`,
        `${SRC}/scripts/vendors/raphael-min.js`,
        `${SRC}/scripts/vendors/Chart.bundle.min.js`,
        `${SRC}/scripts/vendors/mindmup-editabletable.js`,
        `${SRC}/scripts/vendors/jquery.core.js`,
        `${SRC}/scripts/vendors/jquery.app.js`,
        `${SRC}/scripts/vendors/*.js`,
      ],
      concat: "vendor.js",
    },
    watch: `${SRC}/scripts/**/*.js`,
    main: `${SRC}/scripts/${fileName}.js`,
  },
  image: `${SRC}/images/**/*`,
  fonts: `${SRC}/fonts/**/*`,
  others: {
    forbidden: `${SRC}/others/html/403.html`,
    data: `${SRC}/others/data/*.json`,
  },
};

// build
const BUILD_PATH = {
  view: `${BUILD}`,
  style: {
    dir: `${BUILD}/assets/css`,
    main: `${BUILD}/assets/css/${fileName}.min.css`,
  },
  script: {
    dir: `${BUILD}/assets/js`,
    main: `${BUILD}/assets/js/${fileName}.min.js`,
  },
  image: `${BUILD}/assets/img`,
  fonts: `${BUILD}/assets/fonts`,
  maps: [`${BUILD}/assets/css/maps`, `${BUILD}/assets/js/maps`],
  readMe: `${BUILD}/assets/**/**/*.md`,
  others: {
    forbidden: [
      `${BUILD}/assets`,
      `${BUILD}/assets/css`,
      `${BUILD}/assets/fonts`,
      `${BUILD}/assets/img`,
      `${BUILD}/assets/img/bg`,
      `${BUILD}/assets/img/homescreen`,
      `${BUILD}/assets/img/default`,
      `${BUILD}/assets/img/dummy`,
      `${BUILD}/assets/img/icon`,
      `${BUILD}/assets/img/logo`,
      `${BUILD}/assets/js`,
      `${BUILD}/assets/js/data`,
    ],
    data: `${BUILD}/assets/js/data`,
  },
};

// colors
const COLORS = {
  error: "red",
  success: "green",
  build: {
    name: "magenta",
    size: "cyan",
  },
};

// renameOptions
const renameOptions = {
  suffix: ".min",
};

/* ------------------------------------------------------------------------------
@name: cleanBuild
@description delete build folder
--------------------------------------------------------------------------------- */
export const cleanBuild = () => {
  return del(BUILD, {
    force: true,
  }).then(() => {
    console.log(c[COLORS.success].bold("--------- Build cleaned! ---------"));
  });
};

/* ------------------------------------------------------------------------------
@name: cleanMaps
@description delete maps directory
--------------------------------------------------------------------------------- */
export const cleanMaps = () => {
  return del(BUILD_PATH.maps, {
    force: true,
  }).then(() => {
    console.log(c[COLORS.success].bold("--------- Maps cleaned! ---------"));
  });
};

/* ------------------------------------------------------------------------------
@name: cleanMd
@description delete md files
--------------------------------------------------------------------------------- */
export const cleanMd = () => {
  return src(BUILD_PATH.readMe)
    .pipe(
      deleteFile({
        reg: "/([/|.|w|s|-])*.(?:md)/g",
        deleteMatch: false,
      })
    )
    .on("end", () => {
      console.log(
        c[COLORS.success].bold("--------- Md Files cleaned! ---------")
      );
    });
};

/* ------------------------------------------------------------------------------
@name: Clean Temporary Task
@description: Clean maps directory and md files
--------------------------------------------------------------------------------- */
export const cleanTemporary = parallel(cleanMaps, cleanMd);

/* ------------------------------------------------------------------------------
@name: Server
@description: Config Server, Reload and devServer browserSync
--------------------------------------------------------------------------------- */
const server = browserSync.create();

export const reload = (done) => {
  server.reload();
  done();
};

export const devServer = (done) => {
  server.init({
    ghostMode: true,
    notify: false,
    server: {
      baseDir: BUILD_PATH.view,
    },
    open: false,
  });
  done();
};

/* ------------------------------------------------------------------------------
@name: CompilePug
@description: Compiles Pug files to HTML
--------------------------------------------------------------------------------- */
// export const compilePug = () => {
// 	return src(DEV_PATH.view.pages)
// 		.pipe(pug())
// 		.on(
// 			"error",
// 			notify.onError((err) => {
// 				return (
// 					"\nProblem file : " + c[COLORS.error].bold(err.message, err.path)
// 				);
// 			})
// 		)
// 		.pipe(htmlBeautify(optionsHTML))
// 		.pipe(dest(BUILD_PATH.view))
// 		.pipe(server.stream())
// 		.on("end", () => {
// 			console.log(
// 				c[COLORS.success].bold("--------- Pug finished compiling! ---------")
// 			);
// 		});
// };

/* ------------------------------------------------------------------------------
@name: compileStyle
@description: Compiles Pug files to HTML
--------------------------------------------------------------------------------- */
export const compileStyle = () => {
  return src(DEV_PATH.style)
    .pipe(errorHandle())
    .pipe(sourcemaps.init())
    .pipe(
      sass().on(
        "error",
        notify.onError((err) => {
          return (
            "\nProblem file : " + c[COLORS.error].bold(err.message, err.path)
          );
        })
      )
    )
    .pipe(
      postcss([autoprefixer()], {
        syntax: postcssScss,
      })
    )
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest(BUILD_PATH.style.dir))
    .pipe(rename(renameOptions))
    .pipe(dest(BUILD_PATH.style.dir))
    .pipe(server.stream())
    .on("end", () => {
      console.log(
        c[COLORS.success].bold("--------- Style finished compiling! ---------")
      );
    });
};

/* ------------------------------------------------------------------------------
@name: compileJS
@description: Compiles ES6 files to ES5 (javascripts)
--------------------------------------------------------------------------------- */
const bundle = (bundler) => {
  return bundler
    .transform(babelify, {
      presets: ["@babel/preset-env"],
    })
    .bundle()
    .on(
      "error",
      notify.onError((err) => {
        return (
          "\nProblem file : " + c[COLORS.error].bold(err.message, err.path)
        );
      })
    )
    .pipe(source(`${fileName}.js`))
    .pipe(buffer())
    .pipe(
      sourcemaps.init({
        loadMaps: true,
      })
    )
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest(BUILD_PATH.script.dir))
    .pipe(rename(renameOptions))
    .pipe(dest(BUILD_PATH.script.dir))
    .on("end", (done) => {
      console.log(
        c[COLORS.success].bold("--------- JS finished compiling! ---------")
      );
    });
};

export const compileJS = () => {
  return bundle(
    browserify(DEV_PATH.script.main, {
      debug: true,
    })
  );
};

/* ------------------------------------------------------------------------------
@name: compressImage
@description: Optimize image
--------------------------------------------------------------------------------- */
export const compressImage = () => {
  return src(DEV_PATH.image)
    .pipe(changed(BUILD_PATH.image))
    .pipe(
      imagemin([
        // jpg
        imageminMozjpeg({
          quality: 76.75,
        }),
        // png
        imageminPngquant({
          speed: 1,
          quality: [0.225, 0.425],
        }),
        // svg
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false },
            { removeUnknownsAndDefaults: false },
          ],
        }),
        // gif
        imageminGiflossy({
          optimizationLevel: 3,
          optimize: 3,
          lossy: 2,
        }),
      ])
    )
    .pipe(dest(BUILD_PATH.image))
    .pipe(server.stream())
    .on("end", () => {
      console.log(
        c[COLORS.success].bold(
          "--------- Image finished compressing! ---------"
        )
      );
    });
};

/* ------------------------------------------------------------------------------
@name: copyVendorJS
@description: Copy files to production directory
--------------------------------------------------------------------------------- */
export const copyVendorJS = () => {
  return src(DEV_PATH.script.vendor.order)
    .pipe(concat(DEV_PATH.script.vendor.concat))
    .pipe(dest(BUILD_PATH.script.dir))
    .pipe(rename(renameOptions))
    .pipe(
      uglify({
        mangle: false,
      })
    )
    .pipe(dest(BUILD_PATH.script.dir))
    .pipe(server.stream())
    .on("end", () => {
      console.log(
        c[COLORS.success].bold(
          "--------- Vendor JS finished copying! ---------"
        )
      );
    });
};

/* ------------------------------------------------------------------------------
@name: copyFonts
@description: Copy files to production directory
--------------------------------------------------------------------------------- */
export const copyFonts = () => {
  return src(DEV_PATH.fonts)
    .pipe(changed(BUILD_PATH.fonts))
    .pipe(dest(BUILD_PATH.fonts))
    .pipe(server.stream())
    .on("end", () => {
      console.log(
        c[COLORS.success].bold("--------- Fonts finished copying! ---------")
      );
    });
};

/* ------------------------------------------------------------------------------
@name: copyOthers
@description: Copy files to production directory
--------------------------------------------------------------------------------- */
export const copyData = () => {
  return src(DEV_PATH.others.data)
    .pipe(dest(BUILD_PATH.others.data))
    .on("end", () => {
      console.log(
        c[COLORS.success].bold("--------- Data finished copying! ---------")
      );
    });
};

export const copyForbidden = () => {
  return src(DEV_PATH.others.forbidden)
    .pipe(rename("index.html"))
    .pipe(multiDest(BUILD_PATH.others.forbidden))
    .on("end", () => {
      console.log(
        c[COLORS.success].bold(
          "--------- Forbidden finished copying! ---------"
        )
      );
    });
};

export const copyOthers = parallel(copyData, copyForbidden);

/* ------------------------------------------------------------------------------
@name: Task Watch
@description: Watches for changes to files
--------------------------------------------------------------------------------- */
export const devWatch = (done) => {
  // Shows that run "watch" mode
  global.watch = true;

  // PUG
  // watch(DEV_PATH.view.watch, compilePug);

  // SCSS
  watch(DEV_PATH.style, series(compileStyle));

  // JS
  watch(DEV_PATH.script.watch, series(compileJS, reload));

  // Image
  watch(DEV_PATH.image, compressImage);

  // Fonts
  watch(DEV_PATH.fonts, copyFonts);

  return done();
};

/* ------------------------------------------------------------------------------
@name: Default Task
@description: Default Task will be run at run gulp
--------------------------------------------------------------------------------- */
exports.default = series(
  compressImage,
  parallel(cleanMd, copyFonts),
  parallel(cleanMd, copyVendorJS, copyFonts),
  parallel(compileStyle, compileJS),
  copyOthers,
  devServer,
  devWatch
);

/* ------------------------------------------------------------------------------
@name: optimizeStyle
@description: Optimize style
--------------------------------------------------------------------------------- */
export const optimizeStyle = () => {
  return src(BUILD_PATH.style.main)
    .pipe(
      postcss([combineMqSort({ sort: "desktop-first" })], {
        syntax: postcssScss,
      })
    )
    .pipe(
      stripCssComments({
        preserve: false,
      })
    )
    .pipe(
      cleanCSS(
        {
          debug: true,
        },
        (details) => {
          console.log(
            c[COLORS.success].bold("--------- Original Size ") +
              c[COLORS.build.name].bold(`(${details.name}) `) +
              c[COLORS.build.size].bold(details.stats.originalSize) +
              c[COLORS.success].bold(" ---------")
          );
          console.log(
            c[COLORS.success].bold("--------- Minified Size ") +
              c[COLORS.build.name].bold(`(${details.name}) `) +
              c[COLORS.build.size].bold(details.stats.minifiedSize) +
              c[COLORS.success].bold(" ---------")
          );
        }
      )
    )
    .pipe(dest(BUILD_PATH.style.dir))
    .on("end", () => {
      console.log(
        c[COLORS.success].bold("--------- Style finished optimizing! ---------")
      );
    });
};

/* ------------------------------------------------------------------------------
@name: optimizeJS
@description: Optimize JS
--------------------------------------------------------------------------------- */
export const optimizeJS = () => {
  return src(BUILD_PATH.script.main)
    .pipe(
      uglify({
        mangle: false,
      })
    )
    .pipe(dest(BUILD_PATH.script.dir))
    .on("end", () => {
      console.log(
        c[COLORS.success].bold("--------- JS finished optimizing! ---------")
      );
    });
};

/* ------------------------------------------------------------------------------
@name: Build Task
@description: Build Task will be run at run gulp
--------------------------------------------------------------------------------- */
exports.build = series(
  cleanBuild,
  compressImage,
  parallel(copyVendorJS, copyFonts),
  parallel(series(compileStyle, optimizeStyle), series(compileJS, optimizeJS)),
  copyOthers,
  cleanTemporary
);
