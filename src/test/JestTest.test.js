describe("Tests", () => {
  jest.setTimeout(50000);

  const testLogin = `testLogin${(Math.random() + 1).toString(36).substring(10)}`;
  const testPassword = `testPassword${(Math.random() + 1).toString(36).substring(10)}`;

  beforeEach(async () => {
    await page.close();
    page = await context.newPage();
    await page.setViewport({
      width: 1400,
      height: 700,
    });
    await page.goto("http://localhost:8080");
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto("http://localhost:8080");
  });

  it("should load without error", async () => {
    const text = await page.evaluate(() => document.body.textContent);

    expect(text).toContain("Game Store");
  });

  it("Sign In click should open login form", async () => {
    const loginSelector = "#app > div > header > div > nav > ul > li:nth-child(4)"; // TODO
    await page.click(loginSelector);
    const text = await page.evaluate(() => document.body.textContent);

    expect(text).toContain("Authorization");
  });

  it("Admin should be able to login", async () => {
    const loginSelector = "#app > div > header > div > nav > ul > li:nth-child(4)";
    await page.click(loginSelector);
    await page.type('input[name="login"]', "admin");
    await page.type('input[name="password"]', "admin");
    await page.click("body > div:nth-child(3) > div > div > div.modal-body > div.form > div > div > button"); // TODO
    const text = await page.evaluate(() => document.body.textContent);

    expect(text).toContain("admin"); // TODO select from field
  });

  it("User should be able to sign up", async () => {
    const singUpSelector = "#app > div > header > div > nav > ul > li:nth-child(5)"; // TODO
    await page.click(singUpSelector);
    await page.type('input[name="login"]', testLogin);
    await page.type('input[name="password"]', testPassword);
    await page.type('input[name="repeat-password"]', testPassword);
    await page.click("body > div:nth-child(3) > div > div > div.modal-body > div.form > div > div > button"); // TODO

    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("Profile page"); // TODO select from field
  });

  it("Admin should be add to cart", async () => {
    const loginSelector = "#app > div > header > div > nav > ul > li:nth-child(4)";
    await page.click(loginSelector);
    await page.type('input[name="login"]', "admin");
    await page.type('input[name="password"]', "admin");
    await page.click("body > div:nth-child(3) > div > div > div.modal-body > div.form > div > div > button");

    const addProduct =
      "#app > div > main > div > div.grid_games > div:nth-child(1) > div > div.card-back.text > div > button";
    await page.click(addProduct);

    const cartLink = "#app > div > header > div > nav > ul > li:nth-child(5) > a";
    await page.click(cartLink);

    const text = await page.evaluate(() => document.body.textContent);

    expect(text).toContain("Your balance"); // TODO select from field
  });
});
