
const fs = require('fs');


class Participant {
    constructor(name, maxRunDistance, maxJumpHeight) {
        this.name = name;
        this.maxRunDistance = maxRunDistance; 
        this.maxJumpHeight = maxJumpHeight; 
    }

    run(distance) {
        if (distance <= this.maxRunDistance) {
            return `${this.name} пробіг ${distance} метрів.`;
        } else {
            return `${this.name} не зміг пробігти ${distance} метрів.`;
        }
    }

    jump(height) {
        if (height <= this.maxJumpHeight) {
            return `${this.name} стрибнув на висоту ${height} метрів.`;
        } else {
            return `${this.name} не зміг стрибнути на висоту ${height} метрів.`;
        }
    }
}


class Human extends Participant {
    constructor(name) {
        super(name, 100, 2); 
    }
}


class Cat extends Participant {
    constructor(name) {
        super(name, 50, 1); 
    }
}

// Реалізація Робот
class Robot extends Participant {
    constructor(name) {
        super(name, 200, 3); 
    }
}


class Obstacle {
    constructor(name) {
        this.name = name;
    }

    pass(participant) {
        throw new Error('Метод pass не реалізовано.');
    }
}

class RunningTrack extends Obstacle {
    constructor(length) {
        super('Бігова доріжка');
        this.length = length;
    }

    pass(participant) {
        const result = participant.run(this.length);
        return result.includes('не зміг') ?
            `${result} Не пройдено ${this.name}.` :
            `${result} Пройдено ${this.name} довжиною ${this.length} метрів.`;
    }
}

class Wall extends Obstacle {
    constructor(height) {
        super('Стіна');
        this.height = height;
    }

    pass(participant) {
        const result = participant.jump(this.height);
        return result.includes('не зміг') ?
            `${result} Не пройдено ${this.name}.` :
            `${result} Пройдено ${this.name} заввишки ${this.height} метрів.`;
    }
}

const participants = [
    new Human('Олег'),
    new Cat('Мурзик'),
    new Robot('R2D2')
];

const obstacles = [
    new RunningTrack(100), 
    new Wall(2)            
];

function makeParticipantsRunThroughObstacles(participants, obstacles) {
    const results = [];

    participants.forEach(participant => {
        let passedAll = true;
        
        obstacles.forEach(obstacle => {
            if (passedAll) {
                const result = obstacle.pass(participant);
                results.push(result);
                if (result.includes('не пройдено')) {
                    passedAll = false;
                    results.push(`Учасник ${participant.name} вибув.`);
                }
            }
        });
    });

    fs.writeFile('results.txt', results.join('\n'), (err) => {
        if (err) {
            console.error('Не вдалося записати результати у файл:', err);
        } else {
            console.log('Результати записані у файл results.txt');
        }
    });
}

makeParticipantsRunThroughObstacles(participants, obstacles);
