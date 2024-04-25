import { useState, useEffect, useMemo } from 'react';
import { PexelsImage, PexelsResponse } from '../types';

const usePexelsImages = (apiKey: string, query: string = 'cars', perPage: number = 80) => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Avoiding unnecessary re-creation on each render
  const headers = useMemo(() => ({
    Authorization: apiKey
  }), [apiKey]);

  useEffect(() => {
    // Debounce fetch operation
    const timer = setTimeout(() => {
      const controller = new AbortController(); 
      const fetchImages = async () => {
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`;

        try {
          const response = await fetch(url, {
            headers,
            signal: controller.signal
          });

          if (!response.ok) {
            throw new Error('Failed to fetch images');
          }

          const data: PexelsResponse = await response.json();
          setImages(data.photos);
        } catch (err) {
          if (!controller.signal.aborted) {
            setError(err as Error);
          }
        } finally {
          if (!controller.signal.aborted) {
            setLoading(false);
          }
        }
      };

      fetchImages();

      return () => {
        controller.abort();
        clearTimeout(timer);
      };
    }, 300); // Debouncing for 300ms

    return () => clearTimeout(timer);
  }, [apiKey, query, perPage, headers]);

  return { images, loading, error };
};

export default usePexelsImages;
