import { INodesArray } from "../../types";

export const generateSassVariables = (nodesArray: INodesArray[]): string => {
  // Сортируем массив по ключу
  nodesArray.sort((a, b) => a.key.localeCompare(b.key));

  // Группируем элементы по категориям
  const categories: { [key: string]: INodesArray[] } = {};
  const noCategory: INodesArray[] = [];
  for (const node of nodesArray) {
    const keyParts = node.key.split('_')[0].split('-');
    if (keyParts.length > 1) {
      const category = keyParts[0];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(node);
    } else {
      noCategory.push(node);
    }
  }

  // Сортируем категории
  const sortedCategories = Object.keys(categories).sort();

  let result = '';

  // Добавляем элементы без категории
  for (const node of noCategory) {
    result += `$${node.key}: ${node.value};\n`;
  }

  // Добавляем отступ после элементов без категории, если они есть
  if (noCategory.length > 0) {
    result += '\n';
  }

  // Добавляем элементы с категориями
  for (const category of sortedCategories) {
    // Добавляем элементы категории
    for (const node of categories[category]) {
      result += `$${node.key}: ${node.value};\n`;
    }

    // Добавляем отступ после каждой категории, кроме последней
    if (category !== sortedCategories[sortedCategories.length - 1]) {
      result += '\n';
    }
  }

  return result;
}
