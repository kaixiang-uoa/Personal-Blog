export function transformLocalizedTags(tags, lang) {
  return tags.map((tag) => {
    const raw = tag.toObject?.() || tag;

    const localizedName =
      lang === 'en'
        ? raw.name_en || raw.name
        : lang === 'zh'
          ? raw.name_zh || raw.name
          : raw.name;

    return {
      ...raw,
      name: localizedName,
      name_en: undefined,
      name_zh: undefined,
    };
  });
}
