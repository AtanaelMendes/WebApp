<template>
  <ap-modal ref="delimitAreaModal" title="Delimitar Área" :visible="isModalOpened" @hide="closeModal" >

    <div slot="content" class="q-mx-lg q-mb-lg" >
      <div id="map"></div>
      <svg id="svg" height="300" width="400" preserveAspectRatio="xMinYMin meet"></svg>
    </div>

    <div class="text-right" slot="footer">
      <q-btn @click.native="closeModal" flat color="primary" label="Cancelar" class="q-mr-xs"/>
      <q-btn @click.native="" flat label="Salvar" color="primary"/>
    </div>
  </ap-modal>
</template>

<script>
  import apModal from 'components/ApModal'
  import GoogleMapsLoader from 'google-maps'
  export default {
    name: "DelimitAreaModal",
    components: {
      apModal
    },
    data(){
      return {
        isModalOpened: false,
        map: null,
      }
    },
    methods: {
      openModal(safra) {
        this.isModalOpened = true;
        this.initMap();
      },
      closeModal() {
        this.isModalOpened = false;

        GoogleMapsLoader.release(function() {
          console.log('No google maps api around');
        });
      },
      initMap() {
        GoogleMapsLoader.KEY = 'AIzaSyBa2bts8RIUGUc43dYUB90J8XFtURaW_5w';
        GoogleMapsLoader.LIBRARIES = ['drawing'];
        GoogleMapsLoader.VERSION = '3.34';

        GoogleMapsLoader.load(function(google) {
          var uluru = {lat: -25.344, lng: 131.036};

          this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: uluru
          });

          var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon']
            },
            polygonOptions: {
              editable: true,
            }
          });

          drawingManager.setMap(this.map);

          var infowindow = new google.maps.InfoWindow();
          var polygonObj = null;

          google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            polygonObj = polygon;
            computeArea(polygon, this.map);
            renderPolgon(polygon);

            polygon.getPaths().forEach(function(path, index){
              google.maps.event.addListener(path, 'insert_at', function(){
                computeArea(polygon, this.map)
                renderPolgon(polygon);
              }.bind(this));

              google.maps.event.addListener(path, 'remove_at', function(){
                computeArea(polygon, this.map)
                renderPolgon(polygon);
              }.bind(this));

              google.maps.event.addListener(path, 'set_at', function(){
                computeArea(polygon, this.map)
                renderPolgon(polygon);
              }.bind(this));

            }.bind(this));


          });

          function computeArea(polygon, map){
            console.log('computeArea', polygon.getPaths().getArray()[0].length)
            var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
            var areaInHectare = area / 10000;
            infowindow.setContent("Área: " + areaInHectare.toFixed(2) + " Ha.");
            infowindow.setPosition(polygon.getPath().getAt(0));
            infowindow.open(map);
          }

          function renderPolgon(polygon){
            var paths = []; polygon.getPaths().forEach(function (x) { paths.push(x.getArray()); });

            var svgProps = poly_gm2svg(paths, function (latLng) {
              return {
                lat: latLng.lat(),
                lng: latLng.lng()
              }
            });
            drawPoly(document.getElementById('svg'), svgProps)
          }

          function latLng2point(latLng) {

            return {
              x: (latLng.lng + 180) * (256 / 360),
              y: (256 / 2) - (256 * Math.log(Math.tan((Math.PI / 4) + ((latLng.lat * Math.PI / 180) / 2))) / (2 * Math.PI))
            };
          }

          function poly_gm2svg(gmPaths, fx) {
            var point,
              gmPath,
              svgPath,
              svgPaths = [],
              minX = 256,
              minY = 256,
              maxX = 0,
              maxY = 0;

            for (var pp = 0; pp < gmPaths.length; ++pp) {
              gmPath = gmPaths[pp], svgPath = [];
              for (var p = 0; p < gmPath.length; ++p) {
                point = latLng2point(fx(gmPath[p]));
                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);
                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);
                svgPath.push([point.x, point.y].join(','));
              }


              svgPaths.push(svgPath.join(' '))


            }
            return {
              path: 'M' + svgPaths.join('z M') + 'z',
              x: minX,
              y: minY,
              width: maxX - minX,
              height: maxY - minY
            };

          }

          function drawPoly(node, props) {

            var svg = node.cloneNode(false),
              g = document.createElementNS("http://www.w3.org/2000/svg", 'g'),
              path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            node.parentNode.replaceChild(svg, node);
            path.setAttribute('d', props.path);
            g.appendChild(path);
            svg.appendChild(g);
            svg.setAttribute('viewBox', [props.x, props.y, props.width, props.height].join(' '));


          }
        }.bind(this))

      }
    },
    mounted(){

    }
  }
</script>

<style >
  #map {
    height: 400px;  /* The height is 400 pixels */
    width: 400px;  /* The width is the width of the web page */
  }

  #svg {
    margin-top: 20px;
    background:#c0ecae;
  }
  g {
    fill:#86a579;
  }
</style>
