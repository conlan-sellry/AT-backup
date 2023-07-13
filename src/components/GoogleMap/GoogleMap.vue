<template>
<div>
    <!--<div   v-for="(m, index) in locations">
        {{ index }} - {{ buildIcon(m) }}
    </div>-->

    <gmap-map ref="gmap"
        :center="{lat:10, lng:10}"
        :zoom="12"
        :options="options"
        style="width:100%;"
    >
            <!--<gmap-marker
                v-for="(m, index) in locations"
                :key="index"
                :icon="buildIcon(m)"
                :position="google && {lat: parseFloat(m.position.lat), lng:  parseFloat(m.position.lng)}"
                :clickable="true"
                @click="center=m.position"
                class="sb-test"
        >


            </gmap-marker>-->


    </gmap-map>
    </div>
    </template>

    <script>

import {gmapApi} from 'vue2-google-maps'

export default {
    name: "GoogleMap",
    props: {
        /*locations:{
            type: Object,
            default: () => {}
        }*/
        locations:{
            type: Object,
            default: () => {}
        }
    },

    computed: {
        google(){ return gmapApi; },
    },

    data() {
        return {
            // default to Montreal
            center: { lat: 45.508, lng: -73.587 },
            options: {
                disableDefaultUI: false,
                scrollwheel: false,
                styles: [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
]
            },
            markers: [],
            colors: {
                darkest: '#000000',
                darker: '#333131',
                dark: '#595959',
                light: '#828282',
                lighter: '#BABABA',
                lightest: '#E0E0E0',
            },
            bounds: null,
        };
    },

    mounted() {
        let self = this;
        this.$refs.gmap.$mapPromise.then((map) => {

            //


            /*let locs = this.getValidLocations();

            for(const k in locs){
                let marker = new google.maps.Marker({
                    position: map.getCenter(),
                    map: map,
                    icon: 'http://ruralshores.com/assets/marker-icon.png',
                    optimized:false,
                    //shape:{coords:[17,17,18],type:'circle'},
                });
            }*/

            self.bounds = new google.maps.LatLngBounds();

            setTimeout(
                function(){

                    self.setMarkers(map);
                    self.$refs.gmap.$mapObject.fitBounds(self.bounds);


                },
                2000
            )
        });
    },

    methods: {
        setMarkers() {
            const self = this;
            //@TODO - needs proper checks here, much better checks needed, especially for lat/lng
            Object.entries(this.locations).forEach(function(marker) {
                if(!isNaN(marker[1]['position']['lat']) && marker[1]['position']['lat'] !== 0 &&
                    !isNaN(marker[1]['position']['lng']) && marker[1]['position']['lng'] !== 0){
                    self.setMarker(marker[1]['position'], marker[1]['color']);
                }
            });
        },
        setMarker(coords, color) {
            let circle = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7.5,
                fillColor: this.getColor(color),
                fillOpacity: 1,
                strokeWeight: 0
            };


            const marker = new google.maps.Marker({
                position: {
                    //id: coords.id,
                    lat: coords.lat,
                    lng: coords.lng,
                    //title: coords.title
                },
                map: this.$refs.gmap.$mapObject,
                icon: circle,
                //title: coords.title,
                opacity: 1
            });

            this.markers.push(marker);

            if(this.bounds){
                this.bounds.extend(coords);
            }
            //this.addMarkerClickEvent(marker, coords);

        },

        getColor(colorDesc){
            let color = null;
            if(Object.prototype.hasOwnProperty.call(this.colors, colorDesc)){
                color = this.colors[colorDesc];
            }
            return color;
        },

        /*fitMapToBounds(map){
            const latlngbounds = new google.maps.LatLngBounds();
            let locs = this.getValidLocations();
            for (let key in locs) {
                if(Object.prototype.hasOwnProperty.call(locs, key)){
                    latlngbounds.extend(locs[key].position);
                }
            }
            map.fitBounds(latlngbounds);
        },
        */

        getValidLocations(){//@TODO - check coord here, move to mixin (repeated)
            const fields = this.locations;
            let validFields = {};
            for (let key in fields){
                if(fields.hasOwnProperty(key)){
                    if(fields[key].hasOwnProperty('value')){
                        if(typeof fields[key]['value'] !== 'undefined') {
                            if (fields[key]['value'] !== '') {
                                validFields[key] = fields[key];
                            }
                        }
                    }
                }
            }
            return validFields;
        },

    }
};
</script>
