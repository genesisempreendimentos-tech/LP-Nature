import { useEffect, useMemo, useState } from "react"
import L from "leaflet"
import { Fuel, GraduationCap, Hospital, Landmark, ShoppingBag, Trees, type LucideIcon } from "lucide-react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { renderToStaticMarkup } from "react-dom/server"
import "leaflet/dist/leaflet.css"

const NATURE_POSITION: [number, number] = [-22.4372, -42.9822]

const points = [
  { name: "Praça Higino da Silveira e Feirinha do Alto", category: "Comércio", distance: "850 m", icon: ShoppingBag, position: [-22.4424823, -42.9795707] as [number, number] },
  { name: "Parque Nacional da Serra dos Órgãos", category: "Natureza", distance: "2,7 km", icon: Trees, position: [-22.4490611, -42.984843] as [number, number] },
  { name: "Acesso à Rodovia Santos Dumont, BR-116", category: "Rodovia", distance: "3,2 km", icon: Fuel, position: [-22.4520441, -42.9535164] as [number, number] },
  { name: "Centro Universitário Serra dos Órgãos, UNIFESO", category: "Faculdade", distance: "350 m", icon: GraduationCap, position: [-22.4408416, -42.9781593] as [number, number] },
  { name: "Hospital das Clínicas de Teresópolis", category: "Saúde", distance: "4,7 km", icon: Hospital, position: [-22.3984312, -42.9607314] as [number, number] },
  { name: "Avenida Alberto Torres", category: "Acessos", distance: "500 m", icon: Landmark, position: [-22.4264508, -42.9801246] as [number, number] },
]

function FitPoints() {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(L.latLngBounds([NATURE_POSITION, ...points.map((point) => point.position)]), {
      padding: [46, 46],
      maxZoom: 14,
      animate: false,
    })
  }, [map])

  return null
}

function createPointIcon(Icon: LucideIcon, label: string) {
  const icon = renderToStaticMarkup(<Icon size={17} strokeWidth={1.8} aria-hidden="true" />)
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
    const handlers = [map.dragging, map.touchZoom, map.doubleClickZoom, map.boxZoom, map.keyboard]
    handlers.forEach((handler) => active ? handler.enable() : handler.disable())
    active ? map.scrollWheelZoom.enable() : map.scrollWheelZoom.disable()
  }, [active, map])

  return null
}

export default function LocationMap() {
  const [active, setActive] = useState(false)
  const mainIcon = useMemo(() => L.divIcon({
    className: "leaflet-nature-marker",
    html: '<span class="leaflet-nature-marker__pulse"></span><span class="leaflet-nature-marker__body"><img src="/brand/nature-symbol.svg" alt="" /></span><strong>Nature</strong>',
    iconSize: [84, 86],
    iconAnchor: [42, 65],
    popupAnchor: [0, -62],
  }), [])

  return (
    <div className="leaflet-map-shell" aria-label="Mapa do Nature Residencial e pontos de interesse próximos">
      <MapContainer center={NATURE_POSITION} zoom={14} scrollWheelZoom={false} dragging={false} className="leaflet-nature-map">
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        <Interaction active={active} />
        <FitPoints />
        <Marker position={NATURE_POSITION} icon={mainIcon} zIndexOffset={1000}>
          <Popup><strong>Nature Residencial</strong><br />Rua Hidelgardo de Noronha, 1516<br />Alto, Teresópolis</Popup>
        </Marker>
        {points.map((point) => (
          <Marker key={point.name} position={point.position} icon={createPointIcon(point.icon, point.category)}>
            <Popup><small>{point.category} · {point.distance}</small><br /><strong>{point.name}</strong></Popup>
          </Marker>
        ))}
      </MapContainer>
      {!active && (
        <button className="map-interaction-gate" onClick={() => setActive(true)} aria-label="Ativar interação com o mapa">
          <span>Clique para navegar</span>
        </button>
      )}
      <div className="map-legend" aria-label="Legenda do mapa">
        <span><i className="is-nature" />Nature</span>
        <span><i />Pontos de interesse</span>
      </div>
    </div>
  )
}
