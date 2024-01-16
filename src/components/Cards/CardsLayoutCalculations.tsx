export const calculateLayout = (numCols: number) => {
  const gapX = 0.3
  const gapY = 0.3
  const cardWidth = 3.1
  const cardHeight = 1.8
  const totalWidth = numCols * cardWidth + (numCols - 1) * gapX
  const xOffset = totalWidth / 2 - cardWidth / 2
  const numRows = Math.ceil(10 / numCols)

  return { cardWidth, cardHeight, xOffset, numRows, gapX, gapY }
}
