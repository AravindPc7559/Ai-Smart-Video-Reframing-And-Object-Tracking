import { useEffect, useRef } from 'react'
import { Canvas, Rect } from 'fabric'
import { cn } from '@/shared/utils/helpers'

const CONTROLS_HEIGHT = 48

export type BoundingBox = {
  x: number
  y: number
  width: number
  height: number
}

export type VideoBoundingBoxSelectorProps = {
  videoUrl: string
  onBBoxChange: (bbox: BoundingBox | null) => void
  className?: string
}

export function VideoBoundingBoxSelector({
  videoUrl,
  onBBoxChange,
  className,
}: VideoBoundingBoxSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<Canvas | null>(null)
  const rectRef = useRef<Rect | null>(null)
  const startRef = useRef<{ x: number; y: number } | null>(null)
  const onBBoxChangeRef = useRef(onBBoxChange)
  onBBoxChangeRef.current = onBBoxChange

  useEffect(() => {
    const container = containerRef.current
    const canvasEl = canvasRef.current
    if (!container || !canvasEl) return

    const width = container.offsetWidth
    const height = Math.max(0, container.offsetHeight - CONTROLS_HEIGHT)
    if (width <= 0 || height <= 0) return

    const canvas = new Canvas(canvasEl, {
      width,
      height,
      selection: true,
      preserveObjectStacking: true,
    })
    fabricRef.current = canvas

    const removeRect = () => {
      const rect = rectRef.current
      if (canvas && rect) {
        canvas.remove(rect)
        rectRef.current = null
        onBBoxChangeRef.current(null)
      }
    }

    const notifyBBox = (rect: Rect) => {
      const left = rect.left ?? 0
      const top = rect.top ?? 0
      const w = rect.width ?? 0
      const h = rect.height ?? 0
      if (w > 0 && h > 0) {
        onBBoxChangeRef.current({ x: Math.round(left), y: Math.round(top), width: Math.round(w), height: Math.round(h) })
      }
    }

    type PointerEvt = MouseEvent | TouchEvent | PointerEvent

    const getPoint = (e: { scenePoint?: { x: number; y: number }; e?: PointerEvt }) => {
      if (e.scenePoint) return e.scenePoint
      if (e.e) return canvas.getScenePoint(e.e)
      return null
    }

    const onMouseDown = (e: { target?: unknown; scenePoint?: { x: number; y: number }; e?: PointerEvt }) => {
      const rect = rectRef.current
      if (rect && e.target === rect) {
        canvas.setActiveObject(rect)
        canvas.requestRenderAll()
        return
      }
      const pointer = getPoint(e)
      if (!pointer) return
      removeRect()
      startRef.current = { x: pointer.x, y: pointer.y }
      const newRect = new Rect({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
        fill: 'rgba(59, 130, 246, 0.2)',
        stroke: 'rgb(59, 130, 246)',
        strokeWidth: 2,
        selectable: false,
        evented: false,
      })
      canvas.add(newRect)
      rectRef.current = newRect
      canvas.requestRenderAll()
    }

    const onMouseMove = (e: { scenePoint?: { x: number; y: number }; e?: PointerEvt }) => {
      const movingRect = rectRef.current
      const start = startRef.current
      if (!movingRect || !start) return
      const pointer = getPoint(e)
      if (!pointer) return
      const x = Math.min(start.x, pointer.x)
      const y = Math.min(start.y, pointer.y)
      const w = Math.abs(pointer.x - start.x)
      const h = Math.abs(pointer.y - start.y)
      movingRect.set({ left: x, top: y, width: w, height: h })
      movingRect.setCoords()
      canvas.requestRenderAll()
    }

    const onMouseUp = () => {
      const currentRect = rectRef.current
      const start = startRef.current
      if (!currentRect || !start) return
      const w = currentRect.width ?? 0
      const h = currentRect.height ?? 0
      if (w > 2 && h > 2) {
        currentRect.set({
          selectable: true,
          evented: true,
          hasControls: true,
          hasBorders: true,
        })
        currentRect.setCoords()
        canvas.setActiveObject(currentRect)
        notifyBBox(currentRect)
      } else {
        removeRect()
      }
      startRef.current = null
      canvas.requestRenderAll()
    }

    const onObjectModified = () => {
      const rect = rectRef.current
      if (rect) notifyBBox(rect)
    }

    canvas.on('mouse:down', onMouseDown)
    canvas.on('mouse:move', onMouseMove)
    canvas.on('mouse:up', onMouseUp)
    canvas.on('object:modified', onObjectModified)

    const resizeObserver = new ResizeObserver(() => {
      const w = container.offsetWidth
      const h = Math.max(0, container.offsetHeight - CONTROLS_HEIGHT)
      if (w > 0 && h > 0) {
        canvas.setDimensions({ width: w, height: h })
        canvas.requestRenderAll()
      }
    })
    resizeObserver.observe(container)

    return () => {
      canvas.off('mouse:down', onMouseDown)
      canvas.off('mouse:move', onMouseMove)
      canvas.off('mouse:up', onMouseUp)
      canvas.off('object:modified', onObjectModified)
      resizeObserver.disconnect()
      canvas.dispose()
      fabricRef.current = null
      rectRef.current = null
      startRef.current = null
    }
  }, [videoUrl])

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden rounded-lg bg-slate-900', className)}
      style={{ paddingTop: '56.25%' }}
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-contain"
          src={videoUrl}
          controls
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="absolute left-0 right-0 top-0 w-full cursor-crosshair"
          style={{ bottom: CONTROLS_HEIGHT, pointerEvents: 'auto' }}
        />
      </div>
    </div>
  )
}
