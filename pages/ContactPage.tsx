
import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      // Simulate success/error
      const success = Math.random() > 0.2; // 80% chance of success
      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-dark-green">Entre em Contato</h1>
        <p className="text-lg text-gray-600 mt-2">Adoraríamos ouvir de você! Envie-nos uma mensagem.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 md:p-12 rounded-lg shadow-xl">
        {/* Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-dark-green mb-4">Envie sua Mensagem</h2>
          {submitStatus === 'success' && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
              <p className="font-bold">Mensagem Enviada!</p>
              <p>Obrigado pelo seu contato. Responderemos em breve.</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p className="font-bold">Erro ao Enviar</p>
              <p>Houve um problema ao enviar sua mensagem. Tente novamente.</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Seu Nome" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Seu Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Assunto" name="subject" value={formData.subject} onChange={handleChange} required />
            <Textarea label="Sua Mensagem" name="message" value={formData.message} onChange={handleChange} rows={5} required />
            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-dark-green mb-4">Nossas Informações</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Endereço:</strong> Rua Exemplo, 123, Bairro Tal, Luanda, Angola (Placeholder)
            </p>
            <p>
              <strong>Telefone:</strong> +244 9XX XXX XXX (Placeholder)
            </p>
            <p>
              <strong>Email:</strong> contato@angolacompany.ao (Placeholder)
            </p>
            <p>
              <strong>Horário de Atendimento:</strong> Segunda a Sexta, 09:00 - 17:00
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-dark-green mb-2">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-green hover:text-golden-yellow transition-colors">LinkedIn</a>
              <a href="#" className="text-dark-green hover:text-golden-yellow transition-colors">WhatsApp (Link)</a>
              <a href="#" className="text-dark-green hover:text-golden-yellow transition-colors">Facebook</a>
            </div>
          </div>

          {/* Placeholder for Map */}
          <div className="mt-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Integração de Mapa (Google Maps) aqui.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
