
// npm i node-cache

import NodeCache from 'node-cache';

const cache = new NodeCache();

// Cache data for a specific key
const setCache = (key, data, ttl = 60) => {
  cache.set(key, data, ttl);
};

// Retrieve cached data for a specific key
const getCache = (key) => {
  return cache.get(key);
};

export { setCache, getCache };