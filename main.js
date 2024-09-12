
class Participant {
    constructor(name, maxRunDistance, maxJumpHeight) {
        this.name = name;
        this.maxRunDistance = maxRunDistance; 
        this.maxJumpHeight = maxJumpHeight; 
    }

    run(distance) {
        if (distance <= this.maxRunDistance) {
            console.log(`${this.name} пробіг ${distance} метрів.`);
            return true;
        } else {
            console.log(`${this.name} не зміг пробігти ${distance} метрів.`);
            return false;
        }
    }

    jump(height) {
        if (height <= this.maxJumpHeight) {
            console.log(`${this.name} стрибнув на висоту ${height} метрів.`);
            return true;
        } else {
            console.log(`${this.name} не зміг стрибнути на висоту ${height} метрів.`);
            return false;
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
        console.log(`Учасник ${participant.name} намагається пройти ${this.name} довжиною ${this.length} метрів.`);
        if (participant.run(this.length)) {
            console.log(`Учасник ${participant.name} пройшов ${this.name} довжиною ${this.length} метрів.`);
        } else {
            console.log(`Учасник ${participant.name} не пройшов ${this.name} довжиною ${this.length} метрів.`);
        }
    }
}


class Wall extends Obstacle {
    constructor(height) {
        super('Стіна');
        this.height = height;
    }

    pass(participant) {
        console.log(`Учасник ${participant.name} намагається пройти ${this.name} заввишки ${this.height} метрів.`);
        if (participant.jump(this.height)) {
            console.log(`Учасник ${participant.name} пройшов ${this.name} заввишки ${this.height} метрів.`);
        } else {
            console.log(`Учасник ${participant.name} не пройшов ${this.name} заввишки ${this.height} метрів.`);
        }
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
    participants.forEach(participant => {
        let passedAll = true;
        
        obstacles.forEach(obstacle => {
            if (passedAll) {
                obstacle.pass(participant);
                if (!obstacle.pass(participant)) {
                    passedAll = false;
                    console.log(`Учасник ${participant.name} вибув.`);
                }
            }
        });
    });
}


makeParticipantsRunThroughObstacles(participants, obstacles);
