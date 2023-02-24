var geocoder;
var map;
var address = "UCI Irvine Aldrich Park";
const hm = new Map();

const UCI_BOUNDS = {
  west: -117.876057,
  south: 33.620309,
  east: -117.794758,
  north: 33.673386,
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: -34.397, lng: 150.644},
    disableDefaultUI: true,
    restriction: {
      latLngBounds: UCI_BOUNDS,
      strictBounds: false,
    },
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    styles: [ 
      { 
        "featureType": "poi", 
        "stylers": [ 
          { "visibility": "off" } 
        ] 
      },
      {
        "featureType": "poi.park",
        "stylers": [
          { "visibility": "simplified"}
        ]
      }
    ]
    
  });

  geocoder = new google.maps.Geocoder();
  codeAddress();
  

}

function codeAddress() {
  geocoder.geocode({'address': "UCI Aldrich Park"}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
    
  });
  
}

// the smooth zoom function
function animateMapZoomTo(map, targetZoom) {
  var currentZoom = arguments[2] || map.getZoom();
  if (currentZoom != targetZoom) {
      google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
          animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
      });
      setTimeout(function(){ map.setZoom(currentZoom) }, 80);
  }
}


function addMarker(location, title, name, code){
  geocoder.geocode({'address': location}, function(results, status) {
  var latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
  if (status === 'OK') {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: title,
      
      // label:{
      //   text: name,
      //   fontSize: '12px',
      //   className: 'marker-position',
      //   color:'rgb(188, 14, 14)',

      // }
    });

    marker.addListener("click", () => {
      map.panTo(marker.getPosition());
      animateMapZoomTo(map, 20);
    
    });
    
    
    hm.set(code, marker);
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }

  
  });
}
function removeMarker(code){
  hm.get(code).setMap(null);

}
  
