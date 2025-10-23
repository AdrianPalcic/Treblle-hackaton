export type APICall = {
  id: number;
  method: string;
  status: number;
  endpoint: string;
  responseTime: string;
  location: string;
  timestamp: string;
  hoursAgo: number;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Album = {
  userId: number;
  id: number;
  title: string;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type APIData =
  | Todo
  | Todo[]
  | User
  | User[]
  | Album
  | Album[]
  | Post
  | Post[]
  | null;

export type APIResponse = {
  id: number;
  endpoint: string;
  method: string;
  status: number;
  responseTime: string;
  location: string;
  data: APIData;
  timestamp: string;
  hoursAgo: number;
  error?: string;
  responseHeaders?: Record<string, string>;
};

export type ChartData = {
  responseTime: number;
  avgTime: number;
  id: number;
};
