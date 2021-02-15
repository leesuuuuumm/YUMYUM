function distance2(coords1, coords2) {
    const { lat: lat1, lon: lon1 } = coords1;
    const { lat: lat2, lon: lon2 } = coords2;
    const degToRad = x => x * Math.PI / 180;
    const R = 6371;
    const halfDLat = degToRad(lat2 - lat1) / 2;  
    const halfDLon = degToRad(lon2 - lon1) / 2;  
    const a = Math.sin(halfDLat) * Math.sin(halfDLat) + 
              Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
              Math.sin(halfDLon) * Math.sin(halfDLon);  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; 
}
const paris = { lat: 48.864716, lon: 2.349014 };
const newYork = { lat: 40.730610, lon: -73.935242 };
console.log(distance(paris, newYork), 'km');



// const shopsNearMe = shopLocations.filter(shop => distance(shop.coords, myLocation) <= 0.1);



export function distance(coords1, coords2) {
    const { x: lat1, y: lon1 } = coords1;
    const { x: lat2, y: lon2 } = coords2;
    const degToRad = x => x * Math.PI / 180;
    const R = 6371;
    const halfDLat = degToRad(lat2 - lat1) / 2;  
    const halfDLon = degToRad(lon2 - lon1) / 2;  
    const a = Math.sin(halfDLat) * Math.sin(halfDLat) + 
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
            Math.sin(halfDLon) * Math.sin(halfDLon);  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; 
}