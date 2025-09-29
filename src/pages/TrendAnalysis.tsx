import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trendAnalysisData } from '@/data/mockData';

const TrendAnalysis = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-secondary rounded-xl p-8 border">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trend Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Historical patterns and trends in e-consultation feedback over time
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Consultations</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-success mt-2">+12% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Submissions</p>
                <p className="text-2xl font-bold">1,245</p>
              </div>
              <Users className="h-8 w-8 text-info" />
            </div>
            <p className="text-xs text-success mt-2">+8% participation rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">18 days</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
            <p className="text-xs text-success mt-2">-3 days improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Score</p>
                <p className="text-2xl font-bold">4.2</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-success mt-2">+0.3 increase</p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Trends Over Time</CardTitle>
            <CardDescription>
              Key concerns raised in consultations from 2021-2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={trendAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="Data Privacy Concerns" 
                  fill="hsl(var(--primary))" 
                  name="Data Privacy Concerns"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="CSR Compliance" 
                  fill="hsl(var(--success))" 
                  name="CSR Compliance"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trends</CardTitle>
            <CardDescription>
              Evolution of stakeholder sentiment patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendAnalysisData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Data Privacy Concerns" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  name="Negative Sentiment"
                  dot={{ fill: 'hsl(var(--destructive))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="CSR Compliance" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Positive Sentiment"
                  dot={{ fill: 'hsl(var(--success))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              Data-driven insights from trend analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Rising Data Privacy Concerns</h4>
              <p className="text-sm text-muted-foreground">
                Data privacy issues have increased by 45% in 2025, indicating growing stakeholder awareness 
                and the need for stronger regulatory frameworks.
              </p>
            </div>
            
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <h4 className="font-semibold text-success mb-2">CSR Compliance Stabilizing</h4>
              <p className="text-sm text-muted-foreground">
                CSR compliance concerns have decreased significantly, suggesting improved corporate 
                understanding and implementation of CSR guidelines.
              </p>
            </div>

            <div className="p-4 bg-info/5 border border-info/20 rounded-lg">
              <h4 className="font-semibold text-info mb-2">Stakeholder Engagement Growth</h4>
              <p className="text-sm text-muted-foreground">
                Overall participation in e-consultations has grown by 28% over the past two years, 
                indicating increased public engagement with policy-making.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Analysis</CardTitle>
            <CardDescription>
              AI-powered predictions for upcoming trends
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Predicted Focus Areas (Next 6 Months)</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI & Automation Governance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-secondary rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">85%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Digital Identity & KYC</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-secondary rounded-full h-2">
                      <div className="bg-info h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">72%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">ESG Reporting Standards</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-secondary rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">68%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Cybersecurity Compliance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-secondary rounded-full h-2">
                      <div className="bg-destructive h-2 rounded-full" style={{ width: '61%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">61%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Generate Detailed Forecast Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>
            Strategic recommendations based on trend analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">Policy Priority</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Fast-track data privacy regulations to address growing stakeholder concerns.
              </p>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
            
            <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">Stakeholder Engagement</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Develop targeted outreach programs to maintain high engagement levels.
              </p>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
            
            <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2">Process Optimization</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Implement AI-powered pre-screening to improve response efficiency.
              </p>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;