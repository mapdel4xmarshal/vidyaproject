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
    }
    
    //initialize map
    google.maps.event.addDomListener(window, 'load', initMap);    

})();



function placePin(val,id)
{
    var _marker = 'null';
    if(checkMarkerExists(id) === 'false'){
        google.maps.event.addListener(map, 'click', function(event) {         

            _marker = new google.maps.Marker({
            position: event.latLng,
            draggable: true,
                title:id,
            map: map,
            });

             if(_marker != 'null'){
                $('#next').removeClass('disabled');   
                if($('#complete').hasClass('show')){$('#complete').removeClass('disabled');}
                markersArray.push(_marker);
                addShowMarkerInfo(_marker,val);
                doRemoveMarker(_marker);
                google.maps.event.clearListeners(map, 'click');
             }    
        return _marker;
        });
    }
    else 
    {
        $("#error").html('<div class="alert alert-danger">' +
             '<a href="#" class="close" id="error_dismiss" data-dismiss="alert" aria-label="close">&times;</a>'+
             '<span class=""><strong>App Error! '+
             '</strong> Marker already exist. Drag to modify it or double click to delete it.</span></div>'); 
        $("#error").css("z-index", '99');
    }
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
{
    var result = 'false';
    if(markersArray.length > 0)
    {
        markersArray.forEach(function(_marker,index){
            if(_marker.getTitle() == title)
                {
                    result = 'true';
                }
        });
    }
    return (result);
}

function doRemoveMarker(marker)
{
    //remove marker with rightclick event 
    google.maps.event.addListener(marker,'dblclick',function() {
        marker.setMap(null);
        
        //remove marker from array
        var markerIndex = markersArray.indexOf(marker);
        markersArray.splice(markerIndex,1);          
    }); 
}