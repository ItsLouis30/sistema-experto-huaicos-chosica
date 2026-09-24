// Cliente HTTP del Módulo de Interfaz de Usuario hacia el backend FastAPI.
const API_BASE = import.meta.env.VITE_API_URL ?? ''

export async function evaluarRiesgo(datos) {
  const res = await fetch(`${API_BASE}/api/evaluar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) {
    const detalle = await res.json().catch(() => ({}))
    throw new Error(
      Array.isArray(detalle.detail)
        ? detalle.detail.map((d) => `${d.loc?.at(-1)}: ${d.msg}`).join(' · ')
        : detalle.detail || `Error ${res.status} al consultar el motor`,
    )
  }
  return res.json()
}

export async function verificarEstado() {
  try {
    const res = await fetch(`${API_BASE}/api/salud`)
    return res.ok
  } catch {
    return false
  }
}
