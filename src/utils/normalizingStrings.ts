

export function normalizingStrings(string: string) {

  const normalizedString =
    string
      .toLowerCase()
      .trim()
      .replace(/[àâãá]/gi, 'a')
      .replace(/[ç]/gi, 'c')
      .replace(/[éèê]/gi, 'e')
      .replace(/[íìî]/gi, 'i')
      .replace(/[óòôõ]/gi, 'o')
      .replace(/[ùúû]/gi, 'u')
      .replace(/[^A-Z0-9]/gi, '')

  return normalizedString
}