const User = require("../../models/user");
const db = require("../../database/connect");
const x = "hello";
// Mock the db object
jest.mock("../../database/connect", () => ({
  query: jest.fn(),
}));

describe("User", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.clearAllMocks());

  describe("getAll", () => {
    it("should return all users available", async () => {
      db.query.mockResolvedValueOnce({
        rows: [
          {
            fname: "u1",
            lname: "u1",
            email: "testEmail1",
            password: "1234",
            vegan: false,
            image: "img1",
          },
          {
            fname: "u2",
            lname: "u2",
            email: "testEmail2",
            password: "1234",
            vegan: false,
            image: "img2",
          },
          {
            fname: "u3",
            lname: "u3",
            email: "testEmail3",
            password: "1234",
            vegan: false,
            image: "img3",
          },
        ],
      });

      const users = await User.getAll();

      expect(users).toHaveLength(3);
      expect(users[0]).toHaveProperty("id");
    });

    it("should throw an Error on db query error", async () => {
      db.query.mockRejectedValueOnce(new Error("Unable to find users."));

      try {
        await User.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe("Unable to find users.");
      }
    });
  });
});

describe("getOneById", () => {
  it("gets one user on successful db query", async () => {
    let testUser = {
      fname: "Angelika",
      lname: "Prudente",
      email: "testEmail",
      password: "1234",
      vegan: false,
      image: "img7",
    };

    jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

    const result = await User.getOneById(1);

    expect(result).toEqual(testUser);
  });

  it("should throw an Error on db query error", async () => {
    jest.spyOn(db, "query").mockRejectedValueOnce(new Error("Unable to find user."));

    try {
      await User.getOneById(1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.message).toBe("Unable to find user.");
    }
  });
});

describe('create', () => {
  it('creates a user on successful db query', async () => {
    let userData = {       
    fname: "Riri",
    lname: "Smith",
    email: "testEmail",
    password: "4321",
    vegan: true,
    image: "img8",}
    jest.spyOn(db, 'query')
      .mockResolvedValueOnce({ rows: [{ ...userData, id: 1 }] });

    const result = await User.create(userData);
    
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('fname')
    expect(result).toHaveProperty('lname')
    expect(result).toHaveProperty('email')
    expect(result).toHaveProperty('password')
    expect(result).toHaveProperty('vegan')
    expect(result).toHaveProperty('image')
  })

  // it('should throw an Error on db query error', async () => {
  //   try {
  //     await User.create({ fname: "sugarPlum" })
  //   } catch (error) {
  //     expect(error).toBeTruthy()
  //     expect(error.message).toBe('age is missing')
  //   }
  // })
})

describe('update', () => {
  it('should return the updated user', async () => {
    const user = new User({      
      fname: "Sugar",
      lname: "Plum",
      email: "testEmail",
      password: "9876",
      vegan: true,
      image: "img10",})
    jest.spyOn(db, 'query')
      .mockResolvedValueOnce({ rows: [{ fname: "Plum",
      lname: "Sugar",
      email: "testEmail1",
      password: "7373",
      vegan: true,
      image: "img11" }] })

    const result = await user.update({fname: "Plum",
    lname: "Sugar",
    email: "testEmail1",
    password: "7373",
    vegan: true,
    image: "img11" })

    expect(result).toBeInstanceOf(User)
    expect(result.fname).toBe('Plum')
    expect(result.lname).toBe('Sugar')
    expect(result.email).toBe('testEmail1')
    expect(result.password).toBe('7373')
    expect(result.vegan).toBe(true)
    expect(result.image).toBe('img11')
    expect(result).not.toEqual(user)
  })

  // it('should throw an error if first name is missing', async () => {
  //   try {
  //     const user = new User({ fname: "Plum",
  //     lname: "Sugar",
  //     email: "testEmail1",
  //     password: "7373",
  //     vegan: true,
  //     image: "img11" })
  //     await user.update({ 
  //     lname: 'puppet', 
  //     email: "testEmail1",
  //     password: "7373",
  //     vegan: true,
  //     image: "img11" });
  //   } catch (error) {
  //     expect(error).toBeTruthy()
  //     expect(error.message).toBe('Missing Data!')
  // }
})
//})

describe("getOneByEmail", () => {
  it("gets one user by email on successful db query", async () => {
    let testUser = {
      fname: "Angelika",
      lname: "Prudente",
      email: "testEmail",
      password: "1234",
      vegan: false,
      image: "img7",
    };

    jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [testUser] });

    const result = await User.getOneByEmail(1);

    expect(result).toEqual(testUser);
  });

  it("should throw an Error on db query error", async () => {
    jest.spyOn(db, "query").mockRejectedValueOnce(new Error("Unable to find user."));

    try {
      await User.getOneByEmail(1);
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error.message).toBe("Unable to find user.");
    }
  });
});
