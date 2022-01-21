export const Badge_Classe = "m-2 badge bg-"

export const Title_Classe = "badge mt-2 bg-"

export const Bookmark_Classe = "bi bi-bookmark"

export const handleRenderPhrase = (num) => {
  return num === 0
    ? "Никто не тусанёт"
    : [5, 6, 7, 8, 9, 10, 11, 12].find((el) => el === num)
    ? num + " человек тусанут"
    : [2, 3, 4].find((el) => el === num)
    ? num + " человека тусанёт"
    : num === 1
    ? num + " человек тусанёт"
    : "Весь этот коллектив"
}

export const handleRenderColor = (num) => {
  return num === 0 ? "danger" : "primary"
}

export function handleTime(timeNow, timeBefore) {
  const timeDifference = timeNow - timeBefore
  let str, min, h, d, mon, y
  switch (true) {
    case timeDifference >= 0 && timeDifference <= 6e3: {
      str = "1 минуту назад"
      break
    }
    case timeDifference > 6e3 && timeDifference <= 3e5: {
      str = "5 минуту назад"
      break
    }
    case timeDifference > 3e5 && timeDifference <= 6e5: {
      str = "10 минуту назад"
      break
    }
    case timeDifference > 6e5 && timeDifference <= 18e5: {
      str = "30 минуту назад"
      break
    }
    case timeDifference > 18e5 && timeDifference <= 36e5: {
      str = "1 hour"
      break
    }
    case timeDifference > 36e5 && timeDifference <= 864e5: {
      h = Math.floor(timeDifference / 36e5)
      min = Math.round((timeDifference % 36e5) / 6e4)
      str = `${h} h ${min} min`
      break
    }
    case timeDifference > 864e5 && timeDifference <= 31536e6: {
      mon = Math.floor(timeDifference / 2448e6)
      d = Math.round((timeDifference % 2448e6) / 864e5)
      str = `${d} d ${mon} mon`
      break
    }
    case timeDifference > 31536e6: {
      y = Math.floor(timeDifference / 31536e6)
      mon = Math.floor((timeDifference % 31536e6) / 2448e6)
      d = Math.round(((timeDifference % 31536e6) % 2448e6) / 864e5)
      str = `${d} d ${mon} mon ${y} y`
      break
    }
    default:
      break
  }
  return str
}
