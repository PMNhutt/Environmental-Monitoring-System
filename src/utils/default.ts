const defaultValue: {
  pageSize: number;
  ITEM_HEIGHT: number;
  ITEM_PADDING_TOP: number;
  MenuProps: any;

  // static content type
  heroSectionDescription: string;
  featureInstaneData: string;
  featureTimelyRisk: string;
  featureMobile: string;
  getStarted: string;
} = {
  pageSize: 12,
  ITEM_HEIGHT: 48,
  ITEM_PADDING_TOP: 8,
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  },

  // static content
  heroSectionDescription:
    'Enhance your orchid greenhouse with our advanced system, offering cost-effective and efficient environmental monitoring. Our solution empowers you to analyze real-time data, enabling sustainable cultivation and growth of exquisite orchids.',
  featureInstaneData:
    'Experience the benefits of real-time data monitoring for orchid greenhouses, enabling immediate insights and informed decision-making. Maximize your greenhouse productivity by effortlessly tracking and optimizing vital environmental data with our comprehensive monitoring solution.',
  featureTimelyRisk:
    'Stay ahead of potential risks in your orchid greenhouse with our timely risk alerts. Our proactive system ensures that you receive immediate notifications, allowing you to respond promptly to any potential hazards and safeguard the health and growth of your precious orchids.',
  featureMobile:
    'Experience the benefits of real-time data monitoring for orchid greenhouses, enabling immediate insights and informed decision-making. Maximize your greenhouse productivity by effortlessly tracking and optimizing vital environmental data with our comprehensive monitoring solution.',
  getStarted:
    'Experience transformative benefits with real-time environmental monitoring, empowering you to safeguard your orchid greenhouse with actionable insights for optimal well-being.',
};

export default defaultValue;
