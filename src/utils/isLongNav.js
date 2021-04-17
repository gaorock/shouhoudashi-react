export default function isLongNav(historyLength, windowHeight) {
  const agent = window.navigator.userAgent;
  const isiPhone = agent.match(/iphone/ig);
  // uses device screen size determine iPhone model
  const isWideEnough = window.screen.availHeight >= 812 && window.screen.availWidth >= 375;
  const isDepthEnough = window.screen.colorDepth >= 32 || window.screen.pixelDepth >= 32;
  const isSizeGood = isWideEnough && isDepthEnough;
  // detect PWA
  const isPWA = window.matchMedia('(display-mode: standalone)').matches
  const isXPlus = isiPhone && isSizeGood;
  // determine if inside WX
  const isWx = agent.match(/micromessenger/ig)

  const isEqual = windowHeight === window.innerHeight
  const isIncrease = windowHeight < window.innerHeight
  


  if (isXPlus && (isPWA || (isWx && historyLength < 2) || isIncrease || (!isWx && !isIncrease && !isEqual))) return true
}