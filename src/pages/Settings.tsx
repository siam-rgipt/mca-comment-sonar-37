import React from 'react';
import { Settings2, User, Shield, Download, Database, Bell, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-secondary rounded-xl p-8 border">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Configure your Project Saaransh preferences and system settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <Settings2 className="h-5 w-5 mr-2" />
              Settings Categories
            </h3>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Data & Privacy
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export & Reports
              </Button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Manage your personal information and account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Ishaan" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Saxena" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="ishaan.saxena@mca.gov.in" />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" defaultValue="Policy Analyst" />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Submissions</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new feedback is submitted
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analysis Complete</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when sentiment analysis is finished
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summary reports via email
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important system maintenance and updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security & Access
              </CardTitle>
              <CardDescription>
                Manage your account security and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">SMS Authentication</p>
                    <p className="text-xs text-muted-foreground">+91 ****-***-789</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Session Management</Label>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Active Sessions: 2</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Current session expires in 4 hours
                  </p>
                  <Button variant="outline" size="sm">View All Sessions</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>API Access</Label>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">API Key Status</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Last used: 2 hours ago
                  </p>
                  <Button variant="outline" size="sm">Generate New Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export & Reports
              </CardTitle>
              <CardDescription>
                Configure report generation and data export preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Consultation Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive analysis report for selected consultation
                  </p>
                  <Button size="sm" variant="outline">Generate Report</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Trend Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Historical trend analysis across all consultations
                  </p>
                  <Button size="sm" variant="outline">Export Data</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Stakeholder Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Detailed stakeholder engagement analysis
                  </p>
                  <Button size="sm" variant="outline">Generate Report</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Raw Data Export</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Export raw submission data for external analysis
                  </p>
                  <Button size="sm" variant="outline">Export CSV</Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automated Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically generate and email weekly summary reports
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Current system status and version information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Version</p>
                  <p className="text-muted-foreground">Project Saaransh v2.1.0</p>
                </div>
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-muted-foreground">September 20, 2025</p>
                </div>
                <div>
                  <p className="font-medium">Database</p>
                  <p className="text-muted-foreground">Connected (99.9% uptime)</p>
                </div>
                <div>
                  <p className="font-medium">AI Engine</p>
                  <p className="text-muted-foreground">Legal-BERT v3.2 Active</p>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <Button variant="outline" className="w-full">
                  Check for System Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;