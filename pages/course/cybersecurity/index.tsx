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
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Network,
  Database,
  FileText,
  Users,
  Zap,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Play,
  Download,
  Star,
} from "lucide-react";
import Layout from "components/layout/Landing";
import Link from "next/link";

const CybersecurityCourse = () => {
  const [completedModules, setCompletedModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);

  const courseModules = [
    {
      id: 1,
      title: "Introduction to Cybersecurity",
      icon: Shield,
      duration: "2 hours",
      lessons: 8,
      url: '/course/cybersecurity/01-apa-itu-cybersecurity',
      description: "Fundamentals of cybersecurity and threat landscape",
      topics: [
        "Apa itu Cybersecurity?",
        "CIA Triad (Confidentiality, Integrity, Availability)",
        "Types of Cyber Threats",
        "Cybersecurity Framework Overview",
        "Risk Assessment Basics",
        "Security Policies and Procedures",
        "Compliance and Regulations",
        "Career Paths in Cybersecurity",
      ],
    },
    {
      id: 2,
      title: "Network Security",
      icon: Network,
      duration: "4 hours",
      lessons: 12,
      description: "Securing network infrastructure and communications",
      topics: [
        "Network Architecture Security",
        "Firewalls and IDS/IPS",
        "VPN and Secure Tunneling",
        "Network Segmentation",
        "Wireless Security (WiFi, Bluetooth)",
        "Network Monitoring and Analysis",
        "DNS Security",
        "Load Balancers and Proxy Servers",
        "Network Access Control (NAC)",
        "VLAN Security",
        "Network Troubleshooting",
        "Zero Trust Network Architecture",
      ],
    },
    {
      id: 3,
      title: "Web Application Security",
      icon: Eye,
      duration: "5 hours",
      lessons: 15,
      description: "Securing web applications and APIs",
      topics: [
        "OWASP Top 10 Vulnerabilities",
        "SQL Injection Prevention",
        "Cross-Site Scripting (XSS)",
        "Cross-Site Request Forgery (CSRF)",
        "Authentication and Authorization",
        "Session Management",
        "Input Validation and Sanitization",
        "Secure Coding Practices",
        "API Security",
        "Web Application Firewalls (WAF)",
        "Security Headers",
        "Content Security Policy (CSP)",
        "HTTPS and TLS Implementation",
        "Vulnerability Assessment",
        "Penetration Testing Basics",
      ],
    },
    {
      id: 4,
      title: "Cryptography",
      icon: Lock,
      duration: "3 hours",
      lessons: 10,
      description: "Understanding encryption and cryptographic principles",
      topics: [
        "Cryptography Fundamentals",
        "Symmetric vs Asymmetric Encryption",
        "Hash Functions and Digital Signatures",
        "Public Key Infrastructure (PKI)",
        "SSL/TLS Protocols",
        "Key Management",
        "Cryptographic Algorithms (AES, RSA, SHA)",
        "Digital Certificates",
        "Blockchain and Cryptocurrency Security",
        "Quantum Cryptography Basics",
      ],
    },
    {
      id: 5,
      title: "Incident Response & Forensics",
      icon: AlertTriangle,
      duration: "4 hours",
      lessons: 11,
      description: "Handling security incidents and digital forensics",
      topics: [
        "Incident Response Planning",
        "Incident Detection and Analysis",
        "Containment and Eradication",
        "Recovery and Post-Incident Activities",
        "Digital Forensics Fundamentals",
        "Evidence Collection and Preservation",
        "Network Forensics",
        "Mobile Device Forensics",
        "Malware Analysis",
        "Legal and Ethical Considerations",
        "Reporting and Documentation",
      ],
    },
    {
      id: 6,
      title: "Identity & Access Management",
      icon: Users,
      duration: "3 hours",
      lessons: 9,
      description: "Managing user identities and access controls",
      topics: [
        "Identity Management Concepts",
        "Authentication Methods",
        "Multi-Factor Authentication (MFA)",
        "Single Sign-On (SSO)",
        "Role-Based Access Control (RBAC)",
        "Privileged Access Management (PAM)",
        "Identity Federation",
        "Directory Services (LDAP, Active Directory)",
        "Identity Governance and Administration",
      ],
    },
    {
      id: 7,
      title: "Cloud Security",
      icon: Database,
      duration: "4 hours",
      lessons: 13,
      description: "Securing cloud environments and services",
      topics: [
        "Cloud Security Models",
        "Shared Responsibility Model",
        "AWS Security Best Practices",
        "Azure Security Features",
        "Google Cloud Security",
        "Container Security",
        "Serverless Security",
        "Cloud Access Security Broker (CASB)",
        "Cloud Workload Protection",
        "Data Loss Prevention (DLP)",
        "Cloud Compliance",
        "DevSecOps in Cloud",
        "Multi-Cloud Security Strategy",
      ],
    },
    {
      id: 8,
      title: "Governance, Risk & Compliance",
      icon: FileText,
      duration: "3 hours",
      lessons: 8,
      description: "Security governance and regulatory compliance",
      topics: [
        "Security Governance Framework",
        "Risk Management Process",
        "Compliance Requirements (GDPR, HIPAA, SOX)",
        "Security Auditing",
        "Business Continuity Planning",
        "Disaster Recovery",
        "Vendor Risk Management",
        "Security Metrics and KPIs",
      ],
    },
    {
      id: 9,
      title: "Ethical Hacking & Penetration Testing",
      icon: Zap,
      duration: "6 hours",
      lessons: 18,
      description: "Hands-on security testing and ethical hacking",
      topics: [
        "Ethical Hacking Methodology",
        "Reconnaissance and Information Gathering",
        "Vulnerability Scanning",
        "Network Penetration Testing",
        "Web Application Penetration Testing",
        "Wireless Network Testing",
        "Social Engineering",
        "Physical Security Testing",
        "Post-Exploitation Techniques",
        "Privilege Escalation",
        "Lateral Movement",
        "Persistence Mechanisms",
        "Covering Tracks",
        "Reporting and Documentation",
        "Popular Testing Tools (Nmap, Metasploit, Burp Suite)",
        "Setting Up Testing Lab",
        "Legal and Ethical Considerations",
        "Certification Paths (CEH, OSCP, CISSP)",
      ],
    },
  ];

  const toggleModuleCompletion = (moduleId) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const completionPercentage =
    (completedModules.length / courseModules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Complete Cybersecurity Course
            </h1>
            <p className="text-xl text-slate-300 mb-6 max-w-3xl mx-auto">
              Master cybersecurity from fundamentals to advanced techniques.
              Learn to protect systems, networks, and data from cyber threats.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge
                variant="secondary"
                className="bg-blue-500/20 text-blue-300 border-blue-500/30"
              >
                <BookOpen className="h-4 w-4 mr-1" />9 Comprehensive Modules
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-300 border-green-500/30"
              >
                <Clock className="h-4 w-4 mr-1" />
                34+ Hours Content
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 border-purple-500/30"
              >
                <Award className="h-4 w-4 mr-1" />
                Industry Recognized
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Course Progress</span>
                <span>{Math.round(completionPercentage)}%</span>
              </div>
              <Progress
                value={completionPercentage}
                className="h-2 bg-slate-700"
              />
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-white">104</h3>
              <p className="text-slate-400">Total Lessons</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-white">34+</h3>
              <p className="text-slate-400">Hours Content</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-white">15,000+</h3>
              <p className="text-slate-400">Students</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-white">4.8</h3>
              <p className="text-slate-400">Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Modules */}
        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
            <TabsTrigger
              value="modules"
              className="data-[state=active]:bg-blue-600"
            >
              Course Modules
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-blue-600"
            >
              Resources & Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="mt-8">
            <div className="grid gap-6">
              {courseModules.map((module, index) => {
                const IconComponent = module.icon;
                const isCompleted = completedModules.includes(module.id);
                const isActive = activeModule === module.id;

                return (
                  <Card
                    key={module.id}
                    className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 ${
                      isActive ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-lg ${
                              isCompleted ? "bg-green-500/20" : "bg-blue-500/20"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-green-400" />
                            ) : (
                              <IconComponent className="h-6 w-6 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-white text-xl">
                              Module {index + 1}: {module.title}
                            </CardTitle>
                            <CardDescription className="text-slate-300 mt-1">
                              {module.description}
                            </CardDescription>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge
                                variant="outline"
                                className="border-slate-600 text-slate-300"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {module.duration}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-slate-600 text-slate-300"
                              >
                                <BookOpen className="h-3 w-3 mr-1" />
                                {module.lessons} lessons
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setActiveModule(isActive ? null : module.id)
                            }
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            {isActive ? "Hide Details" : "View Details"}
                          </Button>
                          <Button
                            variant={isCompleted ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleModuleCompletion(module.id)}
                            className={
                              isCompleted
                                ? "bg-green-600 hover:bg-green-700"
                                : "border-slate-600 text-slate-300 hover:bg-slate-700"
                            }
                          >
                            {isCompleted ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {isActive && (
                      <CardContent className="pt-0">
                        <div className="border-t border-slate-700 pt-4">
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Learning Topics:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {module.topics.map((topic, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="flex items-center space-x-2 p-2 rounded bg-slate-700/30"
                              >
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-slate-300 text-sm">
                                  {topic}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-slate-700 flex gap-1">
                            <div> 
                            <Button className="bg-blue-600 hover:bg-blue-700 mr-3">
                              <Play className="h-4 w-4 mr-2" />
                              Start Module
                            </Button>
                            </div>
                            <Button
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Materials
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-400" />
                    Lab Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    Hands-on practical exercises and virtual labs
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Access Labs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Download className="h-5 w-5 mr-2 text-green-400" />
                    Tools & Software
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    Essential cybersecurity tools and software downloads
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Download Tools
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-400" />
                    Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    Get certified upon course completion
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    View Requirements
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-800/50 border-t border-slate-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Cybersecurity Journey?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have successfully launched their
            cybersecurity careers with our comprehensive course.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Enroll Now - $99
          </Button>
        </div>
      </div>
    </div>
  );
};
CybersecurityCourse.getLayout = function (page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
export default CybersecurityCourse;
