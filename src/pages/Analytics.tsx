import React from 'react';
import { Users, Building2, FileText, TrendingUp, Calendar, Award, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { commentsData, consultations, STANCE_BG_COLORS } from '@/data/mockData';

const Analytics = () => {
  // Calculate analytics data
  const allComments = Object.values(commentsData).flat();
  
  const stakeholderTypes = allComments.reduce((acc, comment) => {
    acc[comment.stakeholderType] = (acc[comment.stakeholderType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stanceByType = allComments.reduce((acc, comment) => {
    if (!acc[comment.stakeholderType]) {
      acc[comment.stakeholderType] = {};
    }
    acc[comment.stakeholderType][comment.stance] = (acc[comment.stakeholderType][comment.stance] || 0) + 1;
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const topStakeholders = Object.entries(stakeholderTypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const averageQualityByType = Object.entries(
    allComments.reduce((acc, comment) => {
      if (!acc[comment.stakeholderType]) {
        acc[comment.stakeholderType] = { total: 0, count: 0 };
      }
      acc[comment.stakeholderType].total += comment.qualityScore;
      acc[comment.stakeholderType].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>)
  ).map(([type, data]) => ({
    type,
    average: (data.total / data.count).toFixed(1)
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-secondary rounded-xl p-8 border">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive analysis of stakeholder engagement and feedback patterns
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Stakeholders</p>
                <p className="text-2xl font-bold">{Object.keys(stakeholderTypes).length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Unique stakeholder types</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Submissions</p>
                <p className="text-2xl font-bold">{allComments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-info" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Across all consultations</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Quality Score</p>
                <p className="text-2xl font-bold">
                  {(allComments.reduce((sum, c) => sum + c.qualityScore, 0) / allComments.length).toFixed(1)}
                </p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Stakeholder participation</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stakeholders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
          <TabsTrigger value="trends">Patterns</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
        </TabsList>

        <TabsContent value="stakeholders" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Stakeholders */}
            <Card>
              <CardHeader>
                <CardTitle>Most Active Stakeholders</CardTitle>
                <CardDescription>
                  Stakeholder types by submission volume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topStakeholders.map(([type, count], index) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-primary text-primary-foreground' :
                        index === 1 ? 'bg-success text-success-foreground' :
                        index === 2 ? 'bg-warning text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index === 0 ? <Building2 size={16} /> :
                         index === 1 ? <Users size={16} /> :
                         <FileText size={16} />}
                      </div>
                      <div>
                        <p className="font-medium">{type}</p>
                        <p className="text-sm text-muted-foreground">
                          {((count / allComments.length) * 100).toFixed(1)}% of submissions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{count}</p>
                      <p className="text-xs text-muted-foreground">submissions</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stakeholder Stance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Stance by Stakeholder Type</CardTitle>
                <CardDescription>
                  How different stakeholder types position themselves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(stanceByType).slice(0, 4).map(([type, stances]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{type}</span>
                      <span className="text-xs text-muted-foreground">
                        {Object.values(stances).reduce((sum, count) => sum + count, 0)} total
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Object.entries(stances).map(([stance, count]) => (
                        <div
                          key={stance}
                          className="h-2 rounded-full"
                          style={{
                            width: `${(count / Object.values(stances).reduce((sum, c) => sum + c, 0)) * 100}%`,
                            backgroundColor: stance === 'Supportive' ? 'hsl(var(--success))' :
                                           stance === 'Opposed' ? 'hsl(var(--destructive))' :
                                           stance === 'Concerned' ? 'hsl(var(--warning))' :
                                           'hsl(var(--info))'
                          }}
                          title={`${stance}: ${count}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Timeline</CardTitle>
                <CardDescription>
                  Submission patterns over time by consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultations.map((consultation) => {
                  const submissions = commentsData[consultation.id]?.length || 0;
                  const progress = (submissions / consultation.submissions) * 100;
                  
                  return (
                    <div key={consultation.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{consultation.title}</span>
                        <span className="text-xs text-muted-foreground">{submissions} submissions</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Due: {consultation.endDate}</span>
                        <Badge variant={
                          consultation.status === 'Analysis Complete' ? 'default' :
                          consultation.status === 'In Progress' ? 'secondary' :
                          'outline'
                        }>
                          {consultation.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Quality Distribution</CardTitle>
                <CardDescription>
                  Quality scores across stakeholder types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {averageQualityByType.slice(0, 5).map(({ type, average }) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="font-medium text-sm">{type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${(parseFloat(average) / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{average}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Score Analysis</CardTitle>
                <CardDescription>
                  Distribution of submission quality scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { label: 'Excellent (4.5-5.0)', count: allComments.filter(c => c.qualityScore >= 4.5).length, color: 'bg-success' },
                    { label: 'Good (4.0-4.4)', count: allComments.filter(c => c.qualityScore >= 4.0 && c.qualityScore < 4.5).length, color: 'bg-info' },
                    { label: 'Average (3.0-3.9)', count: allComments.filter(c => c.qualityScore >= 3.0 && c.qualityScore < 4.0).length, color: 'bg-warning' },
                    { label: 'Below Average (< 3.0)', count: allComments.filter(c => c.qualityScore < 3.0).length, color: 'bg-destructive' }
                  ].map(({ label, count, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${color}`}></div>
                        <span className="text-sm">{label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div
                            className={`${color} h-2 rounded-full`}
                            style={{ width: `${(count / allComments.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Quality Contributors</CardTitle>
                <CardDescription>
                  Highest quality submissions by stakeholder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {allComments
                  .sort((a, b) => b.qualityScore - a.qualityScore)
                  .slice(0, 5)
                  .map((comment, index) => (
                    <div key={comment.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-sm">{comment.submitter}</p>
                          <p className="text-xs text-muted-foreground">{comment.stakeholderType}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{comment.qualityScore}/5</Badge>
                          {index < 3 && (
                            <Badge className={
                              index === 0 ? 'bg-success text-success-foreground' :
                              index === 1 ? 'bg-info text-info-foreground' :
                              'bg-warning text-warning-foreground'
                            }>
                              #{index + 1}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {comment.summary}
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submission Patterns</CardTitle>
                <CardDescription>
                  Key insights from stakeholder behavior analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Peak Engagement Period</h4>
                  <p className="text-sm text-muted-foreground">
                    Most submissions occur in the final 2 weeks before consultation deadline, 
                    indicating last-minute stakeholder mobilization.
                  </p>
                </div>

                <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                  <h4 className="font-semibold text-success mb-2">Quality Correlation</h4>
                  <p className="text-sm text-muted-foreground">
                    Industry bodies and law firms consistently provide higher quality submissions 
                    compared to individual stakeholders.
                  </p>
                </div>

                <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <h4 className="font-semibold text-warning mb-2">Stance Predictability</h4>
                  <p className="text-sm text-muted-foreground">
                    NGOs show 85% supportive stance on transparency measures, 
                    while industry bodies are 70% opposed to compliance increases.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Predictive Insights</CardTitle>
                <CardDescription>
                  AI-powered predictions for future consultations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Expected Stakeholder Response</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>High Industry Engagement</span>
                      <span className="text-warning font-medium">92% likely</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NGO Participation</span>
                      <span className="text-success font-medium">78% likely</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Individual Submissions</span>
                      <span className="text-info font-medium">65% likely</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Legal Firm Response</span>
                      <span className="text-primary font-medium">87% likely</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Recommended Actions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Target early outreach to individual stakeholders</li>
                    <li>• Prepare for high-volume industry responses</li>
                    <li>• Allocate additional review time for complex submissions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;