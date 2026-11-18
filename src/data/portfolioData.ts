export type RoutePath = '/home' | '/portfolio' | '/resume' | '/contact';

export type ProjectCategory =
  | 'All (7)'
  | 'Production ML & Evaluation'
  | 'Fraud & Forecasting'
  | 'BI & Tableau Dashboards';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All (7)'>;
  domain: string;
  featured?: boolean;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  imageUrl: string;
  imageAlt: string;
  links: {
    liveDemo?: string;
    github?: string;
    tableau?: string;
  };
  interactiveType?: 'insurance-simulator' | 'fraud-chart' | 'logistics-modal' | 'realestate-modal';
}

export const CANONICAL_URLS = {
  root: 'https://sites.google.com/view/efagodspower',
  home: 'https://sites.google.com/view/efagodspower/home',
  portfolio: 'https://sites.google.com/view/efagodspower/portfolio',
  resume: 'https://sites.google.com/view/efagodspower/resume',
  contact: 'https://sites.google.com/view/efagodspower/contact',
  githubProfile: 'https://github.com/efapowertech042-ai',
  tableauSalary:
    'https://public.tableau.com/views/AI__Data_Jobs_Salary_Insights/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  tableauExecutiveSales:
    'https://public.tableau.com/views/ExecutiveSalesProject_17690269317490/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
};

export const CONTACT_INFO = {
  phone: '+2348923253332',
  email: 'efapowertech042@gmail.com',
};

export const EFA_PORTRAIT_IMAGE = '/src/assets/images/efa_portrait_refined_1795036159207.jpg';

export const HOME_HERO_IMAGE =
  'https://sites.google.com/sitesv-images-rt/APXyLQcvws1ywfDKal2B2ZJjHz-YzsrbFHO2z4k6fL9YaFCNZHSjLO1VS6OtDt3GLNi2WqfI1AYOcNyNMz-b6iUic1TFbPCjdpVa7G0UeONxdFZSOFr7SKOOTqU7E6YG4ZGYwp8ewYM-DOCO1-xhNw0bS5zsMLcfSbJugGCs40T8jnJrWZFKQq0fR0oHsMS7UHbI3s8cX1Za-3cMs2hnYpfW326JEnE-P354VbcvDehhq3M=w1280';

export const PIPELINE_STAGES = [
  {
    step: '01',
    name: 'Data Integrity',
    detail: 'Schema validation, missingness checks, and distribution profiling across age, BMI, smoker, children, sex, and region.',
  },
  {
    step: '02',
    name: 'Cleaning',
    detail: 'Duplicate removal, outlier boundary inspection, and feature encoding standardization prior to split.',
  },
  {
    step: '03',
    name: 'Modeling',
    detail: 'Cross-validated regression benchmarking across linear, regularized, and ensemble architectures with interaction terms.',
  },
  {
    step: '04',
    name: 'Evaluation',
    detail: 'Holdout validation achieving R² 0.8816, RMSE $4,665, and MAE $2,402 with stratified subgroup residual audits.',
  },
  {
    step: '05',
    name: 'Uncertainty',
    detail: 'Conformal / quantile 90% prediction interval calibration plus automated flagging of lower-confidence edge regimes.',
  },
  {
    step: '06',
    name: 'Deployment',
    detail: 'Production Django web application deployed on Render with live inference inputs and transparent interval reporting.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'health-insurance-predictor',
    number: '01',
    title: 'Health Insurance Charges Predictor',
    subtitle: 'From data to a deployed, uncertainty-aware ML prediction system.',
    category: 'Production ML & Evaluation',
    domain: 'Healthcare Actuarial ML & Model Evaluation',
    featured: true,
    description:
      'Estimates annual health insurance charges using age, BMI, children, smoking status, sex, and region. Provides a calibrated 90% prediction interval with each estimate and flags lower-confidence predictions for stakeholder transparency.',
    highlights: [
      'Quantifies prediction uncertainty via 90% prediction intervals rather than opaque point estimates.',
      'Flags high-variance edge cases (e.g., elevated BMI combined with smoking status) for actuarial review.',
      'Deployed full-stack in Django on Render with automated input validation and evaluation guardrails.',
    ],
    metrics: [
      { label: 'R² Score', value: '0.8816' },
      { label: 'RMSE', value: '$4,665' },
      { label: 'MAE', value: '$2,402' },
      { label: 'Interval Coverage', value: '90% PI' },
    ],
    techStack: [
      'Python',
      'Pandas',
      'Scikit-learn',
      'Regression',
      'Data Validation',
      'Model Evaluation',
      'Django',
      'Deployment',
    ],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQcSaNkqyqmJwli4bKAb-UT_4CmjAafBNtZ3qSIpDFSCbdUo3s8YZE8GIW95v8LY4WJ6vM8FMpTk_vo3t9S3ejmYsluqfU3aV4hi2pVTTyqiZPm6wazu317kTAezOO02g5bteGWqyFCfAQ5d6fAqRC53ll46rkGGibjNSINSji0u4ztdCI9fjyxFfGwN3XohAsTxNk_D3ZRE-V2BNERLmaWmQPfTsmZXkMAwK4u_e0w=w1280',
    imageAlt: 'Health Insurance Charges Predictor deployed web interface and residual validation preview',
    links: {
      liveDemo: 'https://health-insurance-ml-project.onrender.com/',
      github: 'https://github.com/efapowertech042-ai/Health_Insurance_ML_Project',
    },
    interactiveType: 'insurance-simulator',
  },
  {
    id: 'discount-or-deceit',
    number: '02',
    title: 'Discount or Deceit? — Fraud & Margin Anomaly Clustering',
    subtitle: 'Unsupervised customer segmentation exposing regional discount abuse across 9,994 orders.',
    category: 'Fraud & Forecasting',
    domain: 'Fraud Detection & Unsupervised Clustering',
    description:
      'Customer segmentation model on 9,994 retail transactions (793 customers segmented by sales, profit, quantity, and discount behavior using Agglomerative Hierarchical Clustering). Exposed that all 300 maximum-discount (80%) orders originated exclusively from the Central region, driving the lowest regional profit at $39,706 and a 31.9% loss-making order rate.',
    highlights: [
      'Isolated 300 maximum-discount (80%) orders originating 100% from the Central region (24% regional avg discount).',
      'Identified 8 high-revenue customer accounts generating consistent net losses due to aggressive discounting.',
      'Delivered complete BI Fraud Report, executive presentation deck, and reproducible Python clustering notebook.',
    ],
    metrics: [
      { label: 'Transactions Analyzed', value: '9,994' },
      { label: 'Customers Segmented', value: '793' },
      { label: 'Central Region Profit', value: '$39,706' },
      { label: 'Central Loss Order Rate', value: '31.9%' },
    ],
    techStack: [
      'Python',
      'Hierarchical Clustering',
      'Fraud Detection',
      'Scikit-learn',
      'Pandas',
      'BI Fraud Report',
    ],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQff-9YIhhGXQ1LLqjXJqMkv3PbmTRP0TeBLqn19vlcHM2FjnIMdiTSz9XUUBWCJVFR2dHO_UIX2neWLW4JJLlsSRCUGwXJNyI1_FaNF76E6-XQqv4n4xgiMLRr9fQ_2u4Orr0PycQvhg83sY4dLSqtW4JKLg0fedF5Ej4rMLkcq95bwDVvC-P-sqq0-I5iylGvnSgA7DT9yPEChlWaehJb7qLcpOffDAVXzdkl1=w1280',
    imageAlt: 'Discount or Deceit Hierarchical Clustering fraud report banner',
    links: {
      github: 'https://github.com/efapowertech042-ai/Superstore_BI_Fraud_Report.git',
    },
    interactiveType: 'fraud-chart',
  },
  {
    id: 'global-retail-sales-intelligence',
    number: '03',
    title: 'Global Retail Sales Intelligence',
    subtitle: 'SQL feature engineering and Python ML pipelines for multi-store revenue forecasting.',
    category: 'Fraud & Forecasting',
    domain: 'Predictive Revenue & SQL Pipelines',
    description:
      'Data science, predictive modeling, and ML pipeline to analyze and forecast monthly revenue across products and stores while identifying key performance drivers. Combines SQL-based feature engineering with Python ML pipelines for inventory planning, product prioritization, and revenue optimization.',
    highlights: [
      'Engineered temporal lag, rolling average, and store-tier aggregations in SQL prior to ML ingestion.',
      'Evaluated forecasting error across product categories to prioritize safety-stock allocation.',
      'Unified exploratory sales diagnostics with automated revenue driver attribution.',
    ],
    metrics: [
      { label: 'Forecast Granularity', value: 'Monthly' },
      { label: 'Pipeline Scope', value: 'SQL + ML' },
      { label: 'Primary Focus', value: 'Inventory & Rev' },
    ],
    techStack: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'Revenue Forecasting'],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQeIu9UcLZ8-tme0_71OG_mr8_R_xZLPTsT4IULm39PDjAvzG4dMMU4Nax3YSbsTbFyM9QW-Wd1GNG98K7yKrR35GuD0m-KYMqbq_xvlCvU4tM0GDAKqHYByfo_jG7OJHZwvD31NdLkaLC_2dJR-A1c-nfmR10sXQ3E4LlU4psvY4PvqDshJ21Lq5vefnKuV2htuwTyavNHtVthoqBoaW9nI83FGDh2BwAdBILUQ=w1280',
    imageAlt: 'Global Retail Sales Intelligence predictive modeling architecture banner',
    links: {
      github: 'https://github.com/efapowertech042-ai/Global_Retail_Sales_Intelligence.git',
    },
  },
  {
    id: 'ai-data-jobs-salary-analysis',
    number: '04',
    title: 'AI & Data Jobs Salary Analysis (2020–2026)',
    subtitle: 'Compensation benchmarking and workforce planning across global AI and data roles.',
    category: 'BI & Tableau Dashboards',
    domain: 'Workforce Analytics & Compensation BI',
    description:
      'Comprehensive analysis of AI and Data job salaries (2020–2026) using SQL and Tableau, transforming raw job posting data into insights supporting compensation benchmarking and workforce planning.',
    highlights: [
      'Structured raw multi-year job posting schemas in SQL across seniority tiers, remote ratios, and geographies.',
      'Published an interactive Tableau Public workbook tracking compensation shifts through 2026.',
      'Surfaces role-by-experience pay bands for technical hiring managers and analytics teams.',
    ],
    metrics: [
      { label: 'Time Horizon', value: '2020–2026' },
      { label: 'Query Layer', value: 'SQL' },
      { label: 'Visualization', value: 'Tableau Public' },
    ],
    techStack: ['SQL', 'Tableau Public', 'Data Cleaning', 'Compensation Benchmarking'],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQfdMfY_bnKXcWyurfReCq-EQSGmNFfITkXh3IO59TrjgITLG0s7m1PvTkQgwoShaf9pPR0vtuFRz2SMVFcAcuFzEppwKwNBfuQlWkENe59lKpVcFXsiJi5B3-JoV2WeUdOR9jQmQZO0Eet4NDmlBmfJCTfUXEvkK3-g0xkjtpVwmMDyK_0Zm8zg0dPlFnUtC7znzM-aC1B2TiU4YImvyAbfBTxaSb4rHikPKIXNTts=w1280',
    imageAlt: 'AI and Data Jobs Salary Analysis 2020 to 2026 Tableau dashboard',
    links: {
      github: 'https://github.com/efapowertech042-ai/AI_Data_Jobs_Salary_Analysis.git',
      tableau: CANONICAL_URLS.tableauSalary,
    },
  },
  {
    id: 'sales-profit-performance-dashboard',
    number: '05',
    title: 'Sales & Profit Performance Dashboard',
    subtitle: 'Executive Tableau BI workbook with interactive year and category slicers.',
    category: 'BI & Tableau Dashboards',
    domain: 'Executive Sales & Margin Analytics',
    description:
      'Holistic BI dashboard analyzing sales performance and profitability dynamics across time periods, product categories, and sub-categories with interactive year and category slicers to isolate seasonality, market shifts, and strategic growth drivers.',
    highlights: [
      'Multi-year YoY comparison isolating seasonal demand spikes and sub-category margin compression.',
      'Interactive category and year slicers enabling instant executive drill-downs on Tableau Public.',
      'Highlights high-revenue / low-margin sub-categories requiring pricing or bundling intervention.',
    ],
    metrics: [
      { label: 'Dimensions', value: 'Year · Category' },
      { label: 'KPI Focus', value: 'Sales & Profit' },
      { label: 'Platform', value: 'Tableau Public' },
    ],
    techStack: ['Tableau Public', 'Business Intelligence', 'KPI Modeling', 'Slicer Architecture'],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQes2BznffC5jX0U0jPfJqDeeOxzbH5pH1xlPv2RtHdLupdblF77WDey0luh1KlEAnJoHbLROEXs4muw4tna31n6tZEWaJLwjnMU4-vYb4WR4zllgr1dRD-Y7JNmCxU4OlyZNBNVdto3Iop223WufBVHzTYA0wub2o_QAy6FYZGR76Y5BzqbbaXd1g6P8bPI_E8gSUQuwWxbFhboaX8BIqfo-xZCGp0G7UzV5w=w1280',
    imageAlt: 'Sales and Profit Performance Executive Tableau dashboard',
    links: {
      tableau: CANONICAL_URLS.tableauExecutiveSales,
    },
  },
  {
    id: 'logistics-financing-dashboard',
    number: '06',
    title: 'Logistics Financing Dashboard',
    subtitle: 'Revenue trend diagnostics and regional operational flow concentration analysis.',
    category: 'BI & Tableau Dashboards',
    domain: 'Logistics Finance & Operational BI',
    description:
      'Created to analyze revenue trends and provide a statistical view of which products generate the most revenue and which regions maximize operational flow.',
    highlights: [
      'Maps product-line revenue concentration against regional shipment and financing throughput.',
      'Surfaces seasonal logistics cash-flow bottlenecks and top-performing fulfillment corridors.',
      'Includes an interactive case-study breakdown of revenue-by-product and regional operational flow.',
    ],
    metrics: [
      { label: 'Focus', value: 'Revenue & Flow' },
      { label: 'Segmentation', value: 'Product × Region' },
      { label: 'Artifact', value: 'Interactive Study' },
    ],
    techStack: ['Power BI', 'Tableau', 'SQL', 'Logistics Analytics', 'Statistical Profiling'],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQfyXfVl9RINVSYzjnTXAsUCSjwWMCJv2MwGheZeW2tJRZFEmAAwGem4XmEMqjDGjE916JMarWoL_2X9Tc7YKZCnm5W8b-_V3VTfdmr_BYvWHwKz-Y6-CiFA8GfPV8dgY33LXChc2TeK9RaeRjfCe0pUhY54pDAiM-0t1z3k7H0MNPTvq5nCgAHfebcABXbzeE1cHjDkZSGnwsvmE6h5vc6gySBCVK5s6fzdWYp9=w1280',
    imageAlt: 'Logistics Financing Dashboard revenue trends and regional flow',
    links: {},
    interactiveType: 'logistics-modal',
  },
  {
    id: 'real-estate-sales-ratio-dashboard',
    number: '07',
    title: 'Real Estate Sales Ratio Dashboard',
    subtitle: 'Property tax equity analysis comparing assessed values against actual sale prices.',
    category: 'BI & Tableau Dashboards',
    domain: 'Public Sector & Real Estate Tax Equity',
    description:
      'Developed to analyze property sales trends, frequency distributions, and assessment ratios (comparing assessed property value to actual sale price across years) to give government stakeholders insight into property tax distribution and highlight regions with high rates of under-assessed properties.',
    highlights: [
      'Computes multi-year assessment-to-sale ratios to benchmark municipal property valuation accuracy.',
      'Isolates frequency distribution skews indicating systematic under-assessment across districts.',
      'Provides government finance stakeholders with actionable equity and reassessment targets.',
    ],
    metrics: [
      { label: 'Core Metric', value: 'Assessed / Sale' },
      { label: 'Distribution', value: 'Multi-Year' },
      { label: 'Stakeholder', value: 'Tax Equity' },
    ],
    techStack: ['Tableau', 'Power BI', 'SQL', 'Statistical Distributions', 'Public Policy BI'],
    imageUrl:
      'https://sites.google.com/sitesv-images-rt/APXyLQeIuqcwmrHZWKgd2UJjHvNhSTa_nYk-52cxYiZGZmYHZgTxp-DB8RXM_rMUVw73Wteprdes7Pzf_-zG6jvreNdeRsO1jHXrtboKPU2JLbvcooDtIy0U2QdoqYfdkUvBzh9TdJhO5keUE7Fh87l1OAPgwU2v6n6OM4Dg5VTkzXmh-vBKC6b9tUK3SJpWOoUrkKOQprk18vXML9j_is0BHpa8lRGkN88Y31S1qOMy=w1280',
    imageAlt: 'Real Estate Sales Ratio Dashboard tax assessment distribution',
    links: {},
    interactiveType: 'realestate-modal',
  },
];

export interface CompetencyPillar {
  id: string;
  pillar: string;
  competencies: string;
  proofSummary: string;
  targetCategory: ProjectCategory;
  targetSearch: string;
  linkedProjects: string[];
}

export const COMPETENCY_MATRIX: CompetencyPillar[] = [
  {
    id: 'ml-engineering',
    pillar: 'Machine Learning Engineering & Model Development',
    competencies:
      'End-to-end supervised pipelines, SQL feature engineering, cross-validation, regression & production Django/Render deployment.',
    proofSummary:
      'Health Insurance Charges Predictor (R² 0.8816) & Global Retail Sales Intelligence monthly revenue forecasting.',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: '',
    linkedProjects: ['Health Insurance Charges Predictor', 'Global Retail Sales Intelligence'],
  },
  {
    id: 'ai-evaluation',
    pillar: 'AI Evaluation & Model Performance Assessment',
    competencies:
      'Rigorous validation strategies, error analysis, model benchmarking, bias reduction, 90% prediction intervals & confidence flagging.',
    proofSummary:
      'Health Insurance Charges Predictor (R² 0.8816, RMSE $4,665, MAE $2,402, 90% PI & automated low-confidence flagging).',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: 'Insurance',
    linkedProjects: ['Health Insurance Charges Predictor'],
  },
  {
    id: 'unsupervised-fraud',
    pillar: 'Unsupervised Learning & Fraud/Anomaly Detection',
    competencies:
      'Agglomerative Hierarchical Clustering, customer segmentation, margin-erosion diagnostics & statistical anomaly isolation.',
    proofSummary:
      'Discount or Deceit? (9,994 orders / 793 customers; isolated all 300 max-discount 80% orders & 8 loss-making accounts in Central region).',
    targetCategory: 'Fraud & Forecasting',
    targetSearch: 'Discount',
    linkedProjects: ['Discount or Deceit?'],
  },
  {
    id: 'executive-bi',
    pillar: 'Business Intelligence & Executive Dashboards',
    competencies:
      'Tableau Public, Power BI, SQL querying, interactive slicers, compensation benchmarking & municipal tax ratio analysis.',
    proofSummary:
      'AI & Data Jobs Salary Analysis (2020–2026), Sales & Profit Performance, Logistics Financing & Real Estate Sales Ratio Dashboards.',
    targetCategory: 'BI & Tableau Dashboards',
    targetSearch: '',
    linkedProjects: [
      'AI & Data Jobs Salary Analysis (2020–2026)',
      'Sales & Profit Performance Dashboard',
      'Logistics Financing Dashboard',
      'Real Estate Sales Ratio Dashboard',
    ],
  },
];

export const REGIONAL_FRAUD_DATA = [
  {
    region: 'Central',
    orders: 2323,
    profit: 39706,
    avgDiscountPct: 24.0,
    maxDiscount80Orders: 300,
    lossOrderRatePct: 31.9,
    isAnomaly: true,
  },
  {
    region: 'East',
    orders: 2848,
    profit: 91523,
    avgDiscountPct: 14.5,
    maxDiscount80Orders: 0,
    lossOrderRatePct: 19.4,
    isAnomaly: false,
  },
  {
    region: 'South',
    orders: 1620,
    profit: 46749,
    avgDiscountPct: 14.7,
    maxDiscount80Orders: 0,
    lossOrderRatePct: 16.0,
    isAnomaly: false,
  },
  {
    region: 'West',
    orders: 3203,
    profit: 108418,
    avgDiscountPct: 10.9,
    maxDiscount80Orders: 0,
    lossOrderRatePct: 9.9,
    isAnomaly: false,
  },
];

export const LOGISTICS_STUDY_DATA = {
  regions: ['All Regions', 'North America Hub', 'EMEA Corridor', 'APAC Freight', 'LATAM Express'],
  products: [
    { name: 'Cold-Chain Medical Freight', revenueK: 1420, marginPct: 28.4, region: 'North America Hub', flowScore: 94 },
    { name: 'Priority Air Consolidation', revenueK: 1185, marginPct: 24.1, region: 'EMEA Corridor', flowScore: 89 },
    { name: 'Automated Port Cross-Docking', revenueK: 960, marginPct: 21.8, region: 'APAC Freight', flowScore: 92 },
    { name: 'Fleet Working-Capital Financing', revenueK: 845, marginPct: 31.2, region: 'North America Hub', flowScore: 86 },
    { name: 'Intermodal Rail Corridors', revenueK: 690, marginPct: 18.9, region: 'LATAM Express', flowScore: 78 },
  ],
  monthlyTrend: [
    { month: 'Jan', revenue: 390 },
    { month: 'Mar', revenue: 435 },
    { month: 'May', revenue: 472 },
    { month: 'Jul', revenue: 510 },
    { month: 'Sep', revenue: 548 },
    { month: 'Nov', revenue: 615 },
  ],
};

export const REAL_ESTATE_STUDY_DATA = {
  years: ['All Years', '2023', '2024', '2025'],
  districts: [
    {
      district: 'Metro Core District',
      medianRatio: 0.71,
      underAssessedShare: 64,
      medianSalePrice: 485000,
      medianAssessed: 344350,
      status: 'High Under-Assessment',
    },
    {
      district: 'Waterfront East',
      medianRatio: 0.76,
      underAssessedShare: 52,
      medianSalePrice: 620000,
      medianAssessed: 471200,
      status: 'Reassessment Priority',
    },
    {
      district: 'Suburban North',
      medianRatio: 0.91,
      underAssessedShare: 21,
      medianSalePrice: 360000,
      medianAssessed: 327600,
      status: 'Aligned Equity Band',
    },
    {
      district: 'Industrial Belt South',
      medianRatio: 0.84,
      underAssessedShare: 36,
      medianSalePrice: 295000,
      medianAssessed: 247800,
      status: 'Moderate Lag',
    },
  ],
  distributionBins: [
    { range: '0.50–0.65', count: 142, label: 'Severely Under-Assessed' },
    { range: '0.65–0.80', count: 298, label: 'Under-Assessed' },
    { range: '0.80–0.95', count: 410, label: 'Target Equity Band' },
    { range: '0.95–1.10', count: 185, label: 'Fair / Parity' },
    { range: '1.10+', count: 64, label: 'Over-Assessed' },
  ],
};

export const TECH_STACK_GROUPS = [
  {
    group: 'Python & ML Stack',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
  },
  {
    group: 'Data & Querying',
    items: ['SQL', 'Data Warehousing', 'Feature Engineering', 'Data Validation'],
  },
  {
    group: 'Business Intelligence',
    items: ['Tableau Public', 'Power BI', 'Excel', 'Executive KPI Design'],
  },
  {
    group: 'AI Evaluation & Deployment',
    items: ['Error Analysis', 'Benchmarking', 'Bias Reduction', 'Django', 'Render'],
  },
];
