import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FileText, TrendingUp, Users, Clock, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { consultations, commentsData, STANCE_COLORS } from '@/data/mockData';

const Dashboard = () => {
  // Calculate overall statistics
  const totalSubmissions = consultations.reduce((sum, c) => sum + c.submissions, 0);
  const activeConsultations = consultations.filter(c => c.status === 'In Progress').length;
  const completedConsultations = consultations.filter(c => c.status === 'Analysis Complete' || c.status === 'Completed').length;

  // Calculate sentiment distribution across all consultations
  const allComments = Object.values(commentsData).flat();
  const stanceDistribution = Object.keys(STANCE_COLORS).map(stance => ({
    name: stance,
    value: allComments.filter(comment => comment.stance === stance).length,
    color: STANCE_COLORS[stance as keyof typeof STANCE_COLORS]
  }));

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Analysis Complete':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Analysis Complete':
        return <CheckCircle className="h-4 w-4" />;
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      case 'Completed':
        return <Star className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-secondary rounded-xl p-8 border text-foreground">
        <h1 className="text-3xl font-bold mb-2">Project Saaransh Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          AI-powered sentiment analysis for MCA e-consultation feedback
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-primary">{totalSubmissions}</div>
            <div className="text-sm text-muted-foreground">Total Submissions</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-primary">{activeConsultations}</div>
            <div className="text-sm text-muted-foreground">Active Consultations</div>
          </div>
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-2xl font-bold text-primary">{completedConsultations}</div>
            <div className="text-sm text-muted-foreground">Completed Analyses</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button asChild className="h-auto p-6 justify-start" variant="outline">
          <Link to="/trends" className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6" />
            <div>
              <div className="font-semibold">Trend Analysis</div>
              <div className="text-sm text-muted-foreground">View historical patterns</div>
            </div>
          </Link>
        </Button>
        
        <Button asChild className="h-auto p-6 justify-start" variant="outline">
          <Link to="/analytics" className="flex items-center space-x-3">
            <Users className="h-6 w-6" />
            <div>
              <div className="font-semibold">Stakeholder Insights</div>
              <div className="text-sm text-muted-foreground">Analyze stakeholder feedback</div>
            </div>
          </Link>
        </Button>
        
        <Button asChild className="h-auto p-6 justify-start" variant="outline">
          <Link to="/reports" className="flex items-center space-x-3">
            <FileText className="h-6 w-6" />
            <div>
              <div className="font-semibold">Export Reports</div>
              <div className="text-sm text-muted-foreground">Generate analysis reports</div>
            </div>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Sentiment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Sentiment Distribution</CardTitle>
            <CardDescription>
              Sentiment analysis across all active consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {stanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {stanceDistribution.map((stance) => (
                <div key={stance.name} className="flex items-center text-sm">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: stance.color }}
                  ></span>
                  <span className="text-muted-foreground">{stance.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Consultations */}
        <Card>
          <CardHeader>
            <CardTitle>Active Consultations</CardTitle>
            <CardDescription>
              Current e-consultation processes and their status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultations.map((consultation) => (
              <div key={consultation.id} className="border rounded-lg p-4 hover:bg-card-hover transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm leading-relaxed pr-4">
                    {consultation.title}
                  </h3>
                  <Badge variant={getStatusBadgeVariant(consultation.status)} className="flex items-center gap-1 shrink-0">
                    {getStatusIcon(consultation.status)}
                    {consultation.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{consultation.submissions} submissions</span>
                  <span>Due: {consultation.endDate}</span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex-1 bg-secondary rounded-full h-2 mr-3">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${consultation.progress}%` }}
                    ></div>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/consultation/${consultation.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest submissions and analysis updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allComments.slice(0, 5).map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-card-hover transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{comment.submitter}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {comment.summary}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {comment.stakeholderType}
                    </Badge>
                    <Badge 
                      className={`text-xs ${
                        comment.stance === 'Supportive' ? 'bg-success/10 text-success' :
                        comment.stance === 'Opposed' ? 'bg-destructive/10 text-destructive' :
                        comment.stance === 'Concerned' ? 'bg-warning/10 text-warning' :
                        'bg-info/10 text-info'
                      }`}
                    >
                      {comment.stance}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;