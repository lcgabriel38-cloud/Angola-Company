
import React from 'react';
import { ForumPost } from '../types';
import Card from './Card'; // Assuming a generic Card component exists

interface ForumPostCardProps {
  post: ForumPost;
  onSelectPost: (postId: string) => void;
}

const ForumPostCard: React.FC<ForumPostCardProps> = ({ post, onSelectPost }) => {
  return (
    <Card className="mb-4 hover:shadow-2xl transition-shadow" onClick={() => onSelectPost(post.id)}>
      <div className="p-5">
        <div className="flex items-start space-x-3">
          <img 
            src={post.authorAvatar || `https://picsum.photos/seed/${post.author}/40/40`} 
            alt={post.author} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark-green mb-1">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Por <span className="font-medium text-gray-700">{post.author}</span> em {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mt-2 text-sm leading-relaxed line-clamp-3">{post.contentSnippet}</p>
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <div>
            {post.tags && post.tags.map(tag => (
              <span key={tag} className="mr-1.5 py-0.5 px-1.5 bg-gray-200 text-gray-700 rounded text-xs">#{tag}</span>
            ))}
          </div>
          <span>{post.repliesCount} respostas</span>
        </div>
      </div>
    </Card>
  );
};

export default ForumPostCard;
