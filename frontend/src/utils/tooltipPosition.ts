export default function tooltipPosition(index: number, length: number) {
  switch (index) {
    case 0:
      return 'left'
    case length - 1:
      return 'right'
    default:
      return 'top'
  }
}
