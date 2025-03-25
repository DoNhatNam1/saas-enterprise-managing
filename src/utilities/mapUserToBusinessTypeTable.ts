import { CollectionSlug, Payload } from 'payload'

export async function mapUserToBusinessTypeTable(userId: string, businessTypeData: any, payload: Payload): Promise<{ success: boolean }> {

  if (!businessTypeData || !businessTypeData.id) {
    return { success: false }
  }

  // Determine the table based on the business type
  let tableName: CollectionSlug
  switch (businessTypeData.title) {
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
      return { success: false }
  }

  try {
    // Check if the user already exists in the table
    const existingEntry = await payload.find({
      collection: tableName,
      where: {
        tenseusers: {
          equals: userId,
        },
      },
    })

    if (existingEntry.docs.length > 0) {
      return { success: true }
    }

    await payload.create({
      collection: tableName,
      data: {
        tenseusers: userId,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}