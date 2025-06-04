"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FeaturedImageUploader } from "../posts/FeaturedImageUploader"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { AppearanceSettingsFormProps, BannerImageSelectorProps } from "@/types/settings"

// reusable banner image selector component
function BannerImageSelector({ value, onChange, label }: BannerImageSelectorProps) {
  // 确保使用完整URL
  const getImageSrc = (src: string) => {
    if (!src) return '';
    return src.startsWith('http') ? src : `http://localhost:3001${src}`;
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="border rounded-md p-4">
        <FeaturedImageUploader value={value} onChange={onChange} />
        {value && (
          <div className="mt-2">
            <div className="relative h-40 w-full overflow-hidden rounded-md">
              <img 
                src={getImageSrc(value)} 
                alt={label}
                className="object-cover w-full h-full" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AppearanceSettingsForm({ 
  defaultValues,
  onSubmit, 
  loading, 
  isSaving 
}: AppearanceSettingsFormProps) {
  const [formValues, setFormValues] = useState({
    theme: defaultValues.theme || "light",
    accentColor: defaultValues.accentColor || "#0891b2",
    fontFamily: defaultValues.fontFamily || "Inter",
    enableRTL: defaultValues.enableRTL || false,
    showSidebar: defaultValues.showSidebar === undefined ? true : defaultValues.showSidebar,
    homeBanner: defaultValues.homeBanner || "",
    aboutBanner: defaultValues.aboutBanner || "",
    contactBanner: defaultValues.contactBanner || "",
    homeBannerMobile: defaultValues.homeBannerMobile || "",
    aboutBannerMobile: defaultValues.aboutBannerMobile || "",
    contactBannerMobile: defaultValues.contactBannerMobile || "",
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formValues)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* theme settings */}
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={formValues.theme}
              onValueChange={(value) => setFormValues({...formValues, theme: value})}
              disabled={loading}
            >
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* accent color settings */}
          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="accentColor"
                type="color"
                value={formValues.accentColor}
                onChange={(e) => setFormValues({...formValues, accentColor: e.target.value})}
                className="w-12 h-10 p-1"
                disabled={loading}
              />
              <Input
                type="text"
                value={formValues.accentColor}
                onChange={(e) => setFormValues({...formValues, accentColor: e.target.value})}
                className="flex-1"
                disabled={loading}
              />
            </div>
          </div>
          
          {/* font family settings */}
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Input
              id="fontFamily"
              value={formValues.fontFamily}
              onChange={(e) => setFormValues({...formValues, fontFamily: e.target.value})}
              disabled={loading}
            />
          </div>
          
          {/* RTL settings */}
          <div className="flex items-center justify-between">
            <Label htmlFor="enableRTL" className="flex-1">Enable RTL Support</Label>
            <Switch
              id="enableRTL"
              checked={formValues.enableRTL}
              onCheckedChange={(checked) => setFormValues({...formValues, enableRTL: checked})}
              disabled={loading}
            />
          </div>
          
          {/* sidebar settings */}
          <div className="flex items-center justify-between">
            <Label htmlFor="showSidebar" className="flex-1">Show Sidebar</Label>
            <Switch
              id="showSidebar"
              checked={formValues.showSidebar}
              onCheckedChange={(checked) => setFormValues({...formValues, showSidebar: checked})}
              disabled={loading}
            />
          </div>
          
        {/* banner image settings */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium">Banner Images</h3>
            <BannerImageSelector 
              label="Home Page Banner" 
              value={formValues.homeBanner}
              onChange={(url) => setFormValues({...formValues, homeBanner: url})}
            />
            <BannerImageSelector 
              label="About Page Banner" 
              value={formValues.aboutBanner}
              onChange={(url) => setFormValues({...formValues, aboutBanner: url})}
            />
            <BannerImageSelector 
              label="Contact Page Banner" 
              value={formValues.contactBanner}
              onChange={(url) => setFormValues({...formValues, contactBanner: url})}
            />
            <BannerImageSelector 
              label="Home Page Banner (Mobile)" 
              value={formValues.homeBannerMobile}
              onChange={(url) => setFormValues({...formValues, homeBannerMobile: url})}
            />
            <BannerImageSelector 
              label="About Page Banner (Mobile)" 
              value={formValues.aboutBannerMobile}
              onChange={(url) => setFormValues({...formValues, aboutBannerMobile: url})}
            />
            <BannerImageSelector 
              label="Contact Page Banner (Mobile)" 
              value={formValues.contactBannerMobile}
              onChange={(url) => setFormValues({...formValues, contactBannerMobile: url})}
            />
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 