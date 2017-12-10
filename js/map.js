  $.get("http://techsaferj.com.br/znoeste/api/public/Ocorrencia", function(data, status) {
      initMap(data)
  });


  function selecionarCor(_soma) {
      if (_soma > 9)
          return cor3;
      if (_soma > 4)
          return cor2;
      return cor1;
  }

  var cor1 = "#b20000";
  var cor2 = "#ea4b4b";
  var cor3 = "#edaaaa";

  var google;

  function initMap(ocorrencias) {
      // Create the map.
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: { lat: -22.8825, lng: -43.5625 },
          mapTypeId: 'terrain'
      });

      // Construct the circle for each value in citymap.
      // Note: We scale the area of the circle based on the population.
      // for (var ocorrencia in ocorrencias) {
      $.each(ocorrencias, function(index, ocorrencia) {

          var center = { lat: parseFloat(ocorrencia.latitude), lng: parseFloat(ocorrencia.longitude) };
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
              strokeColor: selecionarCor(ocorrencia.soma),
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: selecionarCor(ocorrencia.soma),
              fillOpacity: 0.3,
              map: map,
              center: center,
              radius: 3000
          });
      })

  }