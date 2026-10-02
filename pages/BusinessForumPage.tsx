
import React, { useState, useEffect } from 'react';
import { ForumPost } from '../types';
import { getForumPosts, createForumPost } from '../services/forumService';
import ForumPostCard from '../components/ForumPostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { useAuth } from '../contexts/AuthContext';

const BusinessForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getForumPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch forum posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSelectPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post); // This will open the detail modal
    }
  };

  const handleCloseDetailModal = () => {
    setSelectedPost(null);
  };

  const handleCreateNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim() || !user) return;
    setIsLoading(true); // Can use a specific loading state for form submission
    try {
      const createdPost = await createForumPost({ title: newPostTitle, content: newPostContent, author: user.name || "Usuário Anônimo" });
      setPosts(prevPosts => [createdPost, ...prevPosts]);
      setIsCreateModalOpen(false);
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error("Failed to create post:", error);
      // Show error to user
    } finally {
      setIsLoading(false); // Reset general loading or specific form loading state
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-dark-green">Fórum Empresarial</h1>
        <p className="text-lg text-gray-600 mt-2">Partilhe ideias, tire dúvidas e conecte-se com outros empresários.</p>
      </header>

      <div className="mb-6 text-right">
        {isAuthenticated ? (
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>Criar Novo Tópico</Button>
        ) : (
            <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-md inline-block">
                Faça <a href="#/login" className="text-dark-green font-semibold hover:underline">login</a> para criar um novo tópico.
            </p>
        )}
      </div>

      {isLoading && posts.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <ForumPostCard key={post.id} post={post} onSelectPost={handleSelectPost}/>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
           <img src="https://picsum.photos/seed/noforum/150/150" alt="No forum posts" className="mx-auto mb-4 rounded-full" />
           <h3 className="text-xl font-semibold text-dark-green mb-2">Nenhum tópico no fórum ainda.</h3>
           <p className="text-gray-600">Seja o primeiro a iniciar uma discussão!</p>
        </div>
      )}

      {/* Modal for Creating New Post */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Criar Novo Tópico">
        <form onSubmit={handleCreateNewPost} className="space-y-4">
          <Input 
            label="Título do Tópico" 
            name="newPostTitle" 
            value={newPostTitle} 
            onChange={(e) => setNewPostTitle(e.target.value)} 
            required 
          />
          <Textarea 
            label="Conteúdo da Mensagem" 
            name="newPostContent" 
            value={newPostContent} 
            onChange={(e) => setNewPostContent(e.target.value)} 
            rows={6}
            required 
          />
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Publicando..." : "Publicar Tópico"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal for Viewing Post Details */}
      {selectedPost && (
        <Modal isOpen={!!selectedPost} onClose={handleCloseDetailModal} title={selectedPost.title} size="lg">
            <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b">
                    <img 
                        src={selectedPost.authorAvatar || `https://picsum.photos/seed/${selectedPost.author}/50/50`} 
                        alt={selectedPost.author} 
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold text-dark-green">{selectedPost.author}</p>
                        <p className="text-xs text-gray-500">Publicado em {new Date(selectedPost.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {selectedPost.fullContent || selectedPost.contentSnippet}
                </p>
                {/* Placeholder for replies */}
                <div className="mt-6 pt-4 border-t">
                    <h4 className="text-lg font-semibold text-dark-green mb-2">Respostas ({selectedPost.repliesCount})</h4>
                    <p className="text-sm text-gray-500 italic">A secção de comentários e respostas será implementada futuramente.</p>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default BusinessForumPage;
