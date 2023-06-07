const styles: {
  container: string;
  flexBetween: string;
  flexCenter: string;
  flexStart: string;
  paddingX: string;
  paddingY: string;
  marginY: string;
} = {
  container: 'xl:max-w-[1440px] w-full',

  flexBetween: 'flex justify-between items-center',
  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-center items-start',

  paddingX: 'md:px-[90px] px-[16px]',
  paddingY: 'sm:py-5 py-16',

  marginY: 'sm:my-16 my-6',
};

export const layout: {
  section: string;
  sectionReverse: string;
  sectionImgReverse: string;
  sectionImg: string;
  sectionInfo: string;
} = {
  section: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row-reverse flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
