import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Search, Filter, Download, Eye, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { consultations, commentsData, wordCloudData, STANCE_COLORS, STANCE_BG_COLORS } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import ViewFullTextModal from '@/components/ViewFullTextModal';

const ConsultationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [wordCloudFilter, setWordCloudFilter] = useState('All');
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const consultationId = parseInt(id || '1');
  const consultation = consultations.find(c => c.id === consultationId);
  const comments = commentsData[consultationId] || [];
  const wordCloud = wordCloudData[consultationId] || {};

  const filteredComments = useMemo(() => {
    return comments
      .filter(c => filter === 'All' || c.stance === filter)
      .filter(c => 
        c.submitter.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [comments, filter, searchTerm]);

  const stanceDistribution = Object.keys(STANCE_COLORS).map(stance => ({
    name: stance,
    value: comments.filter(c => c.stance === stance).length,
    color: STANCE_COLORS[stance as keyof typeof STANCE_COLORS]
  })).filter(item => item.value > 0);

  const filteredWordCloud = wordCloud[wordCloudFilter] || [];

  if (!consultation) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">Consultation not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const maxVal = filteredWordCloud.length > 0 ? Math.max(...filteredWordCloud.map(d => d.value)) : 1;
  const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {consultation.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span>{consultation.submissions} submissions</span>
            <span>•</span>
            <span>Due: {consultation.endDate}</span>
            <span>•</span>
            <Badge variant={
              consultation.status === 'Analysis Complete' ? 'default' :
              consultation.status === 'In Progress' ? 'secondary' :
              'outline'
            }>
              {consultation.status}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            {consultation.description}
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sentiment Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
                <CardDescription>
                  Breakdown of stakeholder positions on this consultation
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
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {stanceDistribution.map((stance) => (
                    <div key={stance.name} className="flex items-center text-sm">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: stance.color }}
                      ></span>
                      <span className="text-muted-foreground">{stance.name} ({stance.value})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
                <CardDescription>
                  Analysis metrics for this consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-card-hover rounded-lg">
                    <div className="text-2xl font-bold text-primary">{comments.length}</div>
                    <div className="text-sm text-muted-foreground">Total Comments</div>
                  </div>
                  <div className="text-center p-4 bg-card-hover rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {comments.filter(c => c.stance === 'Supportive').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Supportive</div>
                  </div>
                  <div className="text-center p-4 bg-card-hover rounded-lg">
                    <div className="text-2xl font-bold text-destructive">
                      {comments.filter(c => c.stance === 'Opposed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Opposed</div>
                  </div>
                  <div className="text-center p-4 bg-card-hover rounded-lg">
                    <div className="text-2xl font-bold text-warning">
                      {comments.filter(c => c.stance === 'Concerned').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Concerned</div>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-sm text-muted-foreground mb-2">Average Quality Score</div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{ width: `${(comments.reduce((sum, c) => sum + c.qualityScore, 0) / comments.length) * 20}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">
                      {(comments.reduce((sum, c) => sum + c.qualityScore, 0) / comments.length).toFixed(1)}/5.0
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-80"
                />
              </div>
              <div className="flex items-center bg-secondary rounded-lg p-1">
                {['All', 'Supportive', 'Opposed', 'Concerned'].map(stance => (
                  <Button
                    key={stance}
                    variant={filter === stance ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilter(stance)}
                    className="text-xs"
                  >
                    {stance}
                  </Button>
                ))}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredComments.length} of {comments.length} submissions
            </span>
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <Card key={comment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{comment.submitter}</h3>
                      <p className="text-sm text-muted-foreground">{comment.stakeholderType} • {comment.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={cn("text-xs border", STANCE_BG_COLORS[comment.stance as keyof typeof STANCE_BG_COLORS])}>
                        {comment.stance}
                      </Badge>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-1">Score:</span>
                        <span className="text-sm font-medium">{comment.qualityScore}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-4">{comment.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {comment.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedComment({
                          ...comment,
                          fullText: `This is the complete submission text from ${comment.submitter}. 

${comment.summary}

Additional detailed analysis and recommendations:

The proposed amendments to the Companies Act represent a significant shift in corporate governance frameworks. Our analysis indicates several areas of concern that require careful consideration:

1. Implementation Challenges: The proposed timeline for compliance may be too aggressive for smaller companies, particularly those in emerging sectors.

2. Cost Implications: The additional reporting requirements will impose substantial compliance costs, potentially affecting the competitiveness of Indian companies in global markets.

3. Regulatory Overlap: There appears to be some overlap with existing SEBI regulations, which could create confusion and compliance burden.

4. Stakeholder Impact: The amendments will significantly impact various stakeholders including shareholders, creditors, and employees.

We recommend a phased implementation approach with adequate transition periods and clear guidance from the regulatory authorities.

Thank you for the opportunity to provide feedback on this important legislative initiative.`
                        });
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Full Text
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Salient Themes</CardTitle>
                  <CardDescription>
                    Key topics and concerns mentioned by stakeholders
                  </CardDescription>
                </div>
                <div className="flex items-center bg-secondary rounded-lg p-1">
                  {['All', 'Supportive', 'Opposed', 'Concerned'].map(stance => (
                    <Button
                      key={stance}
                      variant={wordCloudFilter === stance ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setWordCloudFilter(stance)}
                      className="text-xs"
                    >
                      {stance}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px] flex flex-wrap items-center justify-center gap-4 p-8">
                {filteredWordCloud.length > 0 ? (
                  filteredWordCloud
                    .sort((a, b) => b.value - a.value)
                    .map((word, index) => {
                      const sizeIndex = Math.min(
                        Math.floor((word.value / maxVal) * (sizes.length - 1)),
                        sizes.length - 1
                      );
                      const colorClasses = [
                        'text-primary', 'text-info', 'text-accent-foreground', 
                        'text-muted-foreground', 'text-success', 'text-warning'
                      ];
                      const color = colorClasses[index % colorClasses.length];
                      return (
                        <span
                          key={word.text}
                          title={`Frequency: ${word.value}`}
                          className={cn(
                            sizes[sizeIndex],
                            color,
                            "font-semibold transition-all hover:scale-110 cursor-pointer"
                          )}
                        >
                          {word.text}
                        </span>
                      );
                    })
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p className="text-lg">No themes available for this filter.</p>
                    <p className="text-sm mt-2">Try selecting a different stance or "All".</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stakeholder Analysis</CardTitle>
                <CardDescription>
                  Breakdown by stakeholder type and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    comments.reduce((acc, comment) => {
                      acc[comment.stakeholderType] = (acc[comment.stakeholderType] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(count / comments.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>
                  Analysis of submission quality and engagement depth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-card-hover rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {(comments.reduce((sum, c) => sum + c.qualityScore, 0) / comments.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Quality Score</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>High Quality (4.0+)</span>
                    <span>{comments.filter(c => c.qualityScore >= 4.0).length} submissions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Medium Quality (3.0-3.9)</span>
                    <span>{comments.filter(c => c.qualityScore >= 3.0 && c.qualityScore < 4.0).length} submissions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Low Quality (&lt; 3.0)</span>
                    <span>{comments.filter(c => c.qualityScore < 3.0).length} submissions</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Most Active Stakeholder Type</div>
                  <div className="text-sm text-muted-foreground">
                    {Object.entries(
                      comments.reduce((acc, comment) => {
                        acc[comment.stakeholderType] = (acc[comment.stakeholderType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ViewFullTextModal 
        comment={selectedComment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedComment(null);
        }}
      />
    </div>
  );
};

export default ConsultationDetail;