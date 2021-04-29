export function getUserRating(user) {
    let rating = 0;

    rating += user.yearsActive;

    if (user.membershipLevel === 'free') {
        rating += 0;
    } else if (user.membershipLevel === 'gold') {
        rating += 3;
    } else if (user.membershipLevel === 'silver') {
        rating += 2;
    } else {
        rating += 1;
    }

    rating += user.games.won * 3;

    rating += user.games.draw;

    rating -= user.games.lost;

    if (user.membershipLevel !== 'gold') {
        rating -= user.games.forfeited * 2;
    }

    var totalGames = user.games.won + user.games.draw + user.games.lost + user.games.forfeited;
    rating += Math.floor(totalGames / 10);

    return rating;
}