import Bookmark from "../../bookmark/models/bookmarkModel";
import History from "../../history/models/historyModel";

export const setupAssociations = () => {
  Bookmark.belongsTo(History, {
    foreignKey: "historyid",
    as: "history",
  });

  History.hasMany(Bookmark, {
    foreignKey: "historyid",
    as: "bookmarks",
  });
};
