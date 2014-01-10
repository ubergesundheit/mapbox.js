var map, 
    mapid = 'examples.map-9ijuk24y',
    options = ['zoom', 'noscroll'],
    unique = (App && App.user && App.currentmap) ? App.currentmap : mapid;

function updateCode(data) {
  
    var code = "var map = L.mapbox.map('map', '<strong>" + unique + "</strong>'";
    if (!data.length) {
      code += ');';  
    } else {

      if (_(options).indexOf('zoom') !== 0 ||
          _(options).indexOf('noscroll') === 0) {
        code += ', {\n';
      }

      if (_(options).indexOf('zoom') === 0) {
        code += '\tzoomControl: false\n';
      }

      if (_(options).indexOf('noscroll') === 0) {
        code += '\tscrollWheelZoom: false\n';
      }

      if (_(options).indexOf('search') === 0)
      if (_(options).indexOf('share') === 0)
      if (_(options).indexOf('markers') === 0)

      code += '});';
    }

  $('#output').html(code);
}

function removeControl(prop) {
  if (map[prop]) {
      map.removeControl(map[prop]);
      delete map[prop];
  }
}

function load() {
  map = L.mapbox.map('map-example', mapid, {
      scrollWheelZoom: false
  });

  $('.toggle-options a').click(function() {
    var option = $(this).data('option');

    if ($(this).is('.active')) {
      $(this).removeClass('active');
      $(this).find('.icon')
        .removeClass('fill-green')
        .addClass('fill-darken0');

      options = _(options).without(option);
      removeControl(option);
    } else {
      $(this).addClass('active');
      $(this).find('.icon')
        .removeClass('fill-darken0')
        .addClass('fill-green');

      switch (option) {
        case 'zoom':
        break;
        case 'noscroll':
        break;
        case 'search':
          map.addControl(L.mapbox.geocoderControl(unique));
        break;
        case 'share':
          map.addControl(L.mapbox.shareControl());
        break;
        case 'markers':
        break;
      }

      options.push(option);
    }

    updateCode(options);
    return false;
  });

  updateCode(options);
}

$(load);
