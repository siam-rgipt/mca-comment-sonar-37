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
    <div className="container-fluid space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-secondary rounded-xl p-6 sm:p-8 lg:p-10 border text-foreground hover-lift">
        <h1 className="heading-responsive font-bold mb-2 sm:mb-4">Project Saaransh Dashboard</h1>
        <p className="text-muted-foreground text-responsive mb-6 sm:mb-8">
          AI-powered sentiment analysis for MCA e-consultation feedback
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-card rounded-lg p-4 sm:p-6 border interactive-card animate-stagger-1">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{totalSubmissions}</div>
            <div className="text-sm sm:text-base text-muted-foreground">Total Submissions</div>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border interactive-card animate-stagger-2">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{activeConsultations}</div>
            <div className="text-sm sm:text-base text-muted-foreground">Active Consultations</div>
          </div>
          <div className="bg-card rounded-lg p-4 sm:p-6 border interactive-card animate-stagger-3">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{completedConsultations}</div>
            <div className="text-sm sm:text-base text-muted-foreground">Completed Analyses</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 animate-slide-up">
        <Button asChild className="h-auto p-6 sm:p-8 justify-start hover-lift animate-stagger-1" variant="outline">
          <Link to="/trends" className="flex items-center space-x-3 sm:space-x-4">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <div>
              <div className="font-semibold text-base sm:text-lg">Trend Analysis</div>
              <div className="text-sm sm:text-base text-muted-foreground">View historical patterns</div>
            </div>
          </Link>
        </Button>
        
        <Button asChild className="h-auto p-6 sm:p-8 justify-start hover-lift animate-stagger-2" variant="outline">
          <Link to="/analytics" className="flex items-center space-x-3 sm:space-x-4">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <div>
              <div className="font-semibold text-base sm:text-lg">Stakeholder Insights</div>
              <div className="text-sm sm:text-base text-muted-foreground">Analyze stakeholder feedback</div>
            </div>
          </Link>
        </Button>
        
        <Button asChild className="h-auto p-6 sm:p-8 justify-start hover-lift animate-stagger-3" variant="outline">
          <Link to="/reports" className="flex items-center space-x-3 sm:space-x-4">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <div>
              <div className="font-semibold text-base sm:text-lg">Export Reports</div>
              <div className="text-sm sm:text-base text-muted-foreground">Generate analysis reports</div>
            </div>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 animate-scale-in">
        {/* Overall Sentiment Distribution */}
        <Card className="hover-lift animate-stagger-1">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Overall Sentiment Distribution</CardTitle>
            <CardDescription className="text-responsive">
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
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
              {stanceDistribution.map((stance) => (
                <div key={stance.name} className="flex items-center text-sm sm:text-base">
                  <span
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 pulse-dot"
                    style={{ backgroundColor: stance.color }}
                  ></span>
                  <span className="text-muted-foreground">{stance.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Consultations */}
        <Card className="hover-lift animate-stagger-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Active Consultations</CardTitle>
            <CardDescription className="text-responsive">
              Current e-consultation processes and their status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultations.map((consultation, index) => (
              <div 
                key={consultation.id} 
                className="border rounded-lg p-4 sm:p-5 interactive-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-sm sm:text-base leading-relaxed pr-4">
                    {consultation.title}
                  </h3>
                  <Badge variant={getStatusBadgeVariant(consultation.status)} className="flex items-center gap-1 shrink-0 text-xs sm:text-sm">
                    {getStatusIcon(consultation.status)}
                    <span className="hidden sm:inline">{consultation.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3">
                  <span>{consultation.submissions} submissions</span>
                  <span>Due: {consultation.endDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1 bg-secondary rounded-full h-2 sm:h-3 mr-3">
                    <div
                      className="bg-primary h-2 sm:h-3 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${consultation.progress}%` }}
                    ></div>
                  </div>
                  <Button asChild size="sm" variant="outline" className="text-xs sm:text-sm">
                    <Link to={`/consultation/${consultation.id}`}>
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="hover-lift animate-slide-up">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
          <CardDescription className="text-responsive">
            Latest submissions and analysis updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {allComments.slice(0, 5).map((comment, index) => (
              <div 
                key={comment.id} 
                className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg interactive-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary mt-2 pulse-dot"></div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm sm:text-base">{comment.submitter}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{comment.date}</span>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                    {comment.summary}
                  </p>
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {comment.stakeholderType}
                    </Badge>
                    <Badge 
                      className={`text-xs sm:text-sm ${
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