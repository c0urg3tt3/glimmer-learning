export const UPDATE_LOCATION = 'UPDATE_LOCATION'

function updateLocation(method: string) {
  return (pathname) => ({
    type: UPDATE_LOCATION,
    payload: { method, pathname }
  })
}

export const push = updateLocation('push')
export const replace = updateLocation('replace')
export const go = updateLocation('go')
export const goForward = updateLocation('goForward')
export const goBack = updateLocation('goBack')

export default { push, replace, go, goForward, goBack }
