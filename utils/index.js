const generateUsername = (email) => {
  const randomKey = Math.floor(Math.random() * 1000);
  const regex = /\b([a-zA-Z0-9]{1,5})\b/g;
  const match = email.match(regex)[0];
  const username = `guest_${randomKey}${match}`;
  return username;
};

module.exports = { generateUsername };
