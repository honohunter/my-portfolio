module.exports = {
  crawlFrom: './src',
  includeSubComponents: true,
  importedFrom: '@material-ui/core',
  processors: [['raw-report', { outputTo: "my-report.json"}]],
};
