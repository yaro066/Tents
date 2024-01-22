// const parsedCampground=JSON.parse(campground)
mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'cluster-map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL,
    center:campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 14, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl())

new mapboxgl.Marker({ "color": "#000000" })
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 20 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)











//     const parsedCampground = JSON.parse(campground);

// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: parsedCampground.geometry.coordinates, // starting position [lng, lat]
//     zoom: 12, // starting zoom
// });

// new mapboxgl.Marker({ "color": "#000000" })
//     .setLngLat(parsedCampground.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 })
//             .setHTML(
//                 `<h3>${parsedCampground.title}</h3><p>${parsedCampground.location}</p>`
//             )
//     )
//     .addTo(map)