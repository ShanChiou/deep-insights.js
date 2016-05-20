var _ = require('underscore');
var CartoColor = require('cartocolor');
var colorScales = [CartoColor.Bold[5]]; // Demo colors

/**
 *  Class to set categories to each color
 *  - Right now, there is a relation 1 color to 1 category.
 *  - If that category is not available in the new data, that
 *    color will be freed.
 *
 */

function CategoryColors () {
  this.colors = {};
  _.each(colorScales[0], function (c) {
    this.colors[c] = null;
  }, this);
}

CategoryColors.prototype.updateData = function (d) {
  // Remove categories from colors where they are not present anymore
  _.each(this.colors, function (value, key) {
    if (!_.contains(d, value)) {
      this.colors[key] = null;
    } else {
      d = _.without(d, value);
    }
  }, this);

  // Set colors by new categories
  _.each(d, function (category) {
    var nextFreeColor = this.getNextAvailableColor();
    if (nextFreeColor) {
      this.colors[nextFreeColor] = category;
    }
  }, this);
};

CategoryColors.prototype.getNextAvailableColor = function () {
  for (var i in this.colors) {
    if (this.colors[i] === null) {
      return i;
    }
  }
  return null;
};

CategoryColors.prototype.getColorByCategory = function (category) {
  for (var i in this.colors) {
    if (this.colors[i] === category) {
      return i;
    }
  }
  return '#A5AA99';
};

CategoryColors.prototype.getCategoryByColor = function (color) {
  return this.colors[color];
};

module.exports = CategoryColors;
