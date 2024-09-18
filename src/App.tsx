import { MapView, useMapData, useMap, Label } from '@mappedin/react-sdk';
import '@mappedin/react-sdk/lib/esm/index.css';
import { Coordinate, MapView as MapViewType, Space, TNavigationTarget } from '@mappedin/react-sdk/mappedin-js/src';
import AutocompleteSearch from './components/AutocompleteSearch';
import { useState, useEffect } from 'react';

// Helper function to add labels to all spaces
const addLabelsToSpaces = (spaces: Array<Space>, mapView: MapViewType) => {
  spaces.forEach((space) => {
    if (space.name) {
      mapView.Labels.add(space, space.name);
    }
  });
};

// Helper function to draw path
const drawPath = (mapView: MapViewType, start: TNavigationTarget, destination: TNavigationTarget) => {
  const directions = mapView.getDirections(start, destination);
  mapView.Paths.removeAll(); // Remove all paths
  if (directions) {
    mapView.Navigation.draw(directions, {
      pathOptions: {
        nearRadius: 1,
        farRadius: 1,
      },
    });
  }
};

// Helper function to animate camera to a given location
const animateCamera = (
  mapView: MapViewType,
  center: Coordinate,
  bearing = -95,
  pitch = 50,
  zoomLevel = 19,
  duration = 1000
) => {
  mapView.Camera.animateTo({ bearing, pitch, zoomLevel, center }, { duration });
};

function MapComponent() {
  const [isRouteOn, setIsRouteOn] = useState(false);
  const { mapData, mapView } = useMap();
  const spaces = mapData.getByType('space');
  const startingPoint = spaces.find(({ name }) => name === 'Plazoleta Principal');

  useEffect(() => {
    if (startingPoint) {
      // Initialize camera when component mounts
      animateCamera(mapView, startingPoint.center);
    }
  }, [startingPoint, mapView]);

  useEffect(() => {
    // Add labels to all spaces when component mounts
    addLabelsToSpaces(spaces, mapView);

    // Handle click events for navigation
    mapView.on('click', (event) => {
      const clickedLocation = event.coordinate;
      if (clickedLocation && startingPoint) {
        setIsRouteOn(true);
        drawPath(mapView, startingPoint, clickedLocation);
      }
    });
  }, [mapView, spaces, startingPoint]);

  // Search logic for directions
  const goToSelectedDirection = (searchValue: string) => {
    const searchPoint = spaces.find(({ name }) => name === searchValue);
    if (searchPoint && startingPoint) {
      drawPath(mapView, startingPoint, searchPoint);
      setIsRouteOn(true);
    }
  };

  // Handle removing paths
  const handleRemovePath = () => {
    setIsRouteOn(false);
    mapView.Paths.removeAll();
  };

  return (
    <>
      <div className='fixed w-2/6 top-10 left-10'>
        <AutocompleteSearch
          searchData={spaces.map(({ name }) => name).filter(Boolean)} // Pass all space names to AutocompleteSearch
          handleClick={goToSelectedDirection}
          handleRemovePath={handleRemovePath}
          isRouteOn={isRouteOn}
        />
      </div>
      {spaces.map((space) => (
        <Label key={space.id} target={space.center} text={space.name} />
      ))}
    </>
  );
}

export default function App() {
  const { isLoading, error, mapData } = useMapData({
    key: import.meta.env.VITE_MAPPEDIN_API_KEY,
    secret: import.meta.env.VITE_MAPPEDIN_API_KEY_SECRET,
    mapId: import.meta.env.VITE_MAPPEDIN_MAP_ID,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <MapView mapData={mapData}>
      <MapComponent />
    </MapView>
  ) : null;
}
