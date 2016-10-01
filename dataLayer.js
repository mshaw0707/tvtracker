var fs = require('fs');
var jsonfile = require('jsonfile');

var dataLayer = (function () {
  var file = './data.json';
  var data = jsonfile.readFileSync(file);

  this.shows = {
    all: function () {
      return data.tvshows.sort(function (a, b) { return a.name > b.name; });
    },
    add: function (show) {
      data.idCounter += 1;
      show.id = data.idCounter;
      data.tvshows.push(show);
      jsonfile.writeFileSync(file, data);
    },
    delete: function(id) {
      var toDeleteIndex;

      var toDelete = data.tvshows.find(function (show, index) { 
        if (show.id == id) toDeleteIndex = index; 
        return show.id == id; 
      });

      if (toDeleteIndex) {
        data.tvshows.splice(toDeleteIndex, 1);
        jsonfile.writeFileSync(file, data);
      }
    }
  };

  return this;
})();

module.exports = dataLayer;