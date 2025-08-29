import type { Answer, Question, User, UserProfile, SubjectAnswers } from '@/types';

// --- Dummy Data ---

const dummyUser: User = {
  id: '101',
  name: 'Dummy User',
  avatarUrl: 'https://picsum.photos/seed/dummyuser/100/100',
  rank: 'Ace',
  answersCount: 1234,
};

const dummyAnswers: Answer[] = [
  {
    id: '201',
    author: dummyUser,
    content: 'This is a dummy answer because the API failed to load. The sky appears blue because of a phenomenon called Rayleigh scattering. Short-wavelength blue light is scattered more than other colors by the tiny molecules of air in Earth\'s atmosphere.',
    isBestAnswer: true,
    isVerified: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    thanks: 10,
    rating: 5,
    ratingCount: 2,
  },
  {
    id: '202',
    author: {
      id: '102',
      name: 'Another Dummy',
      avatarUrl: 'https://picsum.photos/seed/anotherdummy/100/100',
      rank: 'Expert',
      answersCount: 56,
    },
    content: 'This is another dummy answer. To add to the previous point, while violet light is scattered even more than blue, our eyes are more sensitive to blue, and the sun emits less violet light.',
    isBestAnswer: false,
    isVerified: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    thanks: 5,
    rating: 4,
    ratingCount: 1,
  },
];

const dummyQuestions: Question[] = [
  {
    id: '99991',
    title: 'Dummy Question: Why is the sky blue?',
    content: '<p>This is a dummy question because the data API failed to load. Can someone explain Rayleigh scattering?</p>',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    author: dummyUser,
    answers: dummyAnswers,
    tags: ['dummy', 'science'],
  },
  {
    id: '99992',
    title: 'Dummy Question: What is the capital of France?',
    content: '<p>I forgot. Is it London? This is a dummy question because the API failed.</p>',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    author: dummyUser,
    answers: [
        {
            id: '203',
            author: dummyUser,
            content: 'The capital of France is Paris.',
            isBestAnswer: true,
            isVerified: true,
            createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
            thanks: 1,
            rating: 5,
            ratingCount: 1,
        }
    ],
    tags: ['dummy', 'geography'],
  }
];

const dummyUserProfile: UserProfile = {
  id: '999',
  name: 'Dummy Profile',
  avatarUrl: 'https://picsum.photos/seed/dummyprofile/100/100',
  description: 'This is a dummy user profile, displayed when the real data cannot be fetched.',
  stats: {
    totalThanks: 42,
    totalQuestions: 5,
    bestAnswers: 3,
    points: 1337,
    followers: 10,
    following: 20,
  },
  answersBySubject: [
    { subject: 'Science', answers: 15 },
    { subject: 'Math', answers: 10 },
    { subject: 'History', answers: 8 },
    { subject: 'English', answers: 5 },
  ],
};


// --- API Interfaces ---

interface BrainlyQuestion {
  id: number;
  content: string;
  created: string;
  user_id: number;
}

interface BrainlyQuestionResponse {
  data: {
    task: {
      id: number;
      content: string;
      created: string;
      user_id: number;
    };
    responses: BrainlyAnswer[];
  };
  users_data: BrainlyUser[];
}

interface BrainlyAnswer {
  id: number;
  user_id: number;
  content: string;
  best: boolean;
  created: string;
  thanks: number;
  mark: number;
  marks_count: number;
  settings: {
    is_confirmed: boolean;
  };
}

interface BrainlyUser {
  id: number;
  nick: string;
  avatar?: {
    '100': string;
  };
  is_deleted?: boolean;
  ranks?: {
    names: string[];
  };
  stats?: {
    answers?: number;
  };
}

interface BrainlyUserProfileResponse {
    data: {
        id: number;
        nick: string;
        avatars?: {
            '100': string;
        };
        gender: number;
        description: string;
        total_thanks: number;
        total_questions: number;
        answers_by_subject: { subject_id: number; answers_count: number }[];
        best_answers_from_30_days: number;
        points: number;
        ranks_ids: number[];
        follower_count: string;
        followed_count: string;
        is_following: boolean;
        is_followed_by: boolean;
    }
}

// --- Data Transformation ---

function processHtml(html: string): string {
  if (!html) return '';
  // Basic unescaping for now. A more robust solution might be needed for complex HTML.
  return html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function extractTextFromHtml(html: string): string {
  if (!html) return '';
  const unescaped = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  // A simple regex to strip HTML tags.
  return unescaped.replace(/<[^>]*>?/gm, '');
}

function transformUser(brainlyUser?: BrainlyUser): User {
  if (!brainlyUser) {
    return {
      id: '0',
      name: 'Unknown User',
      avatarUrl: 'https://picsum.photos/seed/unknown/100/100',
    };
  }
  return {
    id: brainlyUser.id.toString(),
    name: brainlyUser.is_deleted ? 'Deleted account' : brainlyUser.nick,
    avatarUrl:
      brainlyUser.avatar?.['100'] ||
      `https://picsum.photos/seed/${brainlyUser.id}/100/100`,
    rank: brainlyUser.ranks?.names?.[0],
    answersCount: brainlyUser.stats?.answers,
  };
}

function transformAnswer(
  brainlyAnswer: BrainlyAnswer,
  users: BrainlyUser[]
): Answer {
  const author = users.find(u => u.id === brainlyAnswer.user_id);
  return {
    id: brainlyAnswer.id.toString(),
    content: processHtml(brainlyAnswer.content),
    isBestAnswer: brainlyAnswer.best,
    isVerified: brainlyAnswer.settings.is_confirmed,
    createdAt: brainlyAnswer.created,
    author: transformUser(author),
    thanks: brainlyAnswer.thanks,
    rating: brainlyAnswer.mark,
    ratingCount: brainlyAnswer.marks_count,
  };
}

function transformQuestion(
  brainlyQuestion: BrainlyQuestion,
  users: BrainlyUser[]
): Omit<Question, 'answers'> {
  const author = users.find(u => u.id === brainlyQuestion.user_id);
  const processedContent = processHtml(brainlyQuestion.content);
  const textContent = extractTextFromHtml(processedContent);
  const title = textContent.split('\n')[0] || 'Question';
  
  // Attempt to remove the title from the content to avoid duplication
  const contentWithoutTitle = processedContent.replace(new RegExp(`<h3>${title.replace(/[^a-zA-Z0-9 ]/g, '')}<\/h3>`),'');

  return {
    id: brainlyQuestion.id.toString(),
    title: title,
    content: contentWithoutTitle.trim().startsWith(`<p>${title}</p>`) ? contentWithoutTitle.trim().substring(`<p>${title}</p>`.length) : contentWithoutTitle,
    createdAt: brainlyQuestion.created,
    author: transformUser(author),
    tags: [],
  };
}

// --- API Fetching Functions ---

const BASE_URL = process.env.BRAINLY_API_BASE_URL;

const headers = {
  'User-Agent': 'FirebaseStudio/1.0',
};

interface BrainlyArchiveQuestion {
    id: number;
    content: string;
    created: string;
    user_id: number;
    user?: {
        id: number;
        nick: string;
        is_deleted: boolean;
        avatar?: {
            '100': string;
        }
    }
}

async function fetchFromBrainly(endpoint: string) {
    if (!BASE_URL) {
      throw new Error('BRAINLY_API_BASE_URL is not defined in the environment.');
    }
    const url = `${BASE_URL}${endpoint}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
        console.error(`Brainly API fetch failed for url: ${url}`);
        throw new Error(`Brainly API fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function getQuestions(): Promise<Question[]> {
  try {
    const json = await fetchFromBrainly('/api_archive/questions');
    
    if (!json.data) {
        console.error('Unexpected response structure from getQuestions:', json);
        return dummyQuestions;
    }

    return json.data.map((item: BrainlyArchiveQuestion) => {
        const questionData: BrainlyQuestion = {
            id: item.id,
            content: item.content,
            created: item.created,
            user_id: item.user_id,
        };
        const userData: BrainlyUser | undefined = item.user ? {
            id: item.user.id,
            nick: item.user.nick,
            is_deleted: item.user.is_deleted,
            avatar: item.user.avatar,
        } : undefined;

        const users = userData ? [userData] : [];

        return {
            ...transformQuestion(questionData, users),
            answers: [],
        }
    });
  } catch (error) {
    console.error('Error in getQuestions:', error);
    return dummyQuestions;
  }
}

export async function getQuestionById(id: string): Promise<Question | undefined> {
  try {
    const json: BrainlyQuestionResponse = await fetchFromBrainly(`/api_tasks/main_view/${id}`);
    const { task, responses } = json.data;
    const users = json.users_data;

    if (!task) return dummyQuestions.find(q => q.id === '99991');

    return {
      ...transformQuestion(task, users),
      answers: responses.map(r => transformAnswer(r, users)),
    };
  } catch (error) {
    console.error(`Error in getQuestionById (${id}):`, error);
    return dummyQuestions.find(q => q.id === '99991');
  }
}

export async function searchQuestions(query: string): Promise<Question[]> {
  try {
    if (!query) return [];
  
    const questions = await getQuestions();
    const lowerCaseQuery = query.toLowerCase();
  
    return questions.filter(q =>
      q.title.toLowerCase().includes(lowerCaseQuery)
    );
  } catch (error) {
    console.error('Error in searchQuestions:', error);
    const lowerCaseQuery = query.toLowerCase();
    return dummyQuestions.filter(q => q.title.toLowerCase().includes(lowerCaseQuery));
  }
}

export async function getUserById(id: string): Promise<UserProfile | undefined> {
  try {
    const json: BrainlyUserProfileResponse = await fetchFromBrainly(`/api_user_profiles/get_by_id/${id}`);
    const profile = json.data;

    if (!profile) return dummyUserProfile;

    const subjectMap: { [key: number]: string } = {
        '1': 'Hindi',
        '2': 'Math',
        '3': 'History',
        '4': 'English',
        '5': 'Geography',
        '6': 'Biology',
        '7': 'Physics',
        '8': 'Chemistry',
        '9': 'Social Sciences',
        '10': 'Environmental Sciences',
        '11': 'Computer Science',
        '12': 'India Languages',
        '13': 'Chinese',
        '14': 'French',
        '15': 'World Languages',
        '16': 'Art',
        '17': 'Music',
        '18': 'Science',
        '19': 'Economy',
        '20': 'Political Science',
        '21': 'Sociology',
        '22': 'Business Studies',
        '23': 'Psychology',
        '24': 'Accountancy',
        '25': 'CBSE BOARD X',
        '26': 'CBSE BOARD XII'
      };

    const answersBySubject: SubjectAnswers[] = profile.answers_by_subject
      .map(s => ({
        subject: subjectMap[s.subject_id] || `Subject ${s.subject_id}`,
        answers: s.answers_count
      }))
      .filter(s => s.answers > 0);

    return {
      id: profile.id.toString(),
      name: profile.nick,
      avatarUrl: profile.avatars?.['100'] || `https://picsum.photos/seed/${profile.id}/100/100`,
      description: profile.description,
      stats: {
        totalThanks: profile.total_thanks,
        totalQuestions: profile.total_questions,
        bestAnswers: profile.best_answers_from_30_days,
        points: profile.points,
        followers: parseInt(profile.follower_count, 10),
        following: parseInt(profile.followed_count, 10),
      },
      answersBySubject,
    };
  } catch (error) {
    console.error(`Error in getUserById (${id}):`, error);
    return dummyUserProfile;
  }
}