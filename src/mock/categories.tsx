import mockServerHelper from "webpack-mock-server/lib/mockServerHelper";

export const categories = {
  pc: {
    id: mockServerHelper.getUniqueIdInt(),
    name: "pc",
    title: "PC",
    icons: "fab fa-windows",
  },
  playstation: {
    id: mockServerHelper.getUniqueIdInt(),
    name: "playstation",
    title: "playstation 5",
    icons: "fab fa-playstation",
  },
  xbox: {
    id: mockServerHelper.getUniqueIdInt(),
    name: "xbox",
    title: "Xbox",
    icons: "fab fa-xbox",
  },
};
