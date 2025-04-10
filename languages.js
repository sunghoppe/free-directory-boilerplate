const languages = [
  {id: 'en', title: 'English'},
  {id: 'zh', title: '简体中文', isDefault: true},
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault).id,
}

const googleTranslateLanguages = languages.map(({id, title}) => ({id, title}))

// For v2 studio
// module.exports = {i18n, googleTranslateLanguages}

// For v3 studio
export {i18n, googleTranslateLanguages}
