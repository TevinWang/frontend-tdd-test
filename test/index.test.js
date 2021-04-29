import { getUserRating } from '../src/index';

// create a user with years an an active player
// games won, lost, draw
const createUser = (user = {}, games = {}) => {
    return Object.assign({
            username: 'chessman',
            yearsActive: 0,
            membershipLevel: 'free', // bronze, silver, gold
        },
        user, {
            games: Object.assign({
                won: 0,
                lost: 0,
                draw: 0,
                forfeited: 0,
            }, games),
        });
}

describe('getUserRating', () => {
    describe('Default functionality', () => {
        it('should return 0 if the user has no games, yearsActive, and has free membership', () => {
            const user = createUser();

            expect(getUserRating(user)).toEqual(0);
        });
    });

    describe('test score based on yearsActive', () => {
        it('a user should get 1 point for the first year active', () => {
            const user = createUser({
                yearsActive: 1,
            });

            expect(getUserRating(user)).toEqual(1);
        });
    });

    // membership status
    describe('test score based on membershipLevel', () => {
        it('should return 1 point for a user with a bronze membership', () => {
            const user = createUser({
                membershipLevel: 'bronze',
            });

            expect(getUserRating(user)).toEqual(1);
        });
    });


    describe('test score based on games', () => {
        // TODO: write tests to score based on user's games
        it('should return 8 points for a user with 3 wins 2 draws 1 loss 1 forfeit', () => {
            const user = createUser({}, {
                won: 3,
                draw: 2,
                lost: 1,
                forfeited: 1,
            });
            expect(getUserRating(user)).toEqual(8);
        });
        it('should return 1 point for a user with 2 wins 0 draws 1 loss 2 forfeit', () => {
            const user = createUser({}, {
                won: 2,
                draw: 0,
                lost: 1,
                forfeited: 2,
            });
            expect(getUserRating(user)).toEqual(1);
        });
        it('should return 10 points for a user with 15 wins 0 draws 15 losses 0 forfeit', () => {
            const user = createUser({}, {
                won: 5,
                draw: 0,
                lost: 3,
                forfeited: 0,
            });
            expect(getUserRating(user)).toEqual(12);
        });
    });

    // new feature
    it('give 1 extra point per 10 games played', () => {
        const user = createUser({}, {
            won: 3, // 9 points
            lost: 1, // -1 point 
            draw: 6, // + 6
        }); // + 1 for 10 games

        expect(getUserRating(user)).toBe(15);
    });
});