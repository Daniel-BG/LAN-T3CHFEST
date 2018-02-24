
          var map, heatmap;
          var hitMapPoints = [];
          var madridPosition = {
              lat: 40.413067,
              lng: -3.705405
          };

          function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 13,
              center: madridPosition,
              mapTypeId: 'satellite'
            });

            $.ajax({
                method: "GET",
                url: "./api/school/pre",
                contentType: "application/json"
            })
            .done(function(data) {
                for (const d of data) {
                    const infowindow = new google.maps.InfoWindow({
                        content: d.info
                    });

                    let marker = new google.maps.Marker({
                        position: {
                            lat: d.lat,
                            lng: d.lng
                        },
                        map: map,
                        title: d.title,
                        icon: 'http://maps.google.com/mapfiles/kml/pal2/icon14.png'
                    });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                }
            });


            $.ajax({
                method: "GET",
                url: "./api/air",
                contentType: "application/json"
            })
            .done(function(data) {
                for (const d of data) {
                    const infowindow = new google.maps.InfoWindow({
                        content: d.estacion
                    });

                    let marker = new google.maps.Marker({
                        position: {
                            lat: d.lat,
                            lng: d.lng
                        },
                        map: map,
                        title: d.estacion,
                        icon: './images/sensor.png'
                    });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });

                    const polSix = d.pollutants.filter(e => e.effect_id === 6);
                    if (polSix.length) {
                        // Heap map
                        for (let i = 0; i < Math.floor(1000 * polSix[0].avg); i++) {
                            const range = 0.1;
                            hitMapPoints.push(
                                new google.maps.LatLng(d.lat + (Math.random() - 0.5) * range, d.lng + (Math.random() - 0.5) * range)
                            );
                        }
                    }
                }

                heatmap = new google.maps.visualization.HeatmapLayer({
                    data: getPoints(),
                    map: map
                });
                changeRadius();
                changeOpacity();
            });

            $.ajax({
                method: "GET",
                url: "./api/school/primary",
                contentType: "application/json",
                data: JSON.stringify({name: name })
            })
            .done(function(data) {
                for (const d of data) {
                    const infowindow = new google.maps.InfoWindow({
                        content: d.info
                    });

                    let marker = new google.maps.Marker({
                        position: {
                            lat: d.lat,
                            lng: d.lng
                        },
                        map: map,
                        title: d.title,
                        icon: './images/primary.png'
                    });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                }
            });
          }
    
          function toggleHeatmap() {
            heatmap.setMap(heatmap.getMap() ? null : map);
          }
    
          function changeGradient() {
            var gradient = [
              'rgba(0, 255, 255, 0)',
              'rgba(0, 255, 255, 1)',
              'rgba(0, 191, 255, 1)',
              'rgba(0, 127, 255, 1)',
              'rgba(0, 63, 255, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 0, 223, 1)',
              'rgba(0, 0, 191, 1)',
              'rgba(0, 0, 159, 1)',
              'rgba(0, 0, 127, 1)',
              'rgba(63, 0, 91, 1)',
              'rgba(127, 0, 63, 1)',
              'rgba(191, 0, 31, 1)',
              'rgba(255, 0, 0, 1)'
            ]
            heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
          }
    
          function changeRadius() {
            heatmap.set('radius', heatmap.get('radius') ? null : 30);
          }
    
          function changeOpacity() {
            heatmap.set('opacity', heatmap.get('opacity') ? null : 0.3);
          }
    
          // Heatmap data: 500 Points
          function getPoints() {
              return hitMapPoints;
            // return [
            //   new google.maps.LatLng(37.782551, -122.445368)
            // ];
          }