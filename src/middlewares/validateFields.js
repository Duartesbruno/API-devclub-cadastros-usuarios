export const validateUserFields = (req, res, next) => {
  const { email, name, age } = req.body;
  const ageNumber = parseInt(age, 10);

  if (!email || !name || isNaN(ageNumber)) {
    return res.status(400).json({ error: 'É obrigatório preencher todos os campos.' });
  }

  req.body.age = ageNumber;
  next(); // move on to the next function
};