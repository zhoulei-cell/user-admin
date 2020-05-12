
export const pZone = (s) => {
  return s < 10 ? '0' + s : s
}

export const toFormat = (value) => {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = pZone(date.getMonth() + 1)
  const day = pZone(date.getDate())
  const hours = pZone(date.getHours())
  const minutes = pZone(date.getMinutes())
  const seconds = pZone(date.getSeconds())
  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return time
}
