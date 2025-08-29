export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  rank?: string;
  answersCount?: number;
}

export interface Answer {
  id: string;
  author: User;
  content: string;
  isBestAnswer: boolean;
  isVerified: boolean;
  createdAt: string;
  thanks: number;
  rating: number;
  ratingCount: number;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  answers: Answer[];
  tags: string[];
}

export interface SubjectAnswers {
  subject: string;
  answers: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  stats: {
    totalThanks: number;
    totalQuestions: number;
    bestAnswers: number;
    points: number;
    followers: number;
    following: number;
  };
  answersBySubject: SubjectAnswers[];
}
