// @ts-ignore
import { CollectionConfig } from 'payload/types';

const updateBlockOrder: CollectionConfig['hooks']['beforeChange'] = [
  async ({ data, originalDoc }) => {
    if (data.blocks) {
      data.blocks = data.blocks.map((block, index) => ({
        ...block,
        _order_id: index + 1,
      }));
    }
    return data;
  },
];

export default updateBlockOrder;