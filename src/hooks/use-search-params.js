import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useSearchParams(key) {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ]);

  return key ? searchParams.get(key) : searchParams;
}
