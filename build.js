const metalsmith = require('metalsmith')(__dirname);
const collections = require('metalsmith-collections');
const dateInFilename = require('metalsmith-date-in-filename');
const helpers = require('./helpers');
const inPlace = require('metalsmith-in-place');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdownit');
const metadata = require('./metadata');
const nib = require('nib');
const permalinks = require('metalsmith-permalinks');
const stylus = require('metalsmith-stylus');
const watch = process.argv[2] === 'watch' ? require('metalsmith-watch') : null;

metalsmith
  .source('./src')
  .destination('./build')
  .clean(false) // to keep .git, CNAME etc.
  .metadata(Object.assign(metadata, {
    helpers: helpers
  }))
  .ignore(['_*'])
  .use(dateInFilename({
    override: false
  }))
  .use(collections({
    articles: {
      pattern: 'a/*.md*',
      sortBy: 'filename',
      reverse: true
    },
    lastArticles: {
      pattern: 'a/*.md*',
      sortBy: 'filename',
      reverse: true,
      limit: metadata.lastArticlesCount
    }
  }))
  .use(inPlace({
    suppressNoFilesError: true,
    setFilename: true
  }))
  .use(markdown({
    html: true,
    linkify: true,
    typographer: true
  }))
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    directory: 'src/_layouts',
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
