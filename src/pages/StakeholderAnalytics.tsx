import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building, UserCheck, TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

const StakeholderAnalytics = () => {
  const stakeholderStats = [
    { type: 'Law Firms', count: 245, percentage: 35, growth: '+12%' },
    { type: 'Industry Bodies', count: 156, percentage: 22, growth: '+8%' },
    { type: 'NGOs', count: 134, percentage: 19, growth: '+15%' },
    { type: 'Individuals', count: 98, percentage: 14, growth: '+25%' },
    { type: 'Consulting Firms', count: 67, percentage: 10, growth: '+5%' }
  ];

  const engagementData = [
    { name: 'Jan', submissions: 45, quality: 4.2 },
    { name: 'Feb', submissions: 52, quality: 4.1 },
    { name: 'Mar', submissions: 68, quality: 4.3 },
    { name: 'Apr', submissions: 71, quality: 4.4 },
    { name: 'May', submissions: 89, quality: 4.2 },
    { name: 'Jun', submissions: 95, quality: 4.5 }
  ];

  const topStakeholders = [
    { name: 'Apex Law Associates', submissions: 23, avgQuality: 4.8, type: 'Law Firm' },
    { name: 'Federation of Indian Industries', submissions: 19, avgQuality: 4.6, type: 'Industry Body' },
    { name: 'Good Governance Foundation', submissions: 17, avgQuality: 4.5, type: 'NGO' },
    { name: 'Corporate Solutions Ltd', submissions: 15, avgQuality: 4.4, type: 'Consulting Firm' },
    { name: 'National Trade Association', submissions: 14, avgQuality: 4.7, type: 'Industry Body' }
  ];

  const sentimentByStakeholder = [
    { name: 'Law Firms', supportive: 35, opposed: 45, concerned: 20 },
    { name: 'Industry Bodies', supportive: 28, opposed: 52, concerned: 20 },
    { name: 'NGOs', supportive: 65, opposed: 15, concerned: 20 },
    { name: 'Individuals', supportive: 40, opposed: 30, concerned: 30 },
    { name: 'Consulting Firms', supportive: 50, opposed: 25, concerned: 25 }
  ];

  const COLORS = ['#3B82F6', '#EF4444', '#F97316', '#22C55E', '#A855F7'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Law Firm': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Industry Body': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'NGO': return 'bg-green-100 text-green-800 border-green-200';
      case 'Consulting Firm': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Stakeholder Analytics</h1>
        <p className="text-slate-600">Comprehensive insights into stakeholder participation and engagement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Stakeholders</p>
                <p className="text-2xl font-bold text-slate-800">700</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Participants</p>
                <p className="text-2xl font-bold text-slate-800">458</p>
                <p className="text-xs text-green-600">+8% engagement rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Organizations</p>
                <p className="text-2xl font-bold text-slate-800">312</p>
                <p className="text-xs text-blue-600">5 stakeholder types</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Avg Quality Score</p>
                <p className="text-2xl font-bold text-slate-800">4.3</p>
                <p className="text-xs text-green-600">+0.2 improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stakeholder Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2" />
              Stakeholder Distribution
            </CardTitle>
            <CardDescription>Breakdown by stakeholder type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stakeholderStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="type"
                >
                  {stakeholderStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {stakeholderStats.map((item, index) => (
                <div key={item.type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-slate-600">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.count}</span>
                    <span className="text-green-600 text-xs">{item.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Engagement Trends
            </CardTitle>
            <CardDescription>Monthly submission and quality trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={engagementData}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="submissions" fill="#3B82F6" name="Submissions" />
                <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#EF4444" name="Avg Quality" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Stakeholders */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Stakeholders</CardTitle>
          <CardDescription>Most active and highest quality contributors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topStakeholders.map((stakeholder, index) => (
              <div key={stakeholder.name} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{stakeholder.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getTypeColor(stakeholder.type)}>
                        {stakeholder.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-800">{stakeholder.submissions}</div>
                  <div className="text-sm text-slate-600">submissions</div>
                  <div className="text-sm text-green-600">★ {stakeholder.avgQuality}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sentiment by Stakeholder Type */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis by Stakeholder Type</CardTitle>
          <CardDescription>Distribution of stance across different stakeholder categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentByStakeholder}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="supportive" stackId="a" fill="#22C55E" name="Supportive" />
              <Bar dataKey="opposed" stackId="a" fill="#EF4444" name="Opposed" />
              <Bar dataKey="concerned" stackId="a" fill="#F97316" name="Concerned" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StakeholderAnalytics;