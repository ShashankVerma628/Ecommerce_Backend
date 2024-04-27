const generateOTPBody = (email, otp, frequency) => {
  return {
    email: email,
    otp: otp,
    frequency: frequency,
  };
};

module.exports = { generateOTPBody };
