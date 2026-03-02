export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'como-consultar-cpf-online',
    title: 'Como consultar CPF online de forma rápida e segura',
    excerpt: 'Descubra como realizar consultas de CPF com segurança, praticidade e em conformidade com a LGPD.',
    content: `
      <h2>Por que consultar CPF online?</h2>
      <p>A consulta de CPF é essencial para diversas operações comerciais, desde a verificação de crédito até a validação de identidade em processos de cadastro. Com a digitalização dos serviços, realizar essas consultas de forma online se tornou indispensável.</p>
      
      <h2>Vantagens da consulta online</h2>
      <ul>
        <li><strong>Velocidade:</strong> Resultados em segundos, sem burocracia</li>
        <li><strong>Segurança:</strong> Dados criptografados e em conformidade com a LGPD</li>
        <li><strong>Praticidade:</strong> Acesse de qualquer lugar, a qualquer momento</li>
        <li><strong>Economia:</strong> Custos reduzidos comparado a métodos tradicionais</li>
      </ul>

      <h2>Como funciona na API Painel?</h2>
      <p>Nossa plataforma oferece diversos tipos de consulta CPF, desde a mais simples até a consulta completa com foto, endereço, telefone e muito mais. Basta acessar o dashboard, escolher o tipo de consulta e inserir o CPF desejado.</p>
      
      <h2>Tipos de consulta disponíveis</h2>
      <p>Oferecemos consultas que vão desde dados básicos como nome e data de nascimento até informações avançadas como score de crédito, histórico de endereços e dados empresariais vinculados ao CPF.</p>
    `,
    date: '2026-03-01',
    tags: ['CPF', 'Consulta', 'Segurança'],
  },
  {
    id: 2,
    slug: 'lgpd-e-consultas-de-dados',
    title: 'LGPD e consultas de dados: o que sua empresa precisa saber',
    excerpt: 'Entenda como a Lei Geral de Proteção de Dados impacta as consultas de CPF e CNPJ e como se manter em conformidade.',
    content: `
      <h2>O que é a LGPD?</h2>
      <p>A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) estabelece regras para coleta, armazenamento, tratamento e compartilhamento de dados pessoais. Empresas que realizam consultas de dados precisam estar atentas às suas obrigações.</p>
      
      <h2>Impacto nas consultas de dados</h2>
      <p>A LGPD exige que toda consulta de dados pessoais tenha uma base legal. Na API Painel, garantimos que todas as consultas são realizadas dentro dos parâmetros legais, com registro de finalidade e consentimento quando necessário.</p>

      <h2>Como nos mantemos em conformidade</h2>
      <ul>
        <li>Criptografia de ponta a ponta em todas as transmissões</li>
        <li>Logs de auditoria para todas as consultas realizadas</li>
        <li>Política de retenção de dados clara e transparente</li>
        <li>Suporte ao exercício dos direitos dos titulares</li>
      </ul>
    `,
    date: '2026-02-25',
    tags: ['LGPD', 'Segurança', 'Compliance'],
  },
  {
    id: 3,
    slug: 'novidades-plataforma-marco-2026',
    title: 'Novidades da plataforma — Março 2026',
    excerpt: 'Confira as últimas atualizações: novos módulos, melhorias de performance e muito mais.',
    content: `
      <h2>O que há de novo?</h2>
      <p>Estamos sempre trabalhando para melhorar a experiência na API Painel. Confira as principais novidades deste mês:</p>
      
      <h2>Novos módulos</h2>
      <p>Lançamos novos módulos de consulta que incluem verificação de veículos por placa e RENAVAM, além de melhorias no módulo de consulta CNPJ com dados mais detalhados da Receita Federal.</p>

      <h2>Melhorias de performance</h2>
      <p>Otimizamos nossos servidores para reduzir o tempo de resposta em até 40%. Agora, as consultas mais complexas retornam em menos de 2 segundos.</p>

      <h2>Interface renovada</h2>
      <p>O dashboard recebeu uma atualização visual completa, com novo design, melhor organização dos módulos e suporte a tema escuro.</p>
    `,
    date: '2026-02-20',
    tags: ['Novidades', 'Plataforma', 'Atualização'],
  },
];
