/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CONTEÚDO DO PORTFÓLIO  —  edite SOMENTE este arquivo para atualizar o site.
 *  Nada aqui contém dados confidenciais: todos os cases foram sanitizados
 *  (sem credenciais, IDs reais, nomes de clientes ou valores reais).
 * ──────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Gabriel Vianna",
  role: "Analista de Dados & Automação",
  // Frases que alternam no efeito de digitação do hero. Edite à vontade.
  roles: [
    "Analista de Dados",
    "Especialista em n8n",
    "Automação com Python",
    "Power BI & SQL",
    "RPA & Integração de APIs",
  ],
  // Frase de impacto do topo. Mude à vontade.
  headline: "Transformo processos manuais em pipelines que rodam sozinhos.",
  subheadline:
    "Especialista em Business Intelligence e automação. Construo fluxos com n8n, Python e RPA que eliminam trabalho repetitivo e dashboards que viram decisão.",
  location: "Rio de Janeiro, Brasil",
  // Salve sua foto em /public com este nome. Deixe "" para esconder.
  photo: "/perfil.jpg",
  email: "gabrielmlvianna@gmail.com",
  phone: "+55 22 99932-4704",
  linkedin: "https://www.linkedin.com/in/viannadev/",
  // Deixe "" para esconder. Quando criar repos públicos sanitizados, cole aqui.
  github: "",
  // Áreas de atuação exibidas no topo (sem expor números).
  focus: [
    {
      key: "automation",
      title: "Automação & RPA",
      desc: "Fluxos em n8n, Python e RPA que eliminam o trabalho repetitivo.",
    },
    {
      key: "bi",
      title: "Business Intelligence",
      desc: "Dashboards e modelagem em Power BI, DAX e SQL para a decisão.",
    },
    {
      key: "ai",
      title: "Integração & IA",
      desc: "APIs, webhooks e IA conectando sistemas e documentos.",
    },
  ],
} as const;

export const about = {
  paragraphs: [
    "Trabalho na fronteira entre dados e automação: identifico o processo manual que consome horas do time e o transformo em um fluxo que roda sozinho, com validação, log e zero retrabalho.",
    "Minha base é Business Intelligence, com domínio de Power BI, DAX, ETL e SQL (SQL Server, PostgreSQL, BigQuery). Mas o que mais gosto é orquestrar: n8n integrando APIs, Python automatizando o que ninguém quer fazer na mão, e RPA resolvendo o que não tem API.",
    "Já entreguei desde dashboards analíticos em órgãos públicos até microsserviços de automação com IA e RPA em sistemas jurídicos. O fio condutor é sempre o mesmo: dado confiável, processo enxuto, decisão mais rápida.",
  ],
} as const;

export type SkillGroup = {
  label: string;
  tag: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "BI & Visualização",
    tag: "viz",
    items: ["Power BI", "DAX", "Power Query", "Qlik Sense", "Streamlit", "Excel Avançado"],
  },
  {
    label: "Dados & Bancos",
    tag: "data",
    items: ["SQL", "SQL Server", "PostgreSQL", "MySQL", "BigQuery", "ETL", "Databricks"],
  },
  {
    label: "Automação & Integração",
    tag: "automation",
    items: ["n8n", "Python", "RPA (Playwright/Selenium)", "APIs REST", "Webhooks", "FastAPI", "Google Workspace APIs"],
  },
  {
    label: "IA & Processamento de Documentos",
    tag: "ai",
    items: ["LLMs (OpenAI, Gemini, Claude)", "OCR", "Parsing de PDF", "Assinatura ICP-Brasil"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: "RPA + IA" | "RPA" | "ETL" | "Automação" | "BI" | "Data App";
  year: string;
  summary: string;
  problem: string;
  solution: string;
  // Os 3 nós do fluxo: entrada → processo → saída
  flow: { in: string; process: string; out: string };
  // Métrica de impacto em destaque (curta). Deixe "" para esconder.
  metric: string;
  metricLabel: string;
  stack: string[];
  // APIs e serviços integrados (destaque). Deixe [] para esconder a seção.
  apis: string[];
  // Mídia opcional (print/vídeo do fluxo). Salve o arquivo em /public.
  // Ex.: { type: "image", src: "/fluxos/nf-pj.png", caption: "Fluxo no n8n" }
  // Ex.: { type: "video", src: "/fluxos/cartao.mp4" }
  media?: { type: "image" | "video"; src: string; caption?: string };
  // Diagrama de fluxo (destilado do workflow real no n8n). Opcional.
  diagram?: FlowDiagram;
  featured: boolean;
};

export type FlowStageKind = "trigger" | "process" | "ai" | "decision" | "output" | "notify";

export type FlowStage = {
  label: string;
  detail?: string;
  kind: FlowStageKind;
  // anotações de ramificação (ex.: "Notifica se inválido")
  branch?: string;
};

export type FlowDiagram = {
  // fontes paralelas de entrada que convergem para o início (opcional)
  sources?: string[];
  stages: FlowStage[];
  // escala real do workflow no n8n (dá credibilidade)
  nodeCount?: number;
  connectionCount?: number;
  // texto do botão de simulação (default: "Executar workflow")
  runLabel?: string;
  // rótulo do rodapé; quando definido, substitui o "X nós no n8n"
  scaleLabel?: string;
};

export const projects: Project[] = [
  {
    id: "nf-pj",
    title: "Emissão de Notas Fiscais de PJ",
    category: "RPA + IA",
    year: "2026",
    summary:
      "Pipeline que recebe, valida e arquiva ~80 notas fiscais por mês de forma totalmente automática, com extração de dados por IA.",
    problem:
      "A recepção, validação e arquivamento de notas fiscais de prestadores PJ era 100% manual: conferir e-mails, baixar PDFs de origens diferentes, validar CNPJ e renomear arquivo por arquivo seguindo um padrão de compliance.",
    solution:
      "Construí um fluxo no n8n que monitora a caixa de entrada, extrai o PDF por 4 caminhos diferentes (anexo, link, plataformas de contabilidade), usa IA (Gemini) para ler a competência da nota, valida o CNPJ contra a base de contratos e arquiva tudo renomeado no padrão correto no Google Drive.",
    flow: {
      in: "E-mail com NF",
      process: "Extração + validação por IA",
      out: "Arquivo padronizado no Drive",
    },
    metric: "~80/mês",
    metricLabel: "notas processadas sem toque humano",
    stack: ["n8n", "Gemini (IA)", "Google APIs", "OCR", "Headless Browser"],
    apis: ["Gmail API", "Google Drive API", "Google Sheets API", "Google Gemini", "OCR.space"],
    diagram: {
      sources: ["Anexo direto", "E-mail encaminhado", "Link Contabilizei", "Link Confi", "Link genérico"],
      stages: [
        { kind: "trigger", label: "Gmail Trigger", detail: "Monitora a caixa de entrada em tempo real" },
        { kind: "process", label: "Extração do PDF", detail: "Texto direto ou OCR como fallback para PDF imagem" },
        { kind: "ai", label: "Gemini lê a competência", detail: "IA extrai o mês/ano de referência da nota" },
        { kind: "decision", label: "Valida CNPJ + competência", detail: "Confere contra a base de contratos", branch: "Notifica responsável se inválido" },
        { kind: "output", label: "Arquiva no Google Drive", detail: "Na pasta do mês correspondente" },
        { kind: "ai", label: "Gemini renomeia no padrão", detail: "Gera o nome no formato de compliance" },
      ],
      nodeCount: 92,
      connectionCount: 68,
    },
    featured: true,
  },
  {
    id: "newlex",
    title: "NewLex: Worker & RPA Jurídico",
    category: "RPA",
    year: "2026",
    summary:
      "Microsserviço de processamento de documentos + RPA que faz peticionamento eletrônico em tribunal, com certificado digital e 2FA.",
    problem:
      "Escritórios jurídicos perdem horas convertendo, assinando e protocolando documentos manualmente em sistemas de tribunais que não possuem API e exigem certificado digital e autenticação em duas etapas.",
    solution:
      "Desenvolvi um worker em FastAPI que converte documentos (PDF↔Word/Excel), aplica OCR, assina com certificado ICP-Brasil e anonimiza dados sensíveis. Em paralelo, um RPA em Playwright autentica no tribunal com certificado + 2FA e protocola as petições automaticamente.",
    flow: {
      in: "Documento + petição",
      process: "Conversão, OCR, assinatura, RPA",
      out: "Protocolo no tribunal",
    },
    metric: "9 tipos",
    metricLabel: "de processamento de documento",
    stack: ["Python", "FastAPI", "Playwright", "Supabase", "Tesseract OCR", "pyHanko"],
    apis: ["Supabase (DB + Storage)", "PJe / Tribunal (peticionamento)", "Certificado ICP-Brasil"],
    diagram: {
      sources: ["PDF", "Word / Excel", "Documento escaneado"],
      stages: [
        { kind: "trigger", label: "Job na fila", detail: "Recebido via Supabase (webhook + polling)" },
        { kind: "process", label: "Converte o documento", detail: "PDF ↔ Word/Excel, com OCR quando necessário" },
        { kind: "process", label: "Anonimiza dados sensíveis", detail: "Tarja CPF, CNPJ, e-mail e telefone no PDF" },
        { kind: "process", label: "Assina (ICP-Brasil)", detail: "Assinatura digital com certificado (pyHanko)" },
        { kind: "decision", label: "RPA autentica no PJe", detail: "Playwright + certificado + 2FA (TOTP)", branch: "Resolve captcha e re-tenta" },
        { kind: "output", label: "Protocola a petição", detail: "Retorna o número do protocolo" },
      ],
      runLabel: "Executar pipeline",
      scaleLabel: "Python · FastAPI · Playwright",
    },
    featured: true,
  },
  {
    id: "cartao",
    title: "Conciliação de Cartão Corporativo",
    category: "ETL",
    year: "2025",
    summary:
      "ETL que lê faturas de cartão em PDF, extrai e categoriza transações e calcula o rateio entre empresas. Reduzi de 3 horas para 1 minuto por fatura.",
    problem:
      "A conciliação das faturas de cartão corporativo (de bancos diferentes, cada um com um layout) era feita 100% à mão: a equipe lançava transação por transação numa planilha Excel e só depois calculava o rateio entre as empresas. Levava no mínimo 3 horas por fatura.",
    solution:
      "Montei um fluxo no n8n que detecta o upload do PDF, faz o parsing das transações lidando com os layouts de cada banco (datas, transações quebradas, IOF, compras internacionais), deduplica e gera automaticamente uma planilha Excel já com o rateio calculado.",
    flow: {
      in: "Fatura em PDF",
      process: "Parsing + rateio automático",
      out: "Excel conciliado",
    },
    metric: "3h → 1min",
    metricLabel: "tempo por fatura",
    stack: ["n8n", "Parsing de PDF", "JavaScript", "Google APIs"],
    apis: ["Google Drive API", "Google Sheets API"],
    diagram: {
      sources: ["Fatura Santander (PDF)", "Fatura Itaú (PDF)"],
      stages: [
        { kind: "trigger", label: "Upload no Drive", detail: "Monitora a pasta de faturas" },
        { kind: "process", label: "Extrai texto do PDF", detail: "Lê o conteúdo da fatura" },
        { kind: "process", label: "Parsing das transações", detail: "Trata o layout de cada banco, IOF e compras internacionais" },
        { kind: "process", label: "Calcula o rateio", detail: "Distribui os valores entre as empresas" },
        { kind: "output", label: "Gera o Excel conciliado", detail: "A partir de um template e salva no Drive" },
      ],
      nodeCount: 14,
      connectionCount: 13,
    },
    featured: true,
  },
  {
    id: "ferias",
    title: "Alertas de Férias (Compliance CLT)",
    category: "Automação",
    year: "2025",
    summary:
      "Automação agendada que previne multas trabalhistas alertando gestores sobre férias a vencer, classificadas por urgência.",
    problem:
      "Férias não concedidas no prazo geram multa (art. 137 da CLT, com pagamento em dobro). Acompanhar dezenas de colaboradores numa planilha, manualmente, é arriscado e fácil de esquecer.",
    solution:
      "Criei uma automação no n8n que roda todo mês via agendamento, lê a base de colaboradores, classifica cada caso em 4 níveis de urgência, agrupa por gestor e dispara alertas por e-mail e chat, com log auditável de cada disparo.",
    flow: {
      in: "Base de colaboradores",
      process: "Classificação por urgência",
      out: "Alertas a gestores + log",
    },
    metric: "4 níveis",
    metricLabel: "de urgência, agrupados por gestor",
    stack: ["n8n", "Google Sheets", "Gmail API", "Google Chat", "Agendamento (CRON)"],
    apis: ["Google Sheets API", "Gmail API", "Google Chat API"],
    diagram: {
      stages: [
        { kind: "trigger", label: "Agendamento (dia 10, 08h)", detail: "Roda todo mês automaticamente" },
        { kind: "process", label: "Lê o controle de férias", detail: "Planilha com todos os colaboradores" },
        { kind: "decision", label: "Classifica por urgência", detail: "4 níveis: vencido, crítico, urgente, atenção", branch: "Sem alertas no mês: encerra" },
        { kind: "process", label: "Agrupa por gestor", detail: "Monta a mensagem de cada gestor" },
        { kind: "output", label: "Dispara alertas", detail: "E-mail (Gmail) + Google Chat" },
        { kind: "process", label: "Registra log auditável", detail: "Histórico de cada disparo" },
      ],
      nodeCount: 13,
      connectionCount: 10,
    },
    featured: false,
  },
  {
    id: "comissionamento",
    title: "Comissionamento de Vendas PJ",
    category: "ETL",
    year: "2025",
    summary:
      "Pipeline que consulta o data warehouse, aplica metas escalonadas e gera o relatório mensal de comissões, padronizado e auditável.",
    problem:
      "O cálculo de comissões variáveis dependia de cruzar dados de fechamento de vendas com metas escalonadas manualmente, o que era lento e suscetível a erro.",
    solution:
      "Construí um pipeline que consulta os dados de fechamento no BigQuery, aplica as faixas de meta e os percentuais de comissão por faixa, e gera automaticamente a planilha mensal de pagamento.",
    flow: {
      in: "Dados no BigQuery",
      process: "Faixas de meta + % por faixa",
      out: "Relatório de pagamento",
    },
    metric: "",
    metricLabel: "",
    stack: ["BigQuery", "SQL", "JavaScript", "Excel"],
    apis: ["Google BigQuery API", "Google Sheets API"],
    diagram: {
      sources: ["BigQuery: Fechamentos", "BigQuery: Setup liquidado", "BigQuery: Histórico de deals", "Sheets: Metas"],
      stages: [
        { kind: "trigger", label: "Webhook / manual", detail: "Dispara o cálculo do mês" },
        { kind: "process", label: "Define o período", detail: "Mês/ano de referência" },
        { kind: "process", label: "Consulta o BigQuery", detail: "Fechamentos, setup liquidado e histórico" },
        { kind: "process", label: "Agrega o FYV por vendedor", detail: "First Year Value consolidado" },
        { kind: "decision", label: "Cruza FYV com as metas", detail: "Aplica faixas de meta e % por faixa" },
        { kind: "process", label: "Gera a planilha consolidada", detail: "Copia o template e preenche no Sheets" },
        { kind: "output", label: "Planilha por vendedor", detail: "Uma aba por vendedor + resposta ao webhook" },
      ],
      nodeCount: 58,
      connectionCount: 44,
    },
    featured: false,
  },
  {
    id: "fechamentos-upsell",
    title: "Fechamentos & Upsell de Vendas",
    category: "ETL",
    year: "2026",
    summary:
      "Plataforma que consolida, valida e visualiza os fechamentos de vendas e upsells, de fontes dispersas até um dashboard confiável, com um pipeline orquestrado que roda de hora em hora.",
    problem:
      "Os dados de vendas (novos fechamentos e upsells) ficavam espalhados entre o CRM, o ERP financeiro e planilhas de ajuste, sem uma fonte única confiável. Isso gerava divergências, retrabalho e falta de visibilidade para a liderança.",
    solution:
      "Construí um sistema orquestrado no n8n que roda de hora em hora em horário comercial: captura os deals do CRM e do ERP, consolida no BigQuery, aplica ajustes manuais auditáveis e valida cruzando as fontes (sinalizando divergências no Google Chat), além de calcular MRR e FYV. Um dashboard em Streamlit lê a tabela final e entrega KPIs e gráficos confiáveis.",
    flow: {
      in: "Deals (CRM + ERP)",
      process: "Orquestração + validação (n8n)",
      out: "Dashboard confiável (Streamlit)",
    },
    metric: "14",
    metricLabel: "pipelines orquestrados de hora em hora",
    stack: ["n8n", "Python", "Streamlit", "BigQuery", "Plotly", "Google OAuth"],
    apis: ["Google BigQuery API", "HubSpot (CRM)", "ERP financeiro", "Google Sheets API", "Google Chat API"],
    diagram: {
      sources: ["HubSpot (CRM)", "ERP financeiro", "Ajustes manuais (Sheets)"],
      stages: [
        { kind: "trigger", label: "Agendamento (de hora em hora)", detail: "Roda em horário comercial, seg a sex" },
        { kind: "process", label: "Captura deals e upsells", detail: "Do CRM e do ERP para o BigQuery" },
        { kind: "process", label: "Consolida e mescla ajustes", detail: "Agrega e aplica ajustes manuais auditáveis" },
        { kind: "decision", label: "Valida e concilia", detail: "Cruza as fontes e detecta divergências", branch: "Notifica no Google Chat" },
        { kind: "process", label: "Calcula MRR e FYV", detail: "Métricas de receita por período" },
        { kind: "output", label: "Atualiza o dashboard", detail: "Streamlit + BigQuery para a liderança" },
      ],
      runLabel: "Executar orquestrador",
      scaleLabel: "n8n + Streamlit · 14 pipelines orquestrados",
    },
    featured: true,
  },
  {
    id: "folha-pagamento",
    title: "Folha de Pagamento",
    category: "Data App",
    year: "2026",
    summary:
      "Portal web interno para o RH consultar custo por colaborador, simular salários e gerenciar contratos PJ, lendo e escrevendo direto no BigQuery, com controle de acesso por página e auditoria completa.",
    problem:
      "O RH precisava de uma interface própria e segura para dados sensíveis de folha (remuneração, dados bancários), com controle de acesso por página e domínio próprio. A solução anterior, em Streamlit, não permitia login próprio nem esse nível de controle.",
    solution:
      "Reescrevi o dashboard em Next.js (App Router, com server components e server actions), com login Google restrito ao domínio da empresa e controle de acesso por página em três camadas. Inclui um motor de cálculo de impostos (INSS, IRRF, FGTS) validado, auditoria append-only de cada alteração e uma esteira de contratos PJ que move o Kanban sozinho via webhooks e arquiva o PDF assinado.",
    flow: {
      in: "Dados de folha (BigQuery)",
      process: "App Next.js (acesso + auditoria)",
      out: "Portal seguro do RH",
    },
    metric: "3 camadas",
    metricLabel: "de segurança no acesso a dados sensíveis",
    stack: ["Next.js", "React", "TypeScript", "BigQuery", "Auth.js", "Tailwind", "shadcn/ui"],
    apis: ["Google BigQuery API", "Google OAuth", "Google Cloud Storage", "Contraktor (assinatura)", "Webhook (n8n)"],
    diagram: {
      stages: [
        { kind: "trigger", label: "Login (Google OAuth)", detail: "Restrito ao domínio da empresa" },
        { kind: "decision", label: "Controle de acesso por página", detail: "3 camadas: sidebar, página e server action" },
        { kind: "process", label: "Lê os dados no BigQuery", detail: "Via server components" },
        { kind: "process", label: "Simula custos e impostos", detail: "Motor INSS / IRRF / FGTS validado" },
        { kind: "process", label: "Grava com auditoria", detail: "Server actions + log append-only" },
        { kind: "output", label: "Esteira de contratos PJ", detail: "Webhooks movem o Kanban e arquivam o PDF assinado" },
      ],
      runLabel: "Executar fluxo",
      scaleLabel: "Next.js + BigQuery · server actions & auditoria",
    },
    featured: false,
  },
  {
    id: "bi-dashboard",
    title: "Dashboards Analíticos de Vendas",
    category: "BI",
    year: "2024",
    summary:
      "Dashboards de KPIs de varejo (faturamento, lucro, ranking de vendedores e produtos) para apoiar a decisão da gestão.",
    problem:
      "A gestão não tinha visão consolidada de desempenho: faturamento, lucro bruto, volume de vendas e rankings ficavam espalhados em planilhas.",
    solution:
      "Modelei os dados e desenvolvi dashboards interativos com os principais indicadores de desempenho, com storytelling claro para a tomada de decisão: faturamento, lucro, quantidade de vendas e rankings de vendedores e produtos.",
    flow: {
      in: "Dados de vendas",
      process: "Modelagem + DAX",
      out: "Dashboard interativo",
    },
    metric: "",
    metricLabel: "",
    stack: ["Power BI", "DAX", "Power Query", "Modelagem de Dados"],
    apis: [],
    featured: false,
  },
];

export type Experience = {
  org: string;
  role: string;
  period: string; // ex.: "2023 a 2024". Deixe "" para esconder.
  description: string;
  stack: string[];
};

export const experience: Experience[] = [
  {
    org: "inChurch",
    role: "Analista de Dados & Automação",
    period: "", // <- adicione o período (ex.: "2025 a Atual")
    description:
      "Responsável por automações de processos de negócio e análise de dados. Construí pipelines em n8n e Python que eliminam trabalho manual (emissão de NF, conciliação de cartão, alertas de compliance) e relatórios financeiros sobre data warehouse (BigQuery), reduzindo horas de trabalho repetitivo e erro humano.",
    stack: ["n8n", "Python", "BigQuery", "RPA", "Power BI", "APIs"],
  },
  {
    org: "Finep",
    role: "Analista de Dados",
    period: "", // <- adicione o período (ex.: "2024 a Atual")
    description:
      "Apoio à análise e tratamento de dados com foco em extração, limpeza e organização para geração de insights. Desenvolvimento de dashboards interativos em Power BI e automação de tarefas com Python para manipulação de grandes volumes de dados.",
    stack: ["Power BI", "Python", "ETL", "Excel"],
  },
  {
    org: "Controladoria Geral do Estado (CGE)",
    role: "Analista de BI / Dados",
    period: "", // <- adicione o período
    description:
      "Extração e transformação de dados em PostgreSQL para alimentar relatórios analíticos no Qlik Sense, garantindo integridade e precisão. Suporte aos usuários e administração do fórum de discussões da CGE (plataforma Discourse).",
    stack: ["PostgreSQL", "Qlik Sense", "SQL", "Discourse"],
  },
];

export const education = [
  { title: "Bacharel em Análise de Dados de Alta Performance", org: "Graduação" },
  { title: "Bacharel em Gestão da Tecnologia da Informação", org: "Graduação" },
];

export const certifications = [
  "Formação completa Power BI + SQL Server",
  "Xperiun: SQL Server, Modelagem de Dados e DAX Avançado",
  "Fundamentos do Databricks",
];
