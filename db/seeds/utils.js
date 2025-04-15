const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.getArticleIdByTitle = (title, lookupArray) => {
  const match = lookupArray.find(([article_id, article_title]) => article_title === title)
  return match ? match[0] : null
}
