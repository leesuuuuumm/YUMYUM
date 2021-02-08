import insideInstalledApp from './insideInstalledApp'

export default (width, height) => {
  if (insideInstalledApp()) {
    window.addEventListener('resize', () => {
      window.resizeTo(width, height)
    })
  }
}