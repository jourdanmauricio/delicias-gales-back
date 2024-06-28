import { readFileSync } from 'fs';

export const loadUsers = () => {
  const data = readFileSync('src/database/data/users.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadCategories = () => {
  const data = readFileSync('src/database/data/categories.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadBrands = () => {
  const data = readFileSync('src/database/data/brands.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadAttributes = () => {
  const data = readFileSync('src/database/data/attributes.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadProducts = () => {
  const data = readFileSync('src/database/data/products.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};
