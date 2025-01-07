OTPG = () => {
  const OTP = Math.floor(Math.random() * 10000);
  if (OTP.length == 3) return `${OTP}3`;
  else return OTP;
};
module.exports = OTPG;
