const createActivationToken = (verifi) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: '5m',
    }
  );

  return { token, activationCode };
};

export default createActivationToken;