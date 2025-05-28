import { FieldItem } from "@/types/settings"

/**
 * 从设置数据中清除空值
 */
export function filterNonEmptyItems(items: FieldItem[] | undefined | null): FieldItem[] {
  if (!items) return [];
  return items.filter(item => {
    return Object.values(item).some(val => val && String(val).trim() !== '');
  });
}

/**
 * 处理About设置数据，清理空值
 */
export function processAboutData(values: any) {
  // 处理可能为null或undefined的嵌套对象
  const processedValues = {
    ...values,
    contact: values.contact || { email: '', phone: '', location: '' },
    skills: values.skills || [],
    education: values.education || [],
    experience: values.experience || [],
    projects: values.projects || [],
    social: values.social || { github: '', linkedin: '', twitter: '', website: '' }
  };

  // 过滤技能列表中的空条目
  if (processedValues.skills.length > 0) {
    processedValues.skills = processedValues.skills.filter((skill: string) => skill && skill.trim() !== '');
  }
  
  // 应用过滤到各个字段
  processedValues.education = filterNonEmptyItems(processedValues.education);
  processedValues.experience = filterNonEmptyItems(processedValues.experience);
  processedValues.projects = filterNonEmptyItems(processedValues.projects);

  // 处理项目技术列表
  if (processedValues.projects?.length > 0) {
    processedValues.projects = processedValues.projects.map((project: any) => ({
      ...project,
      tech: project.tech ? project.tech.filter((t: string) => t && t.trim() !== '') : []
    }));
  }

  return processedValues;
}

/**
 * 创建导出JSON文件并触发下载
 */
export function downloadSettingsJSON(data: any, filename: string) {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 格式化设置项为API可接受的格式
 */
export function formatAboutSettingsForApi(values: any) {
  const processedValues = processAboutData(values);
  
  return [
    { key: "about.intro", value: values.intro || '' },
    { key: "about.intro_zh", value: values.intro_zh || '' },
    { key: "about.contact", value: JSON.stringify(processedValues.contact) },
    { key: "about.skills", value: JSON.stringify(processedValues.skills) },
    { key: "about.education", value: JSON.stringify(processedValues.education) },
    { key: "about.experience", value: JSON.stringify(processedValues.experience) },
    { key: "about.projects", value: JSON.stringify(processedValues.projects) },
    { key: "about.social", value: JSON.stringify(processedValues.social) },
  ];
} 