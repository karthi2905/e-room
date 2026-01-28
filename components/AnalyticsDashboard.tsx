'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { calculateMeetingStats, getMeetingTrends, getTopMeetingTimes, formatDuration } from '@/lib/analytics';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from './Loader';
import { Calendar, Clock, Users, TrendingUp, Video, BarChart3 } from 'lucide-react';

const AnalyticsDashboard = () => {
    const { endedCalls, upcomingCalls, isLoading } = useGetCalls();

    if (isLoading) return <Loader />;

    const allMeetings = [...(endedCalls || []), ...(upcomingCalls || [])];
    const stats = calculateMeetingStats(endedCalls || []);
    const trends = getMeetingTrends(endedCalls || [], 7);
    const topTimes = getTopMeetingTimes(endedCalls || []);

    const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
        <div className="bg-dark-1 rounded-xl p-6 border border-dark-3">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Meeting Analytics</h1>
                    <p className="text-gray-400 mt-1">Insights and statistics from your meetings</p>
                </div>
                <div className="flex items-center gap-2 bg-dark-1 px-4 py-2 rounded-lg border border-dark-3">
                    <BarChart3 className="w-5 h-5 text-blue-1" />
                    <span className="text-white font-medium">Last 30 Days</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Video}
                    title="Total Meetings"
                    value={stats.totalMeetings}
                    subtitle={`${stats.meetingsThisWeek} this week`}
                    color="bg-blue-1"
                />
                <StatCard
                    icon={Clock}
                    title="Total Duration"
                    value={formatDuration(stats.totalDuration)}
                    subtitle={`Avg: ${formatDuration(stats.averageDuration)}`}
                    color="bg-purple-1"
                />
                <StatCard
                    icon={Users}
                    title="Total Participants"
                    value={stats.totalParticipants}
                    subtitle={`Avg: ${stats.averageParticipants} per meeting`}
                    color="bg-orange-1"
                />
                <StatCard
                    icon={TrendingUp}
                    title="This Month"
                    value={stats.meetingsThisMonth}
                    subtitle={`${stats.meetingsThisWeek} this week`}
                    color="bg-yellow-1"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Meeting Trends */}
                <div className="bg-dark-1 rounded-xl p-6 border border-dark-3">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-1" />
                        Meeting Trends (Last 7 Days)
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={trends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#252A41" />
                            <XAxis dataKey="date" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1C1F2E',
                                    border: '1px solid #252A41',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#0E78F9"
                                strokeWidth={2}
                                name="Meetings"
                                dot={{ fill: '#0E78F9' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Peak Meeting Hours */}
                <div className="bg-dark-1 rounded-xl p-6 border border-dark-3">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-1" />
                        Peak Meeting Hours
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topTimes}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#252A41" />
                            <XAxis
                                dataKey="hour"
                                stroke="#9CA3AF"
                                tickFormatter={(hour) => `${hour}:00`}
                            />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1C1F2E',
                                    border: '1px solid #252A41',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                                labelFormatter={(hour) => `${hour}:00`}
                            />
                            <Bar dataKey="count" fill="#830EF9" name="Meetings" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Duration Chart */}
            <div className="bg-dark-1 rounded-xl p-6 border border-dark-3">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-1" />
                    Meeting Duration Trends
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#252A41" />
                        <XAxis dataKey="date" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1C1F2E',
                                border: '1px solid #252A41',
                                borderRadius: '8px',
                                color: '#fff',
                            }}
                            formatter={(value) => [`${value} minutes`, 'Duration']}
                        />
                        <Bar dataKey="duration" fill="#ff742e" name="Duration (min)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Quick Stats */}
            <div className="bg-dark-1 rounded-xl p-6 border border-dark-3">
                <h2 className="text-xl font-bold text-white mb-4">Quick Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-dark-2 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Most Active Day</p>
                        <p className="text-white text-lg font-semibold">
                            {trends.reduce((max, t) => (t.count > max.count ? t : max), trends[0])?.date || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-dark-2 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Longest Meeting</p>
                        <p className="text-white text-lg font-semibold">
                            {formatDuration(Math.max(...trends.map((t) => t.duration)))}
                        </p>
                    </div>
                    <div className="bg-dark-2 rounded-lg p-4">
                        <p className="text-gray-400 text-sm mb-1">Busiest Hour</p>
                        <p className="text-white text-lg font-semibold">
                            {topTimes[0] ? `${topTimes[0].hour}:00` : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
