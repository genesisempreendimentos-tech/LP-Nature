import {
  LOCATION_POIS,
  NATURE_ADDRESS,
  NATURE_POSITION,
  type LocationPoi,
  type MapPoiCategory,
} from "../../data/locationPois"

export { NATURE_ADDRESS, NATURE_POSITION, LOCATION_POIS }
export type { MapPoiCategory }

export type MapPoi = Pick<
  LocationPoi,
  "name" | "category" | "distance" | "icon" | "position"
>

/** Shape enxuta para o Leaflet (mesma fonte LOCATION_POIS). */
export const MAP_POIS: MapPoi[] = LOCATION_POIS.map(
  ({ name, category, distance, icon, position }) => ({
    name,
    category,
    distance,
    icon,
    position,
  }),
)
