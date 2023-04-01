const sql = require("./db");

const File = function (file) {
  this.Id = file.Id;
  this.FileName = file.FileName;
  this.FilePath = file.FilePath;
  this.CurrentTime = file.CurrentTime;
  this.Duration = file.Duration;
  this.OrderInList = file.OrderInList;
};

File.getAll = function () {
  return new Promise(function (resolve, reject) {
    sql.query(
      "select Id, FileName, FilePath, CurrentTime, Duration from Files",
      function (err, results) {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

File.getById = function (id) {
  return new Promise(function (resolve, reject) {
    sql.query(
      "select Id, FileName, FilePath, CurrentTime, Duration from Files WHERE Id = ?",
      [id],
      function (err, results) {
        if (err) reject(err);
        resolve(results[0]);
      }
    );
  });
};

File.getByIdWithSeason = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT Files.Id
        ,Files.FileName
        ,Files.FilePath
        ,Files.CurrentTime
        ,Files.Duration
        ,Seasons.Id AS SeasonId
        ,Seasons.Name AS SeasonName
      FROM Files
      INNER JOIN Seasons ON Files.SeasonId = Seasons.Id
      WHERE Files.Id = ?`,
      [id],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      }
    );
  });
};

File.getBySeasonId = function (seasonId) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT Files.Id
        ,Files.OrderInList
        ,Files.FileName
      FROM Files
      WHERE SeasonId = ?
      ORDER BY Files.OrderInList`,
      [seasonId],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

File.prototype.setStats = function () {
  const query = `UPDATE Files SET CurrentTime = ?, Duration = ? WHERE Id = ?`;
  const params = [this.CurrentTime, this.Duration, this.Id];
  return new Promise((resolve, reject) => {
    sql.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

File.prototype.setOrderInList = function () {
  const query = `UPDATE Files SET OrderInList = ? WHERE Id = ?`;
  const params = [this.OrderInList, this.Id];
  return new Promise((resolve, reject) => {
    sql.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = File;
