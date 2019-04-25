module.exports = {
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'Jest report',
      outputPath: 'tests/report.html'
    }]
  ]
}
