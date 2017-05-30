let lat = null;
let lng = null;

let getCords = () => {
  return new Promise((resolve) => {
    return navigator.geolocation.getCurrentPosition(function(location) {
      lat = location.coords.latitude;
      lng = location.coords.longitude;
      console.log('gps: ', lat, lng);
      resolve({lat, lng});
    }, function(err) {
      if (lat === null || lng === null) {
        console.log('gps err: ', err);
        resolve(getCords());
      } else {
        // if timeout, use previous avaiblable GPS cords.
        console.log('previous gps: ', lat, lng);
        resolve({lat, lng});
      }
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  })
};

exports.getGpsCord = () => {
  // Get current location.
  return getCords();
}