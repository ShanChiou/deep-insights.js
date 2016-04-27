var Backbone = require('backbone');
var DashboardView = require('../src/dashboard-view');

describe('dashboard-view', function () {
  beforeEach(function () {
    this.view = new DashboardView({
      widgets: new Backbone.Collection(),
      model: new cdb.core.Model({
        renderMenu: true
      })
    });
  });

  it('should setup the template initially because it is required for vis to work', function () {
    expect(this.view.$el.html()).toContain('id="map"');
  });

  describe('when render', function () {
    beforeEach(function () {
      this.view.render();
    });

    it('should create widgets subviews ', function () {
      expect(this.view.el.querySelector('.Widget-canvas')).toBeDefined();
      expect(this.view.el.querySelector('.Dashboard-belowMap')).toBeDefined();
    });
  });
});
