type PCUsage =
  | "gaming"
  | "video-editing"
  | "3d-rendering"
  | "development"
  | "office"
  | "general";

interface PCBuilderRequest {
  budget: number;
  currency: string;
  location: string;
  usages: PCUsage[];
  additionalNotes?: string;
  preference: string;
  language: string
}

interface PCComponent {
  type: string;
  name: string;
  description: string;
  price: number;
  performanceNote: string;
  valueRating: number;
}

interface PCBuildRecommendation {
  summary: string;
  totalPrice: number;
  performanceRating: number;
  valueRating: number;
  components: PCComponent[];
  estimatedPerformance: {
    gaming?: string;
    productivity?: string;
    contentCreation?: string;
  };
  marketLocation: {
    name: string;
    address: string;
    popularFor: string;
    contact: string;
  };
  futureProofing: string;
  notes: string[];
  error?:string
}
