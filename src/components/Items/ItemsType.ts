export type ItemType = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  creatorId: number;
  categoryId: number;
};

export type ItemsDataType = {
  totalItems: number;
  items: Array<ItemType>;
};

export type ItemPayload = {
  name: string;
  imageUrl?: string;
  description: string;
};
