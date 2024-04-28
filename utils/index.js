const generateUsername = (email) => {
  const randomKey = Math.floor(Math.random() * 1000);
  const regex = /\b([a-zA-Z0-9]{1,5})\b/g;
  const match = email.match(regex)[0];
  const username = `guest_${randomKey}${match}`;
  return username;
};

const generateOTP = () => {
  const min = 100000;
  const max = 999999;

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNum;
};

module.exports = { generateUsername, generateOTP };
