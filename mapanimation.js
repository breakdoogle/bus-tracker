mapboxgl.accessToken = 'pk.eyJ1IjoiYnJlYWtkb29nbGUiLCJhIjoiY2w5M2lwNDIwMWFpejNwbjNic3pvdzBodyJ9.VpP8LtRd1Af2OdlGWN9eig';

    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 13
    });

    const markers = [];

    async function addMarkers(){
        const locations = await getBusLocations();
        locations.forEach(function(bus){
            const marker = getMarker(bus.id);
            if (marker){
                moveMarker(marker,bus);
            }
            else{
                addMarkers(bus);
            }
        });

        console.log(new Date());
        setTimeout(addMarkers,15000);

    async function getBusLocations(){
        const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
        const response = await fetch(url);
        const json     = await response.json();
        return json.data;
    }

    function addMarker(bus){
        const icon = getIcon(bus);
        const marker = new mapboxgl.Marker({
            position: {
                lat: bus.attributes.latitude,
                lng: bus.attributes.longitude
            },
            map: map,
            icon: icon,
            id: bus.id
        });
        addMarkers.push(marker);
    }

    function getIcon(bus){
        if (bus.attributes.direction_id === 0) {
            return "red.png";
        }
        return "blue.png"
    }

    function moveMarker(marker,bus) {
        const icon = getIcon(bus);
        marker.setIcon(icon);
        marker.setPosition( {
            lat: bus.attributes.latitude,
            lng: bus.attributes.longitude
        });
    }

    function getMarker(id){
        const marker = markers.find(function(item){
            return item.id === id;
        });
        return marker;
    }