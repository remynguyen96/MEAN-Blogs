const devConfig = {
  MONGO_URL: "mongodb://localhost:27017/blogs",
  JWT_SECRET: "ILOVELIFE",

  PASSPORTCODE: "I-LOVE-MEDITATION",
  IV: "#base64IV#",

  MAIL_HOST: "smtp.mailtrap.io",
  MAIL_PORT: "2525",
  MAIL_USERNAME: "a1285327665551",
  MAIL_PASSWORD: "0875bbf87059c7"
};

const prodConfig = {
  MONGO_URL: "mongodb://localhost:27017/blogs"
};

const defaultConfig = {
  PORT: process.env.PORT || 4500
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
