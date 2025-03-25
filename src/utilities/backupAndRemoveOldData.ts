import { Payload } from 'payload'
import fs from 'fs'
import path from 'path'

export async function backupAndRemoveOldData(kindeId: string, businessTypeId: number, payload: Payload) {
  if (!businessTypeId) {
    // console.error('Invalid businessTypeId:', businessTypeId)
    return
  }

  // Fetch the business type to determine the appropriate table
  const businessType = await payload.findByID({
    collection: 'businessTypes',
    id: businessTypeId,
  })

  if (!businessType) {
    // console.error('Business type not found:', businessTypeId)
    return
  }

  // Determine the table based on the business type
  let tableName
  switch (businessType.title) {
    case 'KhachSan':
      tableName = 'tablekhachsan'
      break
    case 'NhaHang':
      tableName = 'tablenhahang'
      break
    case 'Spa':
      tableName = 'tablespa'
      break
    // Add more cases as needed
    default:
      throw new Error(`Unknown business type: ${businessType.title}`)
  }

  // Fetch the user's data from the old table
  const userData = await payload.find({
    collection: tableName,
    where: {
      tenseusers: {
        equals: kindeId,
      },
    },
  })

  // Backup the data to a file
  const backupFilePath = path.join(__dirname, `../backups/${kindeId}_${tableName}_backup.json`)
  fs.writeFileSync(backupFilePath, JSON.stringify(userData.docs, null, 2))

  // Remove the user's data from the old table
  for (const doc of userData.docs) {
    await payload.delete({
      collection: tableName,
      id: doc.id,
    })
  }
}