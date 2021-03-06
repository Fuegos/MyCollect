import messages_en from "./en.json"
import messages_uk from "./uk.json"
import messages_ge from "./ge.json"
import enLocale from 'date-fns/locale/en-GB'
import ukLocale from 'date-fns/locale/uk'
import geLocale from 'date-fns/locale/ka'
import { enUS, ukUA } from '@mui/x-data-grid'


const langs = {
    'en': {
        code: 'gb',
        messages: messages_en,
        localeDate: enLocale,
        localeDataGrid: enUS
    },
    'uk': {
        code: 'ua',
        messages: messages_uk,
        localeDate: ukLocale,
        localeDataGrid: ukUA
    },
    'ge': {
        code: 'ge',
        messages: messages_ge,
        localeDate: geLocale,
        localeDataGrid: enUS
    }
}

const keys = Object.keys(langs)

export const langCodes = Object.keys(langs).reduce(
        (prev, cur) => prev.concat({value: cur, code: langs[cur].code })
    , [])

export const langMessages = Object.keys(langs).reduce(
        (prev, cur) => {prev[cur] = langs[cur].messages; return prev}
    , {})

export const langValues = Object.keys(langs)

export const langLocaleDates = Object.keys(langs).reduce(
        (prev, cur) => {prev[cur] = langs[cur].localeDate; return prev}
    , {})

export const langLocaleDataGrid = Object.keys(langs).reduce(
    (prev, cur) => {prev[cur] = langs[cur].localeDataGrid; return prev}
, {})

export const langDefault = 'en'