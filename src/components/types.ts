export interface PostProps {
  type: string;
  icon: string;
  image: string;
  title: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
  };
  views: number;
  location?: string;
  date?: string;
  actionButton?: {
    text: string;
    variant: "primary" | "secondary" | "danger";
  };
}

export interface UserProps {
  name: string;
  avatar: string;
}

export interface ViewsProps {
  count: number;
  shareIcon: string;
}
