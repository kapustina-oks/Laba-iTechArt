import mockServerHelper from "webpack-mock-server/lib/mockServerHelper";

export const MenuItems = [
  {
    title: "PC",
    path: "pc",
    cName: "dropdown-link",
    id: mockServerHelper.getUniqueIdInt(),
  },
  {
    title: "Playstation 5",
    path: "playstation",
    cName: "dropdown-link",
    id: mockServerHelper.getUniqueIdInt(),
  },
  {
    title: "XBox One",
    path: "xbox",
    cName: "dropdown-link",
    id: mockServerHelper.getUniqueIdInt(),
  },
];
