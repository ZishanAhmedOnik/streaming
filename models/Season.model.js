const sql = require("./db");
const File = require("./File.model");

const Season = function (season) {
  this.Id = season.Id;
  this.Name = season.Name;
  this.EpisodeCount = season.EpisodeCount;
  this.Files = season.Files;
};

Season.AddSeason = (Name) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "INSERT INTO Seasons (Name) VALUES (?)",
      [Name],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

Season.GetAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT Id, Name FROM Seasons", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

Season.LoadEpisodes = async (seasonId, offset, limit) => {
  const { EpisodeCount } = await Season.countEpisodes(seasonId);

  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT 
        Seasons.Id AS SeasonId
        ,Seasons.Name AS SeasonName
        ,Files.Id AS FileId
        ,FileName
        ,FilePath 
        ,CurrentTime
        ,Duration
      FROM Seasons
        LEFT JOIN Files 
        ON Seasons.Id = Files.SeasonId 
      WHERE Seasons.Id = ?
      ORDER BY Files.OrderInList
      LIMIT ?, ?`,
      [seasonId, offset, limit],
      (err, results) => {
        if (err) reject(err);
        const resPack = new Season({
          Id: results[0].SeasonId,
          Name: results[0].SeasonName,
          EpisodeCount: EpisodeCount,
          Files: results
            .map(
              (res) =>
                new File({
                  Id: res.FileId,
                  FileName: res.FileName,
                  FilePath: res.FilePath,
                  CurrentTime: res.CurrentTime,
                  Duration: res.Duration,
                })
            )
            .filter((file) => file.Id !== null),
        });
        resolve(resPack);
      }
    );
  });
};

Season.countEpisodes = (seasonId) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "SELECT COUNT(ID) AS EpisodeCount FROM Files WHERE SeasonId = ?",
      [seasonId],
      (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      }
    );
  });
};

module.exports = Season;
