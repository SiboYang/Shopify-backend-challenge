import { createRequire } from 'module';
const require = createRequire(import.meta.url); // to use require with module
const { Parser } = require('json2csv');

/**
 * Parsing postgreSQL record into CSV
 */

const parseCSV = (fields, items) => {
  const json2csv = new Parser({ fields: fields });
  return json2csv.parse(JSON.parse(JSON.stringify(items)));
};

export default parseCSV;
