module.exports = {
  isHome: isHome,
  trimFileExtensions: trimFileExtensions,
  getMediaPath: getMediaPath,
  formatDate: formatDate
};

function isHome (path) {
  return !path;
}

function trimFileExtensions (path) {
  const i = path.indexOf('.');
  if (i === -1) {
    return path;
  }
  return path.substr(0, i);
}

/**
 * Returns the full media file path for the given piece of content and file name.
 * @returns {string}
 */
function getMediaPath (contentPath, filename) {
  return [
    '/media',
    _trimLeadingTrailingSlashes(trimFileExtensions(contentPath)),
    filename
  ].join('/');
}

function formatDate (d) {
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

function _trimLeadingTrailingSlashes (s) {
  return s.replace(/^\/+/, '').replace(/\/+$/, '');
}
