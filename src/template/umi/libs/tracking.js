
import * as queryString from 'query-string';

const setTracking = async () => {
    const url = new URL(window.location.href);
    let query = queryString.parse(url.search.replace('?', ''));;
    delete query.afid
    let TrackingCache = localStorage.getItem("TrackingCache");
    if (Object.keys(query).length > 0 && window.location.href != TrackingCache) {
        localStorage.setItem("TrackingCache", window.location.href);
    }
}

const getTracking = () => localStorage.getItem("TrackingCache");

export {
    setTracking,
    getTracking
}
