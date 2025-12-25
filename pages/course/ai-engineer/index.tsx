import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
  Code,
  Brain,
  Database,
  Zap,
  Target,
  Award,
  Calendar,
  Globe,
} from "lucide-react";
import Layout from "components/layout/Landing";
import Link from "next/link";
import { url } from "inspector";
import { withI18n } from "@/lib/withi18n";
export const getStaticProps = withI18n(["common"]);

const AIEngineeringCourse = () => {
  const [enrolledModules, setEnrolledModules] = useState(new Set());

  const courseModules = [
    {
      id: 1,
      title: "Fundamentals of AI & Machine Learning",
      duration: "3 weeks",
      lessons: 12,
      difficulty: "Beginner",
      description:
        "Memahami konsep dasar AI, ML, dan perbedaan dengan traditional programming",
      topics: [
        {
          title: "Introduction to Artificial Intelligence",
          url: "/course/ai-engineer/01-pengantar-kecerdasan-buatan",
        },
        // "History and Evolution of AI",
        // "Types of AI: Narrow AI vs General AI",
        // "Machine Learning vs Deep Learning vs AI",
        // "Supervised vs Unsupervised vs Reinforcement Learning",
        {
          title: "AI Ethics and Bias",
          url: "/course/ai-engineer/02-etika-dan-bias-kecerdasan-buatan",
        },
        // "Setting up Development Environment",
        // "Python for AI: NumPy, Pandas, Matplotlib",
        // "Mathematics for AI: Linear Algebra Basics",
        // "Statistics and Probability Fundamentals",
        // "First ML Model: Linear Regression",
        // "Model Evaluation Metrics",
      ],
      icon: <Brain className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Data Engineering for AI",
      duration: "4 weeks",
      lessons: 16,
      difficulty: "Intermediate",
      description:
        "Mengelola dan memproses data untuk proyek AI secara efisien",
      topics: [
        // "Data Collection Methods and Sources",
        // "Web Scraping for AI Data",
        // "API Integration and Data Fetching",
        // "Data Cleaning and Preprocessing",
        // "Handling Missing Data and Outliers",
        // "Feature Engineering Techniques",
        // "Data Transformation and Normalization",
        // "Working with Different Data Types",
        // "Database Design for AI Projects",
        // "SQL for Data Scientists",
        // "NoSQL Databases: MongoDB, Redis",
        // "Data Warehousing Concepts",
        // "ETL Pipelines with Apache Airflow",
        // "Real-time Data Processing",
        // "Data Version Control with DVC",
        // "Data Quality and Validation",
      ],
      icon: <Database className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Machine Learning Engineering",
      duration: "6 weeks",
      lessons: 24,
      difficulty: "Intermediate",
      description:
        "Implementasi algoritma ML dan optimasi model untuk production",
      topics: [
        {
          title: "Scikit-learn Deep Dive",
          url: "/course/ai-engineer/01-pengantar-kecerdasan-buatan",
        },
        // "Classification Algorithms: SVM, Random Forest, XGBoost",
        // "Regression Techniques: Ridge, Lasso, Elastic Net",
        // "Clustering: K-Means, DBSCAN, Hierarchical",
        // "Dimensionality Reduction: PCA, t-SNE",
        // "Cross-validation and Hyperparameter Tuning",
        // "Ensemble Methods and Stacking",
        // "Time Series Analysis and Forecasting",
        // "Natural Language Processing Basics",
        // "Computer Vision with OpenCV",
        // "Model Selection Strategies",
        // "Overfitting and Underfitting Solutions",
        // "Feature Selection Techniques",
        // "Model Interpretability: SHAP, LIME",
        // "A/B Testing for ML Models",
        // "AutoML Tools and Techniques",
        // "ML Pipelines with Scikit-learn",
        // "Custom Transformers and Estimators",
        // "Handling Imbalanced Datasets",
        // "Multi-class and Multi-label Classification",
        // "Anomaly Detection Methods",
        // "Recommendation Systems",
        // "ML for Time Series Forecasting",
        // "Model Monitoring and Drift Detection",
      ],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Deep Learning & Neural Networks",
      duration: "5 weeks",
      lessons: 20,
      difficulty: "Advanced",
      description:
        "Membangun dan melatih neural networks dengan TensorFlow dan PyTorch",
      topics: [
        {
          title: "Fundamental Neural Networks",
          url: "/course/ai-engineer/04-fundamental-neural-network",
        },
        // "Perceptron and Multi-layer Perceptrons",
        // "Backpropagation Algorithm",
        // "Activation Functions and Optimizers",
        // "TensorFlow 2.0 Essentials",
        // "PyTorch Fundamentals",
        // "Building Your First Neural Network",
        // "Convolutional Neural Networks (CNN)",
        // "Image Classification Projects",
        // "Recurrent Neural Networks (RNN)",
        // "LSTM and GRU Networks",
        // "Natural Language Processing with RNNs",
        // "Generative Adversarial Networks (GANs)",
        // "Autoencoders and Variational Autoencoders",
        // "Transfer Learning Techniques",
        // "Fine-tuning Pre-trained Models",
        // "Regularization: Dropout, Batch Normalization",
        // "GPU Computing with CUDA",
        // "Distributed Training Strategies",
        // "Model Compression and Quantization",
      ],
      icon: <Brain className="w-6 h-6" />,
    },
    {
      id: 5,
      title: "Large Language Models & Transformers",
      duration: "4 weeks",
      lessons: 16,
      difficulty: "Advanced",
      description:
        "Memahami dan mengimplementasikan LLM modern seperti GPT, BERT",
      topics: [
        {
          title: "Transformer Architecture Deep Dive",
          url: "/course/ai-engineer/05-fundamental-arsitektur-transformer",
        },
        // "Attention Mechanism Explained",
        // "Self-Attention and Multi-Head Attention",
        {
          title: "BERT: Bidirectional Encoder Representations",
          url: "/course/ai-engineer/06-bert-bidirectional-encoder-representations",
        },
        // "GPT Family: GPT-1, GPT-2, GPT-3, GPT-4",
        // "T5: Text-to-Text Transfer Transformer",
        // "Tokenization Strategies: BPE, WordPiece",
        // "Pre-training vs Fine-tuning",
        // "Hugging Face Transformers Library",
        // "Fine-tuning BERT for Classification",
        // "GPT for Text Generation",
        // "Prompt Engineering Techniques",
        // "In-Context Learning and Few-Shot Learning",
        // "Parameter-Efficient Fine-tuning: LoRA, Adapters",
        // "Model Distillation for LLMs",
        // "Evaluation Metrics for Language Models",
      ],
      icon: <Code className="w-6 h-6" />,
    },
    {
      id: 6,
      title: "MLOps & Production Deployment",
      duration: "5 weeks",
      lessons: 20,
      difficulty: "Advanced",
      description:
        "Deployment, monitoring, dan maintenance model AI di production",
      topics: [
        {
          title: "MLOps Principles and Best Practices",
          url: "/course/ai-engineer/07-mlops",
        },
        // "Version Control for ML: Git + DVC",
        // "Experiment Tracking with MLflow",
        // "Model Registry and Lifecycle Management",
        // "Containerization with Docker",
        // "Kubernetes for ML Workloads",
        // "CI/CD Pipelines for ML Projects",
        // "Model Serving with FastAPI",
        // "Flask vs FastAPI for ML APIs",
        // "Model Deployment on AWS SageMaker",
        // "Google Cloud AI Platform",
        // "Azure Machine Learning Service",
        // "Model Monitoring and Observability",
        // "A/B Testing in Production",
        // "Feature Stores: Feast, Tecton",
        // "Data Drift and Model Drift Detection",
        // "Model Retraining Strategies",
        // "Scalable Inference Architectures",
        // "Edge Deployment and Mobile ML",
        // "Security Best Practices for ML Systems",
      ],
      icon: <Globe className="w-6 h-6" />,
    },
    {
      id: 7,
      title: "AI Product Development",
      duration: "3 weeks",
      lessons: 12,
      difficulty: "Intermediate",
      description:
        "Membangun produk AI end-to-end dari konsep hingga deployment",
      topics: [
        // "AI Product Strategy and Planning",
        // "User Experience Design for AI Products",
        // "Defining AI Use Cases and Success Metrics",
        // "Building AI-Powered Web Applications",
        // "Frontend Integration with AI APIs",
        // "Real-time AI Applications with WebSockets",
        // "Mobile AI Applications Development",
        // "AI Chatbots and Conversational Interfaces",
        // "Computer Vision Applications",
        // "Recommendation System Implementation",
        // "AI Product Analytics and Metrics",
        // "Go-to-Market Strategy for AI Products",
      ],
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: 8,
      title: "Capstone Project",
      duration: "4 weeks",
      lessons: 8,
      difficulty: "Advanced",
      description: "Proyek akhir untuk mengintegrasikan semua pembelajaran",
      topics: [
        // "Project Planning and Scope Definition",
        // "End-to-End ML Pipeline Development",
        // "Advanced Feature Engineering",
        // "Model Architecture Design",
        // "Production Deployment Setup",
        // "Performance Optimization",
        // "Documentation and Testing",
        // "Project Presentation and Portfolio",
      ],
      icon: <Award className="w-6 h-6" />,
    },
  ];

  const courseStats = {
    totalLessons: courseModules.reduce(
      (acc, module) => acc + module.lessons,
      0
    ),
    totalDuration: "34 weeks",
    studentsEnrolled: "12,458",
    rating: 4.8,
    completionRate: 89,
  };

  const toggleEnrollment = (moduleId) => {
    const newEnrolled = new Set(enrolledModules);
    if (newEnrolled.has(moduleId)) {
      newEnrolled.delete(moduleId);
    } else {
      newEnrolled.add(moduleId);
    }
    setEnrolledModules(newEnrolled);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Complete AI Engineering Course
                </CardTitle>
                <CardDescription className="text-lg">
                  Master the complete AI engineering pipeline from fundamentals
                  to production deployment. Build real-world AI applications and
                  become a professional AI engineer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {courseStats.totalLessons}
                    </div>
                    <div className="text-sm text-gray-600">Lessons</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">
                      {courseStats.totalDuration}
                    </div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold">
                      {courseStats.studentsEnrolled}
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <div className="text-2xl font-bold">
                      {courseStats.rating}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">What You'll Learn:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Build end-to-end ML pipelines</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Deploy AI models to production</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Work with Large Language Models</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Implement MLOps best practices</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Build AI-powered applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Master deep learning frameworks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>
                        {Math.round(
                          (enrolledModules.size / courseModules.length) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (enrolledModules.size / courseModules.length) * 100
                      }
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    {enrolledModules.size} of {courseModules.length} modules
                    enrolled
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Self-paced learning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Certificate of completion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Hands-on projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">Community support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Modules */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Course Curriculum
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courseModules.map((module, index) => (
              <Card
                key={module.id}
                className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg text-white">
                        {module.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {module.title}
                        </CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{module.lessons} lessons</span>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="topics">Topics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        {module.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Button
                          variant={
                            enrolledModules.has(module.id)
                              ? "secondary"
                              : "default"
                          }
                          onClick={() => toggleEnrollment(module.id)}
                          className="flex items-center space-x-2"
                        >
                          {enrolledModules.has(module.id) ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Enrolled</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Start Module</span>
                            </>
                          )}
                        </Button>
                        {!enrolledModules.has(module.id) && index > 0 && (
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Lock className="w-4 h-4" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="topics" className="mt-4">
                      <div className="max-h-48 overflow-y-auto">
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="flex items-center space-x-2 text-sm"
                            >
                              {typeof topic === "string" ? (
                                <>
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  <span>{topic}</span>
                                </>
                              ) : (
                                <>
                                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                  <Link href={topic?.url}>{topic?.title}</Link>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
AIEngineeringCourse.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
export default AIEngineeringCourse;
