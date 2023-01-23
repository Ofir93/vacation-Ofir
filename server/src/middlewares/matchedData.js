
export default async (req, res, next) => {
  const matchedData = ['user_name', 'password']
  if (req.url === '/register' || req.url === '/register/') matchedData.unshift('first_name', 'last_name')
  // console.log(req.body);
  for (const key in req.body) {
    if (!matchedData.includes(key)) {
      return res.status(400).send({ errors: [`Invalid property ${key}`] })
    }
  }
  next()
}