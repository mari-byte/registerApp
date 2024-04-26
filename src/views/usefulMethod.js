const use = (req) => {
  const newReq = req.filter((e, index, array) => {
    return array.findLastIndex((el) => el.problem_number === e.problem_number) === index
  })
  return newReq
}

export default use
