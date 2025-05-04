export function transformLocalizedCategories(categories, lang) {
    return categories.map(category => {
      const localizedName =
        lang === 'en'
          ? category.name_en || category.name
          : lang === 'zh'
          ? category.name_zh || category.name
          : category.name;

        return {
          ...category.toObject?.() || category,
          name: localizedName,
          name_en: undefined,
          name_zh: undefined
        };
    });
  }
  