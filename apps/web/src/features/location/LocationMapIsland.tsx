import { useEffect, useMemo, useState } from "react"
import L from "leaflet"
import {
  Fuel,
  GraduationCap,
  Hospital,
  Landmark,
  ShoppingBag,
  Trees,
  type LucideIcon,
} from "lucide-react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { renderToStaticMarkup } from "react-dom/server"
import "leaflet/dist/leaflet.css"
import {
  MAP_POIS,
  NATURE_ADDRESS,
  NATURE_POSITION,
  type MapPoi,
} from "./mapData"

const ICON_BY_KEY: Record<MapPoi["icon"], LucideIcon> = {
  ShoppingBag,
  Trees,
  Fuel,
  GraduationCap,
  Hospital,
  Landmark,
}

function FitPoints() {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(
      L.latLngBounds([
        NATURE_POSITION,
        ...MAP_POIS.map((point) => point.position),
      ]),
      {
        padding: [46, 46],
        maxZoom: 14,
        animate: false,
      },
    )
  }, [map])

  return null
}

function createPointIcon(Icon: LucideIcon, label: string) {
  const icon = renderToStaticMarkup(
    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />,
  )
  return L.divIcon({
    className: "leaflet-poi-marker",
    html: `<span>${icon}</span><strong>${label}</strong>`,
    iconSize: [46, 58],
    iconAnchor: [23, 42],
    popupAnchor: [0, -42],
  })
}

function Interaction({ active }: { active: boolean }) {
  const map = useMap()

  useEffect(() => {
    const handlers = [
      map.dragging,
      map.touchZoom,
      map.doubleClickZoom,
      map.boxZoom,
      map.keyboard,
    ]
    handlers.forEach((handler) =>
      active ? handler.enable() : handler.disable(),
    )
    active ? map.scrollWheelZoom.enable() : map.scrollWheelZoom.disable()
  }, [active, map])

  return null
}

export default function LocationMapIsland() {
  const [active, setActive] = useState(false)
  const mainIcon = useMemo(
    () =>
      L.divIcon({
        className: "leaflet-nature-marker",
        html: '<span class="leaflet-nature-marker__pulse"></span><span class="leaflet-nature-marker__body"><img src="/brand/nature-symbol.svg" alt="" width="29" height="29" /></span><strong>Nature</strong>',
        iconSize: [84, 86],
        iconAnchor: [42, 65],
        popupAnchor: [0, -62],
      }),
    [],
  )

  return (
    <div
      className="leaflet-map-shell"
      aria-label="Mapa do Nature Residencial e pontos de interesse próximos"
    >
      <MapContainer
        center={NATURE_POSITION}
        zoom={14}
        scrollWheelZoom={false}
        dragging={false}
        className="leaflet-nature-map"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Interaction active={active} />
        <FitPoints />
        <Marker position={NATURE_POSITION} icon={mainIcon} zIndexOffset={1000}>
          <Popup>
            <strong>{NATURE_ADDRESS.title}</strong>
            <br />
            {NATURE_ADDRESS.lines[0]}
            <br />
            {NATURE_ADDRESS.lines[1]}
          </Popup>
        </Marker>
        {MAP_POIS.map((point) => (
          <Marker
            key={point.name}
            position={point.position}
            icon={createPointIcon(ICON_BY_KEY[point.icon], point.category)}
          >
            <Popup>
              <small>
                {point.category} · {point.distance}
              </small>
              <br />
              <strong>{point.name}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {!active && (
        <button
          type="button"
          className="map-interaction-gate"
          onClick={() => setActive(true)}
          aria-label="Ativar interação com o mapa"
        >
          <span>Clique para navegar</span>
        </button>
      )}
      <div className="map-legend" aria-label="Legenda do mapa">
        <span>
          <i className="is-nature" />
          Nature
        </span>
        <span>
          <i />
          Pontos de interesse
        </span>
      </div>
    </div>
  )
}
