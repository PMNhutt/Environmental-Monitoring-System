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
  cardInstanceData: string;
  cardTimelyRisk: string;
  cardMobile: string;
  getStarted: string;

  introduction: string;
  introCard1: string;
  introCard2: string;
  introCard3: string;
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
    'Our advanced mobile platform for environmental monitoring revolutionizes orchid greenhouse management by providing a seamless interface to track and analyze crucial data in real-time, empowering greenhouse owners to optimize conditions, ensure optimal growth, and cultivate thriving orchids for a bountiful and beautiful harvest.',
  cardInstanceData:
    'Experience the benefits of real-time data monitoring for orchid greenhouses, enabling immediate insights and informed decision-making.',
  cardTimelyRisk:
    'Stay ahead of potential risks in your orchid greenhouse with our timely risk alerts. Our proactive system ensures that you receive immediate notifications.',
  cardMobile:
    'Our advanced mobile platform for environmental monitoring revolutionizes orchid greenhouse management by providing a seamless interface to track and analyze crucial data in real-time.',
  getStarted:
    'Experience transformative benefits with real-time environmental monitoring, empowering you to safeguard your orchid greenhouse with actionable insights for optimal well-being.',
  introduction:
    'A greenhouse provides an ideal environment for cultivating orchids, with precise control of climate, temperature, and humidity to suit each species. Popular orchid varieties include Dendrobium, Vanilla Orchid, Cattleya, Paphiopedilum, Phalaenopsis, and Oncidium, offering a rich assortment of colors and blooming times.',
  introCard1:
    'Classified into temperature categories based on their preferred temperature ranges for optimal growth and blooming. Understanding these temperature ranges helps suitable conditions for orchids health and flourishing.  Cool-growing orchids thrive in cooler environments, typically ranging from 15-21°C during the day and 10-13°C at night. Intermediate-growing orchids adapt to a broader range of climates, preferring temperatures around 21-27°C during the day and 13-18°C at night. Warm-growing orchids thrive in tropical regions, preferring temperatures around 27-32°C during the day and 18-21°C at night. ',
  introCard2: `Categorized into three groups based on preferred humidity levels. High-humidity, such as Phalaenopsis, Paphiopedilum, and Vanda, thrive in ranging from 60% to 70%. Moderate-humidity, including Cattleya, Oncidium, and Dendrobium, can tolerate levels of 50% to 60%. On the other hand, low-humidity like Cymbidium, Brassia, and Laelia are adapted to levels of 40% to 50%. It's important to note that these are general guidelines, and each orchid species may have its specific requirements. Therefore, it's advisable to research the specific humidity needs you are growing to provide them with the optimal conditions for their well-being.`,
  introCard3: `Light plays a crucial role in the growth and blooming. Divided into three groups based on their light preferences. High-light, such as Cattleya, Vanda, and Dendrobium, thrive in direct sunlight. Moderate-light, like Phalaenopsis, Oncidium, and Miltonia, prefer bright, indirect light. Low-light, including Paphiopedilum, Phragmipedium, and Ludisia, can adapt to lower light levels. Balancing the light exposure is important, as both excessive and insufficient light can harm orchid health. It's essential to observe each orchid's response and adjust the lighting accordingly while considering any specific species requirements.`,
};

export default defaultValue;
