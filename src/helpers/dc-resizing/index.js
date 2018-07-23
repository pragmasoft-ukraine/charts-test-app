export default function applyResizing(chart, adjustX = 0, adjustY = adjustX, onresize) {
  chart.width(window.innerWidth - adjustX).height(window.innerHeight - adjustY)
  window.addEventListener('resize', () => {
    console.log('On resize')
    if (onresize) {
      onresize(chart)
    }
    chart.width(window.innerWidth - 20).height(window.innerHeight - 20)

    if (chart.rescale) {
      chart.rescale()
    }
    chart.redraw()
  })
}
