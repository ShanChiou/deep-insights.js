var AutoStyler = require('./auto-styler');
var HistogramAutoStyler = AutoStyler.extend({
  getStyle: function () {
    var style = '';
    var colors = ['YlGnBu', 'Greens', 'Reds', 'Blues'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var stylesByGeometry = this.STYLE_TEMPLATE;
    var geometryType = this.layer.getGeometryType();
    if (geometryType) {
      style = this._getHistGeometry(geometryType)
        .replace('{{layername}}', '#layer{');
    } else {
      for (var symbol in stylesByGeometry) {
        style += this._getHistGeometry(symbol)
          .replace('{{layername}}', this._getLayerHeader(symbol));
      }
    }
    return style.replace(/{{column}}/g, this.dataviewModel.get('column'))
      .replace(/{{bins}}/g, this.dataviewModel.get('bins'))
      .replace(/{{color}}/g, color)
      .replace(/{{min}}/g, 1)
      .replace(/{{max}}/g, 20)
      .replace(/{{ramp}}/g, '')
      .replace(/{{defaultColor}}/g, '#000');
  },

  _getHistGeometry: function (geometryType) {
    var style = this.STYLE_TEMPLATE[geometryType];
    var shape = this.dataviewModel.getDistributionType();
    if (geometryType === 'polygon') {
      if (shape === 'F') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(Sunset3, {{bins}})), quantiles');
      } else if (shape === 'L' || shape === 'J') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(Sunset2, {{bins}}), headstails)');
      } else if (shape === 'A') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(Geyser, {{bins}})), quantiles');
      } else if (shape === 'C' || shape === 'U') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(Emrld1, {{bins}}), jenks)');
      } else {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], colorbrewer({{color}}, {{bins}}))');
      }
    } else if (geometryType === 'marker') {
      if (shape === 'F') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(RedOr1, {{bins}})), quantiles')
                     .replace('{{markerWidth}}', '7');
      } else if (shape === 'L' || shape === 'J') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(Sunset2, {{bins}}), headstails)')
                     .replace('{{markerWidth}}', '7');
      } else if (shape === 'A') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(Geyser, {{bins}})), quantiles')
                     .replace('{{markerWidth}}', '7');
      } else if (shape === 'C' || shape === 'U') {
        style = style.replace('{{defaultColor}}', 'ramp([{{column}}], cartocolor(BluYl1, {{bins}}), jenks)')
                     .replace('{{markerWidth}}', '7');
      } else {
        style = style.replace('{{markerWidth}}', 'ramp([{{column}}], {{min}}, {{max}}, {{bins}})');
      }
    } else {
      style = style.replace('{{markerWidth}}', 'ramp([{{column}}], {{min}}, {{max}}, {{bins}})');
    }
    return style;
  }
});

module.exports = HistogramAutoStyler;
