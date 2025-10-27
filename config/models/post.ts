export interface Post {
  id: number;
  status: string;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  slug?: string;
  title: string;
  body?: string;
  thumbnail?: string;
  publish_on?: string;
  auto_publish?: boolean;
  lede?: string;
}
