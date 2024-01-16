const pexel = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1260&w=750`

const data = [
  {
    title: 'Card Title 1',
    image_url: pexel(1738986),
  },
  {
    title: 'Card Title 2',
    image_url: pexel(358574),
  },
  {
    title: 'Card Title 3',
    image_url: pexel(325185),
  },
  {
    title: 'Card Title 4',
    image_url: pexel(911738),
  },
  {
    title: 'Card Title 5',
    image_url: pexel(227675),
  },
  {
    title: 'Card Title 6',
    image_url: pexel(327482),
  },
  {
    title: 'Card Title 7',
    image_url: pexel(416430),
  },
  {
    title: 'Card Title 8',
    image_url: pexel(310452),
  },
]

export default data
