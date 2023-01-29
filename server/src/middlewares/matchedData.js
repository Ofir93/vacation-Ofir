
export default async (req, res, next) => {
  const matchedData = ['userName', 'password']
  if (req.url === '/register' || req.url === '/register/') matchedData.unshift('firstName', 'lastName')
  // console.log(req.body);
  for (const key in req.body) {
    if (!matchedData.includes(key)) {
      return res.status(400).send({ errors: [`Invalid property ${key}`] })
    }
  }
  next()
}