const fs = require("fs");
const path = require("path");
const connection = require("../models/db");

const migrationDir = "./migrations";

const queryWrapper = function (query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result) => {
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

const loadMigrationFileList = function () {
  return fs.readdirSync(migrationDir);
};

const runMigration = async function (pendingFiles) {
  for (const file of pendingFiles) {
    const query = fs.readFileSync(path.join(migrationDir, file), "utf-8");
    console.log(query);
    await queryWrapper(query);
    await queryWrapper("INSERT INTO MIGRATION_HISTORY (FileName) VALUES (?)", [
      file,
    ]);
  }
};

const main = async function () {
  try {
    await createDatabaseIfNotExists();
    const migratedFiles = (await loadMigratedFiles()).map((d) => d.FileName);
    const migrationQueryFiles = loadMigrationFileList();
    const pendingFiles = migrationQueryFiles.filter(
      (file) => !migratedFiles.includes(file)
    );
    await runMigration(pendingFiles);
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

main();
