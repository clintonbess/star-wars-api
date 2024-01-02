import { readFile } from 'xlsx'
import * as XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'

const databaseFilename = '../fixtures/star-wars-database.xlsx'
const databaseFilepath = path.resolve(__dirname, databaseFilename)
const outputBaseFilepath = path.resolve(__dirname, '../fixtures/')

const tableConfigs = [
  {
    sheetKey: 'FILMS',
    filename: 'films-uncleaned.json',
  },
  {
    sheetKey: 'PEOPLE',
    filename: 'people-uncleaned.json',
  },
  {
    sheetKey: 'PLANETS',
    filename: 'planets-uncleaned.json',
  },
  {
    sheetKey: 'SPECIES',
    filename: 'species-uncleaned.json',
  },
  {
    sheetKey: 'STARSHIPS',
    filename: 'starships-uncleaned.json',
  },
  {
    sheetKey: 'VEHICLES',
    filename: 'vehicles-uncleaned.json',
  },
]

tableConfigs.forEach(({ sheetKey, filename }) => {
  const sheetConfig = {
    type: 'binary',
    cellText: false,
    cellDates: true,
  }
  const tableSheet = readFile(databaseFilepath, sheetConfig).Sheets[sheetKey]
  const tableJSONSheet = XLSX.utils.sheet_to_json(tableSheet, {})
  const tableJSONFilepath = path.resolve(outputBaseFilepath, filename)

  fs.writeFileSync(tableJSONFilepath, JSON.stringify(tableJSONSheet, null, 2))
})
