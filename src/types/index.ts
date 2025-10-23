// UI Display Type - used in ListView/TableView components
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

// JSONPlaceholder API Response Types
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

// Union type for all possible response data
export type APIData = Todo | Todo[] | User | User[] | Album | Album[] | Post | Post[] | null;

// Actual API Response Type - what comes from fetch() calls
export type APIResponse = {
  endpoint: string;
  method: string;
  status: number;
  responseTime: string;
  data: APIData;
  timestamp: string;
  error?: string;
};
