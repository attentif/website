const metalsmith = require('metalsmith')(__dirname),
    collections = require('metalsmith-collections'),
    dateInFilename = require('metalsmith-date-in-filename'),
    inPlace = require('metalsmith-in-place'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdownit'),
    nib = require('nib'),
    permalinks = require('metalsmith-permalinks'),
    stylus = require('metalsmith-stylus'),
    watch = process.argv[2] === 'watch' ? require('metalsmith-watch') : null;

metalsmith
    .source('./src')
    .destination('./build')
    .clean(false) // to keep .git, CNAME etc.
    .use(dateInFilename({
      override: false
    }))
    .use(collections({
      articles: {
        pattern: 'a/*.md',
        sortBy: 'filename',
        reverse: true
      }
    }))
    .use(markdown({
      html: true,
      linkify: true,
      typographer: true
    }))
    .use(inPlace({
      suppressNoFilesError: true,
      setFilename: true
    }))
    .use(permalinks({
      relative: false
    }))
    .use(layouts({
      default: 'default.pug',
      pattern: '**/*.html'
    }))
    .use(stylus({
      use: [nib()]
    }));

if (watch) {
  metalsmith.use(watch({
    paths: {
      'src/**/*': true, // changed files: rebuild them
      'layouts/**/*': '**/*' // changed layouts: rebuild all files
    }
  }));
}

metalsmith.build(function (err) {
  if (err) { return console.error(err); }
  console.log('OK');
});
