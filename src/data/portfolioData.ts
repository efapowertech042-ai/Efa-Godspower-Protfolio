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
  caseStudy: {
    problem: string;
    architecture: string;
    impact: string;
  };
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
  linkedin: 'https://www.linkedin.com/in/efagodspower/',
  tableauSalary:
    'https://public.tableau.com/views/AI__Data_Jobs_Salary_Insights/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  tableauExecutiveSales:
    'https://public.tableau.com/views/ExecutiveSalesProject_17690269317490/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
};

export const CONTACT_INFO = {
  phone: '+2348023253332',
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
    caseStudy: {
      problem:
        'Point-only medical cost estimators obscure tail risk in high-variance smoker and elevated-BMI cohorts, exposing underwriters to unflagged pricing errors.',
      architecture:
        'Validated Pandas/Scikit-learn regression pipeline deployed via Django on Render with 90% prediction intervals and an automated low-confidence flag.',
      impact:
        'Achieved R² 0.8816 (RMSE $4,665 · MAE $2,402) on holdout evaluation while surfacing calibrated uncertainty bands in real time.',
    },
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
    imageUrl: '/assets/aistudio/unnamed_81a6a163.png',
    imageAlt:
      'Health Insurance Charges Predictor — ML workflow, Actual vs Predicted scatter plot, 90% confidence interval curve, and live Django prediction interface',
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
    caseStudy: {
      problem:
        'Aggregate revenue looked healthy while hidden discount overrides silently eroded regional net margins without clear account-level attribution.',
      architecture:
        'Agglomerative Hierarchical Clustering in Python/Scikit-learn profiling 793 accounts by sales, profit, quantity, and discount concentration.',
      impact:
        'Isolated all 300 maximum-discount (80%) orders exclusively in the Central region (31.9% loss rate, $39,706 profit, 8 loss-making accounts).',
    },
    techStack: [
      'Python',
      'Hierarchical Clustering',
      'Fraud Detection',
      'Scikit-learn',
      'Pandas',
      'BI Fraud Report',
    ],
    imageUrl: '/assets/aistudio/unnamed__1__254bb454.png',
    imageAlt:
      'Discount or Deceit? — Fraud & Margin Anomaly Clustering dashboard showing 9,994 orders, $2.30M revenue, 300 Central-region maximum-discount orders (Texas 200, Illinois 100), and top loss-making customers',
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
    caseStudy: {
      problem:
        'Multi-store retail planning suffered from fragmented SKU demand signals, causing overstock in slow tiers and stockouts on high-margin lines.',
      architecture:
        'SQL temporal lag & store-cluster feature engineering feeding Python XGBoost/Scikit-learn monthly revenue forecasting pipelines.',
      impact:
        'Aligned product-tier prioritization and safety-stock planning across stores with reproducible SQL-to-ML forecast driver attribution.',
    },
    techStack: ['Python', 'SQL', 'XGBoost', 'Pandas', 'NumPy', 'Scikit-learn', 'Revenue Forecasting'],
    imageUrl: '/assets/aistudio/unnamed__2__cc83c228.png',
    imageAlt:
      'Global Retail Sales Intelligence — Monthly revenue by store cluster, actual vs predicted revenue forecast, SQL-to-Python XGBoost ML pipeline, and store/product forecast KPIs',
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
    caseStudy: {
      problem:
        'Compensation benchmarks across remote vs. on-site AI/data roles shifted rapidly from 2020–2026, making hiring band calibration unreliable.',
      architecture:
        'SQL schema normalization and cohort aggregation connected to an interactive Tableau Public workbook with geographic and remote slicers.',
      impact:
        'Delivered live 2020–2026 global salary benchmarks ($110,865 market average, 33% remote share) supporting workforce budgeting.',
    },
    techStack: ['SQL', 'Tableau Public', 'Data Cleaning', 'Compensation Benchmarking'],
    imageUrl: '/assets/aistudio/unnamed_20a293e9.jpg',
    imageAlt:
      'AI & Data Jobs Salary Insights (2020–2026) Tableau dashboard showing $110,865 average market salary, 33% remote jobs share, industry comparison, 2020–2026 trend, and geographic map',
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
    caseStudy: {
      problem:
        'High top-line sub-categories masked negative profit margins and seasonal demand drops hidden inside static annual spreadsheets.',
      architecture:
        'Interactive Tableau Public executive workbook featuring dynamic year, segment, and category slicers over multi-year margin hierarchies.',
      impact:
        'Enabled one-click executive drill-downs exposing loss-making sub-categories (Tables -$8K, Machines -$3K) alongside top growth segments.',
    },
    techStack: ['Tableau Public', 'Business Intelligence', 'KPI Modeling', 'Slicer Architecture'],
    imageUrl: '/assets/aistudio/unnamed__5__7fb707a2.png',
    imageAlt:
      'Sales & Profit Performance Tableau Dashboard displaying Corporate ($241,848) and Home Office ($159,463) sales, segment monthly area trends, and Top 10 Sub-Category Sales and Profit bars',
    links: {
      tableau: CANONICAL_URLS.tableauExecutiveSales,
    },
  },
  {
    id: 'logistics-financing-dashboard',
    number: '06',
    title: 'Logistics Financing Dashboard',
    subtitle: 'Interactive Excel pivot dashboard analyzing revenue trends and regional operational flow.',
    category: 'BI & Tableau Dashboards',
    domain: 'Excel Pivot BI · Logistics Finance',
    description:
      'Built as an interactive Microsoft Excel pivot table and slicer dashboard to analyze revenue trends and provide a clear statistical view of which products generate the most revenue and which regions maximize operational flow.',
    highlights: [
      'Constructed multi-pivot Excel data models with interactive Year slicers (2021–2023) and KPI cards.',
      'Maps product-line revenue concentration against regional shipment throughput and delivery status breakdowns.',
      'Surfaces top-performing fulfillment corridors (led by Lagos) alongside cancelled and failed delivery bottlenecks.',
    ],
    metrics: [
      { label: 'Focus', value: 'Revenue & Flow' },
      { label: 'Segmentation', value: 'Product × Region' },
      { label: 'Platform', value: 'Excel Pivot' },
    ],
    caseStudy: {
      problem:
        'Logistics managers lacked visibility into which fulfillment regions and product lines drove working-capital efficiency versus order cancellations.',
      architecture:
        'Multi-pivot Microsoft Excel data model with dynamic 2021–2023 Year slicers, delivery-status breakdowns, and regional throughput cards.',
      impact:
        'Consolidated ₦3.18B revenue across 384.71K orders and 8 regions—pinpointing Lagos (₦1.74B) as the anchor fulfillment corridor.',
    },
    techStack: ['Microsoft Excel', 'Pivot Tables', 'Interactive Slicers', 'SQL', 'Logistics Analytics'],
    imageUrl: '/assets/aistudio/unnamed__3__9ad19672.png',
    imageAlt:
      'Logistics Financing Excel Pivot Dashboard showing ₦3.18B total revenue, 384.71K orders, 4.69K products, 8 regions led by Lagos, and order delivery status analytics',
    links: {},
    interactiveType: 'logistics-modal',
  },
  {
    id: 'real-estate-sales-ratio-dashboard',
    number: '07',
    title: 'Real Estate Sales Ratio Dashboard',
    subtitle: 'Excel pivot dashboard auditing assessed property values against actual sale prices.',
    category: 'BI & Tableau Dashboards',
    domain: 'Excel Pivot BI · Real Estate Tax Equity',
    description:
      'Developed as an interactive Microsoft Excel pivot table and slicer dashboard to analyze property sales trends, frequency distributions, and assessment ratios (comparing assessed property value to actual sale price across years) to give government stakeholders insight into property tax distribution and highlight districts with under-assessed properties.',
    highlights: [
      'Uses Excel Pivot Tables and year slicers (2020–2021) to benchmark municipal property valuation ratios.',
      'Isolates frequency distribution skews and property-type variances across Single Family, Condo, and Multi-Family sales.',
      'Provides government finance stakeholders with municipal sales ratio rankings for equitable reassessment targeting.',
    ],
    metrics: [
      { label: 'Core Metric', value: 'Assessed / Sale' },
      { label: 'Distribution', value: 'Multi-Year' },
      { label: 'Platform', value: 'Excel Pivot' },
    ],
    caseStudy: {
      problem:
        'Municipal tax rolls lagged true market appreciation, creating inequitable under-assessment across specific housing types and towns.',
      architecture:
        'Microsoft Excel Pivot Table & Slicer analytics auditing multi-year Assessed-to-Sale ratios across 57,966 property transactions.',
      impact:
        'Exposed an average 0.573 sales ratio ($481,018 avg sale) and ranked severely under-assessed municipalities (e.g., Hartford 0.355) for reassessment.',
    },
    techStack: ['Microsoft Excel', 'Pivot Tables', 'Interactive Slicers', 'SQL', 'Public Policy BI'],
    imageUrl: '/assets/aistudio/unnamed__4__b9d58e11.png',
    imageAlt:
      'Real Estate Sales Ratio Excel Pivot Dashboard showing $481,018 average price, 0.573 average sales ratio across 57,966 properties, municipal ratio pivot table, and property type breakdown',
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
      'Tableau Public, Excel Pivot & Slicer Dashboards, Power BI, SQL querying, compensation benchmarking & municipal tax ratio analysis.',
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
    items: ['Tableau Public', 'Microsoft Excel (Pivot Dashboards)', 'Power BI', 'Executive KPI Design'],
  },
  {
    group: 'AI Evaluation & Deployment',
    items: ['Error Analysis', 'Benchmarking', 'Bias Reduction', 'Django', 'Render'],
  },
];

export const CERTIFICATIONS = [
  {
    id: 'ncds-nebiant',
    title: 'Nebiant Certified Data Scientist (NCDS)',
    credentialType: 'Certificate of Completion',
    issuer: 'Nebiant Analytics',
    program: 'Data Science Programme',
    duration: '3 Months',
    completionDate: '21/03/2026',
    tools: [
      'Excel',
      'Statistics',
      'Tableau',
      'SQL',
      'Python',
      'Machine Learning',
      'Natural Language Processing (NLP)',
      'Exploratory Data Analysis',
      'GitHub',
    ],
    previewImageUrl: '/src/assets/images/nebiant_ncds_certificate.png',
  },
];
