import React from 'react';
import { Download, FileText, BarChart3, Users, Calendar, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ExportReports = () => {
  const reportTypes = [
    {
      title: 'Consultation Report',
      description: 'Comprehensive analysis report for selected consultation',
      icon: FileText,
      format: ['PDF', 'DOCX'],
      size: '2-5 MB',
      generateTime: '30 seconds'
    },
    {
      title: 'Trend Analysis',
      description: 'Historical trend analysis across all consultations',
      icon: BarChart3,
      format: ['PDF', 'Excel'],
      size: '1-3 MB',
      generateTime: '45 seconds'
    },
    {
      title: 'Stakeholder Report',
      description: 'Detailed stakeholder engagement analysis',
      icon: Users,
      format: ['PDF', 'CSV'],
      size: '500 KB - 2 MB',
      generateTime: '20 seconds'
    },
    {
      title: 'Raw Data Export',
      description: 'Export raw submission data for external analysis',
      icon: Calendar,
      format: ['CSV', 'JSON'],
      size: '100 KB - 1 MB',
      generateTime: '10 seconds'
    }
  ];

  const recentReports = [
    {
      name: 'Companies Amendment Bill Analysis',
      type: 'Consultation Report',
      generatedAt: '2025-01-15 14:30',
      size: '3.2 MB',
      status: 'Ready'
    },
    {
      name: 'Q4 2024 Stakeholder Engagement',
      type: 'Stakeholder Report',
      generatedAt: '2025-01-14 09:15',
      size: '1.8 MB',
      status: 'Ready'
    },
    {
      name: 'CSR Rules Trend Analysis',
      type: 'Trend Analysis',
      generatedAt: '2025-01-13 16:45',
      size: '2.1 MB',
      status: 'Ready'
    }
  ];

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report...`);
    // Add actual report generation logic here
  };

  const handleDownload = (reportName: string) => {
    console.log(`Downloading ${reportName}...`);
    // Add actual download logic here
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-secondary rounded-xl p-8 border">
        <h1 className="text-3xl font-bold text-foreground mb-2">Export & Reports</h1>
        <p className="text-muted-foreground text-lg">
          Generate comprehensive reports and export data from Project Saaransh
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generation */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Printer className="h-5 w-5 mr-2" />
                Generate New Report
              </CardTitle>
              <CardDescription>
                Create comprehensive analysis reports in multiple formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportTypes.map((report) => (
                <div key={report.title} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <report.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {report.format.map((format) => (
                        <Badge key={format} variant="outline" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleGenerateReport(report.title)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Size: {report.size}</span>
                    <span>~{report.generateTime}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Download previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <p className="text-xs text-muted-foreground">{report.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <div>Generated: {report.generatedAt}</div>
                      <div>Size: {report.size}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownload(report.name)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common export operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Export All Consultations Summary
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Export Stakeholder Database
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Analytics Dashboard
              </Button>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Scheduled Reports</p>
                <p>Weekly stakeholder summary: Every Monday 9:00 AM</p>
                <p>Monthly trend analysis: First day of month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;