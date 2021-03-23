
export const parseMsg = msg => {
  const { body } = JSON.parse(msg.data)
  return JSON.parse(body)
}
