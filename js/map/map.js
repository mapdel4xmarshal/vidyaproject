var map;
var markersArray = [];
(function(){
    
    var myCenter=new google.maps.LatLng(44.1527292,-81.0210223);
    
    
    function initMap()
    {
        var mapProp = {
          center:myCenter,
          zoom:15,
          mapTypeId:google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(document.getElementById("myMap"),mapProp);

         // pin;
       // });  
       // removeMarker(map);
    }
    
   
    
    /*
    
    function getMarkerByPosition(location)
    {
        markersArray.forEach(function(_marker,index){
            if(_marker.getPosition() == location)
                {
                    return(_marker);
                }
        });
    }
*/
    
    //initialize map
    google.maps.event.addDomListener(window, 'load', initMap);    

})();

var pin = (function()
    {
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
            if(typeof _marker != 'undefined'){markersArray.push(_marker); 
               google.maps.event.clearListeners(map, 'click');}
            return(_marker);
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
        google.maps.event.addListener(map, 'click', function(event) {
          placeMarker(event.latLng,x);}); 
    })();



function placePin(val,id)
{
    var _marker = 'null';
    if(!checkMarkerExists(id)){
        google.maps.event.addListener(map, 'click', function(event) {         

            _marker = new google.maps.Marker({
            position: event.latLng,
            draggable: true,
                title:id,
            map: map,
            });

             if(_marker != 'null'){
            $('#next').removeClass('disabled');                  
            markersArray.push(_marker); 
            addShowMarkerInfo(_marker,val);
            google.maps.event.clearListeners(map, 'click');}    
        return _marker;
        });
    }
    else alert("marker already exist. To darg to modify it or double click to delete it.");
}

function addShowMarkerInfo(marker,val)
{
    //Add info to marker
    var infowindow = new google.maps.InfoWindow({content:  val});
    
    //Open info window with click event
    google.maps.event.addListener(marker,'click',function() {
        var markerTitle = marker.getTitle();
        var titleUpdate = $(markerTitle).prop('value');
        if(titleUpdate.length > 0)
        infowindow.setContent(titleUpdate);
        infowindow.open(map,marker);
    }); 
}


function checkMarkerExists(title)
    {alert('hhh');
        markersArray.forEach(function(_marker,index){
            if(_marker.getTitle() == title)
                {
                    return(true);
                }
        });
        return false;
    }