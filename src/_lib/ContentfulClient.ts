// contentful Management API
const contentful = require("contentful-management");

export const client = contentful.createClient({
  // space: process.env.CONTENTFUL_SPACE_ID,
  // accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  accessToken: process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
});
