import { encoded, translations } from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodeFields(encoded, translations) {
  const excludeFields = ['groupId', 'service', 'formatSize', 'ca']
  return encoded.map((fields) => {
    const decodedItem = {}
    for (let field in fields) {
      if (excludeFields.includes(field) || fields[field] === null) {
        decodedItem[field] = fields[field]
      } else {
        decodedItem[field] = translations[fields[field]] || fields[field]
      }
    }
    return decodedItem
  })
}
const decoded = decodeFields(encoded, translations)
console.log('decoded', decoded)

function getUniqueIds(encoded) {
  const uniqueIds = new Set()
  encoded.forEach((fields) => {
    for (let field in fields) {
      if (field.endsWith('Id')) {
        uniqueIds.add(fields[field])
      }
    }
  })
  return Array.from(uniqueIds)
}

const uniqueIds = getUniqueIds(encoded)
console.log('uniqueIds', uniqueIds)
