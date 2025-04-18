import React, { useState } from 'react';
import { 
  Bell, 
  Globe, 
  Lock, 
  Mail, 
  MessageSquare, 
  Save, 
  Shield, 
  UserCog,
  Users,
  Wrench,
  Check,
  X,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAdminContext } from '../contexts/AdminContext';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

const SystemSettings = () => {
  const { siteSettings, updateSiteSettings } = useAdminContext();
  const [currentTab, setCurrentTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSaveSettings = (section, updatedValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateSiteSettings(section, updatedValues);
      setIsSaving(false);
      setShowSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        {showSaveSuccess && (
          <Alert variant="success" className="w-auto ml-auto mr-4 py-2 flex items-center bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4 mr-2" />
            <AlertDescription className="text-sm">Settings saved successfully</AlertDescription>
          </Alert>
        )}
      </div>

      <Tabs defaultValue="general" className="space-y-4" onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <TabsTrigger value="general">
            <Wrench className="h-4 w-4 mr-2" /> General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Globe className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" /> Users
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" /> Email
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageSquare className="h-4 w-4 mr-2" /> Comments
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the main settings for your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-title">Site Title</Label>
                <Input 
                  id="site-title"
                  defaultValue={siteSettings.general.siteTitle}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-tagline">Site Tagline</Label>
                <Input
                  id="site-tagline"
                  defaultValue={siteSettings.general.tagline}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  rows={3}
                  defaultValue={siteSettings.general.description}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input
                  id="site-url"
                  defaultValue={siteSettings.general.siteUrl}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    defaultValue={siteSettings.general.adminEmail}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue={siteSettings.general.timezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue={siteSettings.general.dateFormat}>
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="MMMM D, YYYY">MMMM D, YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={() => handleSaveSettings('general', {})}
                disabled={isSaving && currentTab === 'general'}
              >
                {isSaving && currentTab === 'general' ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Configure how your blog looks to visitors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue={siteSettings.appearance.theme}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="posts-per-page">Posts per Page</Label>
                <Input
                  id="posts-per-page"
                  type="number"
                  defaultValue={siteSettings.appearance.postsPerPage}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="show-author" 
                  defaultChecked={siteSettings.appearance.showAuthor} 
                />
                <Label htmlFor="show-author">Show Author Information</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="show-date" 
                  defaultChecked={siteSettings.appearance.showDate} 
                />
                <Label htmlFor="show-date">Show Publish Date</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="featured-image" 
                  defaultChecked={siteSettings.appearance.showFeaturedImage} 
                />
                <Label htmlFor="featured-image">Show Featured Images</Label>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid gap-2">
                <Label htmlFor="custom-css">Custom CSS</Label>
                <Textarea
                  id="custom-css"
                  rows={5}
                  className="font-mono text-sm"
                  placeholder="/* Add your custom CSS here */"
                  defaultValue={siteSettings.appearance.customCss}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="header-scripts">Header Scripts</Label>
                <Textarea
                  id="header-scripts"
                  rows={3}
                  className="font-mono text-sm"
                  placeholder="<!-- Add scripts to be included in <head> -->"
                  defaultValue={siteSettings.appearance.headerScripts}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="footer-scripts">Footer Scripts</Label>
                <Textarea
                  id="footer-scripts"
                  rows={3}
                  className="font-mono text-sm"
                  placeholder="<!-- Add scripts to be included before </body> -->"
                  defaultValue={siteSettings.appearance.footerScripts}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={() => handleSaveSettings('appearance', {})}
                disabled={isSaving && currentTab === 'appearance'}
              >
                {isSaving && currentTab === 'appearance' ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>
                Configure user roles and registration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Switch id="allow-registration" 
                  defaultChecked={siteSettings.users.allowRegistration} 
                />
                <Label htmlFor="allow-registration">Allow User Registration</Label>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="default-role">Default User Role</Label>
                <Select defaultValue={siteSettings.users.defaultRole}>
                  <SelectTrigger id="default-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscriber">Subscriber</SelectItem>
                    <SelectItem value="contributor">Contributor</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-medium mb-2">Role Permissions</h3>
              
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Administrator</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Full access to all features and settings
                  </p>
                  <div className="flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Cannot be modified</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Editor</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Can edit and publish all posts, including others'
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Switch id="editor-publish" defaultChecked={true} />
                      <Label htmlFor="editor-publish" className="text-sm">Can publish content</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="editor-delete" defaultChecked={true} />
                      <Label htmlFor="editor-delete" className="text-sm">Can delete content</Label>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Author</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Can publish and manage their own posts
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Switch id="author-publish" defaultChecked={true} />
                      <Label htmlFor="author-publish" className="text-sm">Can publish own content</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="author-delete" defaultChecked={false} />
                      <Label htmlFor="author-delete" className="text-sm">Can delete own content</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={() => handleSaveSettings('users', {})}
                disabled={isSaving && currentTab === 'users'}
              >
                {isSaving && currentTab === 'users' ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email notifications and SMTP settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email-provider">Email Provider</Label>
                <Select defaultValue={siteSettings.email.provider}>
                  <SelectTrigger id="email-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (PHP mail)</SelectItem>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-4">
                <h3 className="text-base font-medium">SMTP Settings</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      defaultValue={siteSettings.email.smtpHost}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      defaultValue={siteSettings.email.smtpPort}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    defaultValue={siteSettings.email.smtpUsername}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    defaultValue="••••••••••"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="smtp-secure" 
                    defaultChecked={siteSettings.email.smtpSecure} 
                  />
                  <Label htmlFor="smtp-secure">Use Secure Connection (TLS/SSL)</Label>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Email Notifications</h3>
                
                <div className="flex items-center gap-2">
                  <Switch id="notify-comments" 
                    defaultChecked={siteSettings.email.notifyOnComment} 
                  />
                  <Label htmlFor="notify-comments">Notify on New Comments</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="notify-users" 
                    defaultChecked={siteSettings.email.notifyOnUserRegistration} 
                  />
                  <Label htmlFor="notify-users">Notify on User Registration</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="notify-posts" 
                    defaultChecked={siteSettings.email.notifyOnPost} 
                  />
                  <Label htmlFor="notify-posts">Notify on New Posts</Label>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Send Test Email
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={() => handleSaveSettings('email', {})}
                disabled={isSaving && currentTab === 'email'}
              >
                {isSaving && currentTab === 'email' ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Comment Settings */}
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comment Settings</CardTitle>
              <CardDescription>
                Configure how comments are handled on your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Switch id="allow-comments" 
                  defaultChecked={siteSettings.comments.allowComments} 
                />
                <Label htmlFor="allow-comments">Enable Comments</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="moderate-comments" 
                  defaultChecked={siteSettings.comments.moderateComments} 
                />
                <Label htmlFor="moderate-comments">Comments require approval</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="require-name-email" 
                  defaultChecked={siteSettings.comments.requireNameEmail} 
                />
                <Label htmlFor="require-name-email">Require name and email</Label>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="close-days">Close comments after</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="close-days"
                    type="number"
                    className="w-20"
                    defaultValue={siteSettings.comments.closeAfterDays}
                  />
                  <span>days</span>
                </div>
                <p className="text-sm text-muted-foreground">Set to 0 to never close comments</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="pagination">Comments per page</Label>
                <Input
                  id="pagination"
                  type="number"
                  className="w-24"
                  defaultValue={siteSettings.comments.perPage}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Comment Moderation</h3>
                
                <div className="grid gap-2">
                  <Label htmlFor="moderation-words">Hold comment if it contains these words</Label>
                  <Textarea
                    id="moderation-words"
                    rows={3}
                    className="font-mono text-sm"
                    placeholder="One word or phrase per line"
                    defaultValue={siteSettings.comments.moderationWords}
                  />
                  <p className="text-sm text-muted-foreground">One word or phrase per line</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="spam-protection" 
                    defaultChecked={siteSettings.comments.enableSpamProtection} 
                  />
                  <Label htmlFor="spam-protection">Enable spam protection</Label>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="spam-service">Spam Protection Service</Label>
                  <Select defaultValue={siteSettings.comments.spamService}>
                    <SelectTrigger id="spam-service">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="akismet">Akismet</SelectItem>
                      <SelectItem value="recaptcha">reCAPTCHA</SelectItem>
                      <SelectItem value="honeypot">Honeypot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={() => handleSaveSettings('comments', {})}
                disabled={isSaving && currentTab === 'comments'}
              >
                {isSaving && currentTab === 'comments' ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings and privacy options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-base font-medium">Login Security</h3>
                
                <div className="flex items-center gap-2">
                  <Switch id="login-limit" 
                    defaultChecked={siteSettings.security.limitLoginAttempts} 
                  />
                  <Label htmlFor="login-limit">Limit Login Attempts</Label>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="max-attempts">Maximum Login Attempts</Label>
                  <Input
                    id="max-attempts"
                    type="number"
                    className="w-24"
                    defaultValue={siteSettings.security.maxLoginAttempts}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="lockout-time">Lockout Time (minutes)</Label>
                  <Input
                    id="lockout-time"
                    type="number"
                    className="w-24"
                    defaultValue={siteSettings.security.lockoutTime}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="two-factor" 
                    defaultChecked={siteSettings.security.twoFactorAuth} 
                  />
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid gap-4">
                <h3 className="text-base font-medium">Content Security</h3>
                
                <div className="flex items-center gap-2">
                  <Switch id="sanitize-html" 
                    defaultChecked={siteSettings.security.sanitizeHtml} 
                  />
                  <Label htmlFor="sanitize-html">Sanitize HTML in User Content</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="xmlrpc" 
                    defaultChecked={siteSettings.security.disableXmlRpc} 
                  />
                  <Label htmlFor="xmlrpc">Disable XML-RPC</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="file-editing" 
                    defaultChecked={siteSettings.security.disableFileEditing} 
                  />
                  <Label htmlFor="file-editing">Disable File Editing</Label>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid gap-4">
                <h3 className="text-base font-medium">Privacy</h3>
                
                <div className="grid gap-2">
                  <Label htmlFor="privacy-policy">Privacy Policy Page</Label>
                  <Select defaultValue={siteSettings.security.privacyPolicyPage}>
                    <SelectTrigger id="privacy-policy">
                      <SelectValue placeholder="Select page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="privacy-policy">Privacy Policy</SelectItem>
                      <SelectItem value="terms">Terms of Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="cookie-consent" 
                    defaultChecked={siteSettings.security.cookieConsent} 
                  />
                  <Label htmlFor="cookie-consent">Enable Cookie Consent Banner</Label>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="cookie-message">Cookie Consent Message</Label>
                  <Textarea
                    id="cookie-message"
                    rows={2}
                    defaultValue={siteSettings.security.cookieMessage}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch id="data-retention" 
                    defaultChecked={siteSettings.security.dataRetentionPolicy} 
                  />
                  <Label htmlFor="data-retention">Enable Data Retention Policy</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={() => handleSaveSettings('security', {})}
                disabled={isSaving && currentTab === 'security'}
              >
                {isSaving && currentTab === 'security' ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;