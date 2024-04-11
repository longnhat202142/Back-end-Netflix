const handleDecodePassword = (password) => {
  const secretKey = process.env.SECRET_KEY;
  const bytes = crypto.AES.encrypt(crypto.enc.Utf8.parse(password), secretKey);
  const message_decode = bytes.toString(crypto.enc.Utf8);
  return message_decode;
};

module.exports = {
  handleDecodePassword,
};
