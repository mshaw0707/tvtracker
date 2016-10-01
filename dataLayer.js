var fs = require('fs');
var jsonfile = require('jsonfile');

var dataLayer = (function () {
  var file = './data.json';
  var data = jsonfile.readFileSync(file);

  this.shows = {
    all: function () {
      return data;
    },
    add: function (show) {
      data.idCounter += 1;
      show.id = data.idCounter;
      data.tvshows.push(show);
      jsonfile.writeFileSync(file, data);
    },
    delete: function(id) {
      console.log(id);
      var toDeleteIndex;
      var toDelete = data.tvshows.find(function (show, index) { toDeleteIndex = index; return show.id == id; });
      console.log(toDelete);
      console.log(toDeleteIndex);
      if (toDeleteIndex) {
        delete data.tvshows[toDeleteIndex];
        jsonfile.writeFileSync(file, data);
      }
    }
  };

  return this;
})();

module.exports = dataLayer;