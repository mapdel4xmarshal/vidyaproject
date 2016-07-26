(function(){
    var map;
    var myCenter=new google.maps.LatLng(44.1527292,-81.0210223);
    var markersArray = [];
    
    function initMap()
    {
        var mapProp = {
          center:myCenter,
          zoom:15,
          mapTypeId:google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(document.getElementById("myMap"),mapProp);

        google.maps.event.addListener(map, 'click', function(event) {
          placeMarker(event.latLng,x);
        });  
        removeMarker(map);
    }
    
    function placeMarker(location, val) {
      var marker = createMarker(location);
        
      var infowindow = new google.maps.InfoWindow({
        content:  val
      });     
        
         //Open info window with click event
        google.maps.event.addListener(marker,'click',function() {
            infowindow.open(map,marker);
        });      
        
        //remove marker with rightclick event 
        google.maps.event.addListener(marker,'dblclick',function() {
            marker.setMap(null);
            removeMarker(marker);            
        }); 
    }
    
    function removeMarker(theMarker)
    { 
        //remove marker from array
        var markerIndex = markersArray.indexOf(theMarker);
        markersArray.splice(markerIndex,1);
    }   


    function createMarker(location)
    {
        var _marker = new google.maps.Marker({
            position: location,
            draggable: true,
            map: map,
            });
        if(typeof _marker != 'undefined')markersArray.push(_marker); 
        return(_marker);
    }
    
    function getMarkerByPosition(location)
    {
        markersArray.forEach(function(_marker,index){
            if(_marker.getPosition() == location)
                {
                    return(_marker);
                }
        });
    }
    
    //initialize map
    google.maps.event.addDomListener(window, 'load', initMap);    

})();