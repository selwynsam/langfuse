import { useEffect, useState } from "react";

const playgroundCacheKey = "customPlaygroundCache";

export type CustomPlaygroundCache = any;

export default function useCustomPlaygroundCache() {
  const [cache, setCache] = useState<CustomPlaygroundCache>(null);
  const setPlaygroundCache = (cache: CustomPlaygroundCache) => {
    sessionStorage.setItem(playgroundCacheKey, JSON.stringify(cache));
  };

  useEffect(() => {
    const savedCache = sessionStorage.getItem(playgroundCacheKey);
    if (savedCache) {
      try {
        setCache(JSON.parse(savedCache));
      } catch (e) {
        console.error("Failed to parse playground cache", e);
      }
    }
  }, []);

  return {
    playgroundCache: cache,
    setPlaygroundCache: setPlaygroundCache,
  };
}
