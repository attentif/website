module.exports = {
  trimFileExtension: function(path) {
    const sep = '.';
    if (path.indexOf(sep) == -1) {
      return path;
    }
    return path.split(sep).slice(0, -1).join(sep);
  },
  formatDate: function(d) {
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`; // date.toLocaleDateString('fr-CH', options)
  }
};
