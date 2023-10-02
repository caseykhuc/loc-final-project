export type IFormSignUpInputs = {
  email: string;
  password: string;
  name: string;
};

export type IFormLoginInputs = {
  email: string;
  password: string;
};

export type IFormCategoryInputs = {
  name: string;
  imageUrl?: string;
};

export type IFormItemInputs = {
  name: string;
  description: string;
  imageUrl?: string;
};
