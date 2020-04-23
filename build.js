const metalsmith = require('metalsmith')(__dirname),
    collections = require('metalsmith-collections'),
    dateInFilename = require('metalsmith-date-in-filename'),
    helpers = require('./helpers'),
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
    .metadata({
      helpers: helpers
    })
    .use(dateInFilename({
      override: false
    }))
    .use(collections({
      articles: {
        pattern: 'a/*.md',
        sortBy: 'filename',
        reverse: true
      },
      lastArticles: {
        pattern: 'a/*.md',
        sortBy: 'filename',
        reverse: true,
        limit: 3
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
      // changed sources: rebuild all (should be true to only rebuild changes but the
      // in-place plugin apparently mistakingly fails not finding files to process
      'src/**/*': '**/*',
      'layouts/**/*': '**/*'
    }
  }));
}

metalsmith.build(function (err) {
  if (err) { return console.error(err); }
  console.log('OK');
});
