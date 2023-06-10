const defaultValue: {
  pageSize: number;
  ITEM_HEIGHT: number;
  ITEM_PADDING_TOP: number;
  MenuProps: any;
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
};

export default defaultValue;
