#!/bin/bash

# 更新UI组件导入路径的脚本

# 数据展示组件
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/card"|from "@/components/ui/data-display/card"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/avatar"|from "@/components/ui/data-display/avatar"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/badge"|from "@/components/ui/data-display/badge"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/table"|from "@/components/ui/data-display/table"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/skeleton"|from "@/components/ui/data-display/skeleton"|g'

# 输入组件
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/button"|from "@/components/ui/inputs/button"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/input"|from "@/components/ui/inputs/input"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/checkbox"|from "@/components/ui/inputs/checkbox"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/form"|from "@/components/ui/inputs/form"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/select"|from "@/components/ui/inputs/select"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/textarea"|from "@/components/ui/inputs/textarea"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/label"|from "@/components/ui/inputs/label"|g'

# 导航组件
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/dropdown-menu"|from "@/components/ui/navigation/dropdown-menu"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/tabs"|from "@/components/ui/navigation/tabs"|g'

# 反馈组件
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/toast"|from "@/components/ui/feedback/toast"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/dialog"|from "@/components/ui/feedback/dialog"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/components/ui/alert-dialog"|from "@/components/ui/feedback/alert-dialog"|g'

# 其他修复
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/hooks/use-toast"|from "@/hooks/ui/use-toast"|g'
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -E 's|from "@/types/form"|from "@/types/form.types"|g'

echo "导入路径更新完成!" 