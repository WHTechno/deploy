import { useState } from 'react';
import Layout from '../components/Layout';
import Card3D from '../components/Card3D';
import AnimatedButton from '../components/AnimatedButton';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  completed: boolean;
  link?: string;
}

export default function Task() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow @0GNetwork on Twitter',
      description: 'Follow our official Twitter account for the latest updates',
      points: 50,
      icon: '🐦',
      completed: false,
      link: 'https://twitter.com/0GNetwork'
    },
    {
      id: '2',
      title: 'Like Our Pinned Tweet',
      description: 'Show some love to our pinned announcement',
      points: 25,
      icon: '❤️',
      completed: false,
      link: 'https://twitter.com/0GNetwork'
    },
    {
      id: '3',
      title: 'Retweet Giveaway Post',
      description: 'Share our giveaway post with your followers',
      points: 75,
      icon: '🔄',
      completed: false,
      link: 'https://twitter.com/0GNetwork'
    },
    {
      id: '4',
      title: 'Join Discord Community',
      description: 'Connect with other miners in our Discord server',
      points: 100,
      icon: '💬',
      completed: false,
      link: 'https://discord.gg/0gnetwork'
    },
    {
      id: '5',
      title: 'Complete Profile Setup',
      description: 'Fill out your mining profile information',
      points: 30,
      icon: '👤',
      completed: false
    },
    {
      id: '6',
      title: 'Refer 3 Friends',
      description: 'Invite friends to join the mining platform',
      points: 200,
      icon: '👥',
      completed: false
    }
  ]);

  const [totalEarned, setTotalEarned] = useState(0);

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setTotalEarned(current => current + task.points);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Daily Tasks & Rewards 🎯</h1>
          <p className="text-white/60">Complete tasks to earn bonus mining points</p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card3D className="p-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-white">{completedTasks}/{totalTasks}</div>
              <div className="text-white/60 text-sm">Tasks Completed</div>
            </div>
          </Card3D>
          
          <Card3D className="p-6">
            <div className="text-center">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-white">{totalEarned}</div>
              <div className="text-white/60 text-sm">Points Earned</div>
            </div>
          </Card3D>
          
          <Card3D className="p-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-white">{Math.round(completionPercentage)}%</div>
              <div className="text-white/60 text-sm">Completion Rate</div>
            </div>
          </Card3D>
        </div>

        {/* Progress Bar */}
        <Card3D className="p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Overall Progress</h3>
            <span className="text-white/80">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </Card3D>

        {/* Tasks Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <Card3D key={task.id} className="p-6 relative overflow-hidden">
              {task.completed && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{task.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
                  <p className="text-white/70 mb-4">{task.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-bold">+{task.points}</span>
                      <span className="text-white/60 text-sm">points</span>
                    </div>
                    
                    {task.completed ? (
                      <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg font-medium">
                        Completed ✓
                      </div>
                    ) : (
                      <AnimatedButton
                        onClick={() => {
                          if (task.link) {
                            window.open(task.link, '_blank');
                          }
                          handleCompleteTask(task.id);
                        }}
                        variant="primary"
                        size="sm"
                      >
                        {task.link ? 'Open & Complete' : 'Mark Complete'}
                      </AnimatedButton>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Animated background for completed tasks */}
              {task.completed && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 pointer-events-none"></div>
              )}
            </Card3D>
          ))}
        </div>

        {/* Bonus Section */}
        <Card3D className="p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🎉 Completion Bonus</h3>
          <p className="text-white/70 mb-6">Complete all tasks to unlock a special bonus reward!</p>
          
          {completedTasks === totalTasks ? (
            <div className="animate-bounce">
              <AnimatedButton variant="success" size="lg">
                🎁 Claim 500 Bonus Points!
              </AnimatedButton>
            </div>
          ) : (
            <div className="text-white/60">
              Complete {totalTasks - completedTasks} more task{totalTasks - completedTasks !== 1 ? 's' : ''} to unlock bonus
            </div>
          )}
        </Card3D>
      </div>
    </Layout>
  );
}