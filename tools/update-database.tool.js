const connection = require("../models/db");

const queryWrapper = function (query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const loadMigratedFiles = async function () {
  return queryWrapper(
    "SELECT MIGRATION_HISTORY.FileName FROM MIGRATION_HISTORY"
  );
};

const createDatabaseIfNotExists = async function () {
  return queryWrapper(
    "CREATE TABLE IF NOT EXISTS MIGRATION_HISTORY (Id INT PRIMARY KEY AUTO_INCREMENT, FileName TEXT)"
  );
};

const main = async function () {
  try {
    await createDatabaseIfNotExists();
    const migratedFiles = await loadMigratedFiles();
    console.log(migratedFiles);
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

main();
