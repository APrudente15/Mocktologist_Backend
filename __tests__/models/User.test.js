const User = require('../../models/user');
const db = require('../../database/connect');

jest.mock('../../database/connect');

describe('User', () => {

    beforeEach(()=> jest.clearAllMocks())

    afterAll(()=> jest.clearAllMocks())

    describe('getAll', () => {
        it('should return all users available', async() => {
            jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
                rows:[{fname: 'u1', lname: 'u1', email: 'testEmail1', password: '1234', vegan: false, image:'img1'},{fname: 'u2', lname: 'u2', email: 'testEmail2', password: '1234', vegan: false, image:'img2'},{fname: 'u3', lname: 'u3', email: 'testEmail3', password: '1234', vegan: false, image:'img3'}]
            })

            const users = await User.getAll()
            
            expect(users).toHaveLength(3)
            expect(users[0]).toHaveProperty('id')    
        })
    })
});


