
import React from 'react';
import { TAGLINE } from '../constants';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl space-y-8">
      <header className="text-center border-b-2 border-golden-yellow pb-6 mb-8">
        <h1 className="text-4xl font-bold text-dark-green mb-2">Sobre a Angola Company</h1>
        <p className="text-xl text-golden-yellow">{TAGLINE}</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">O Problema</h2>
        <p className="text-gray-700 leading-relaxed">
          Angola enfrenta a falta de uma plataforma nacional integrada que mapeie, conecte e promova a colaboração entre empresas de diferentes setores e portes. Essa lacuna dificulta o networking, a identificação de oportunidades e o desenvolvimento de um ecossistema empresarial coeso e dinâmico.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">Nossa Solução</h2>
        <p className="text-gray-700 leading-relaxed">
          Criamos a Angola Company, uma rede digital robusta e intuitiva que organiza, classifica e conecta empresas angolanas por setor de atividade e porte. Além de ser um diretório empresarial abrangente, promovemos ativamente fóruns empresariais, divulgamos notícias relevantes e facilitamos oportunidades de networking e parcerias estratégicas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">Nossos Diferenciais</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>
            <span className="font-semibold text-dark-green">Classificação Inteligente:</span> Empresas categorizadas por setor e porte para busca eficiente.
          </li>
          <li>
            <span className="font-semibold text-dark-green">Geração de Oportunidades:</span> Facilitamos a conexão entre empresas, potenciais parceiros e talentos (futura integração para oportunidades de emprego).
          </li>
          <li>
            <span className="font-semibold text-dark-green">Fórum Empresarial Interativo:</span> Um canal dedicado para partilha de conhecimento, debate de ideias e resolução de desafios comuns.
          </li>
          <li>
            <span className="font-semibold text-dark-green">Integração Estratégica:</span> Conexões com LinkedIn, WhatsApp e APIs (futuro) para otimizar a experiência do usuário e o alcance da plataforma.
          </li>
          <li>
            <span className="font-semibold text-dark-green">Dados Empresariais Valiosos:</span> Potencial para gerar insights e dados agregados (anonimizados) para suportar políticas públicas, estudos de mercado e parcerias estratégicas.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">Monetização</h2>
         <p className="text-gray-700 leading-relaxed mb-2">
          Nossa estratégia de monetização é diversificada para garantir a sustentabilidade e o crescimento contínuo da plataforma:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li><span className="font-semibold">Planos de Cadastro:</span> Opções de cadastro gratuito (básico) e premium com funcionalidades avançadas e maior visibilidade.</li>
          <li><span className="font-semibold">Patrocínio de Fóruns:</span> Oportunidades para empresas patrocinarem fóruns temáticos e eventos de networking.</li>
          <li><span className="font-semibold">Publicidade Segmentada:</span> Anúncios direcionados por setor e interesse, oferecendo alto ROI para anunciantes.</li>
          <li><span className="font-semibold">Serviços B2B e Dados Analíticos:</span> Acesso a dados analíticos de mercado (agregados e anonimizados) e serviços de consultoria para empresas.</li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">Mercado-Alvo</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>Empresas de todos os portes: Micro, Pequenas, Médias e Grandes Empresas (PMEs).</li>
          <li>Startups e empreendedores à procura de visibilidade e conexões.</li>
          <li>Multinacionais com operações ou interesse em Angola.</li>
          <li>Instituições governamentais e privadas que buscam parcerias e dados sobre o setor empresarial.</li>
          <li>Investidores nacionais e internacionais.</li>
          <li>Organizações de fomento ao desenvolvimento económico e empresarial.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">Nosso Objetivo</h2>
        <p className="text-gray-700 leading-relaxed">
          Consolidar a Angola Company como a maior e mais influente rede empresarial digital do país até 2027, tornando-se o ponto de referência para negócios, parcerias e informações sobre o mercado angolano. Queremos ser o motor que impulsiona o crescimento e a inovação no tecido empresarial de Angola.
        </p>
      </section>

       <div className="mt-10 pt-6 border-t-2 border-golden-yellow text-center">
            <p className="text-lg text-gray-800">Junte-se a nós nesta jornada para transformar o futuro empresarial de Angola!</p>
        </div>
    </div>
  );
};

export default AboutUsPage;
