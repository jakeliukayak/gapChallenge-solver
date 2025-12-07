# main solver program

def getEmpty(prob):
  for row in range(len(prob)):
    for col in range(len(prob[row])):
      if prob[row][col] == 0:
        return (row, col)

  return None

def isValid(prob, ele, pos):
  for col in range(len(prob[pos[0]])):
    if col != pos[1] and prob[pos[0]][col] == ele:
      return False

  for row in range(len(prob)):
    if row != pos[0] and prob[row][pos[1]] == ele:
      return False

  return True

def isSolved(prob):
  consider = getEmpty(prob)

  if not consider:
    return prob

  row, col = consider

  for potential in range(1, len(prob) + 1):
    if isValid(prob, potential, (row, col)):
      prob[row][col] = potential

      if isSolved(prob):
        return True

      prob[row][col] = 0

  return False
