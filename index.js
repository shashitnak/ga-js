

class GA {
    constructor(DNA, N) {
        this.DNA = DNA;
        let population = [];
        try {
            for (let i = 0; i < N; i++) {
                population.push(new this.DNA());
            }
        } catch {
            console.log("Invalid DNA class");
            process.exit(1);
        }
        this.population = population;
    }

    pickOne() {
        let r = Math.random();
        let i;
        for (i = 0; i < this.probs.length; i++) {
            r -= this.probs[i];
            if (r < 0) break;
        }
        return this.population[i];
    }

    live() {
        let totalScore = 0;
        let bestScore = 0;
        let scores;
        try {
            scores = this.population.map(genome => {
                let score = genome.fitness();
                if (score > bestScore) {
                    bestScore = score;
                    this.fittest = genome;
                }
                totalScore += score;
                return score;
            });
        } catch {
            console.log("Did you put a fitness method in your DNA class?? IDIOT!!");
            process.exit(1);
        }
        this.probs = scores.map(x => x / totalScore);
    }

    displayFittest() {
        try {
            this.fittest.display();
        } catch {
            console.log("How am I supposed to display your DNA?");
            process.exit(1);
        }
    }

    naturalSelection() {
        let nextGeneration = [];
        try {
            for (let i = 0; i < this.population.length; i++) {
                let one = this.pickOne();
                let two = this.pickOne();
                nextGeneration.push(one.cross(two).mutate());
            }
        } catch {
            console.log("What about methods for crossover and mutation?");
            process.exit(1);
        }
        this.population = nextGeneration;
    }
}

module.exports = (DNA, N) => new GA(DNA, N);