const view = (_: any, helpers: any) => {
  const { create: h } = helpers;
  return h('div.not-found', ['page not found']);
};

export { view };
