import messages_en from "./en.json"
import messages_uk from "./uk.json"
import messages_ge from "./ge.json"

const langs = {
    'en': {
        code: 'gb',
        messages: messages_en
    },
    'uk': {
        code: 'ua',
        messages: messages_uk
    },
    'ge': {
        code: 'ge',
        messages: messages_ge
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

export const langDefault = 'en'