//Farm Class
class Farm {
    constructor(name, money, totalFarmValue) {
        this.name = name;
        this.money = money;
        this.totalFarmValue = totalFarmValue;
    }
    TotalFarmValue() {
        for (let i of productList) {
            this.totalFarmValue = this.totalFarmValue + i.price * i.number;
        }
        for (let i of productionList) {
            this.totalFarmValue = this.totalFarmValue + i.price * i.number;
        }
        this.totalFarmValue = Math.round(this.totalFarmValue * 100) / 100;
        return this.totalFarmValue;
    }
    ResetFarmValue() {
        this.totalFarmValue = 0;
    }
}
//Farm Object
const myFarm = new Farm("My Farm", 5000, 0);

//Animal Class
class Animals {
    constructor(name, number, price, consumptionCoefficient, productionCoefficient, productName) {
        this.name = name;
        this.number = number;
        this.price = price;
        this.lastPrice = 0;
        this.lastLastPrice = 0;

        this.consumptionCoefficient = consumptionCoefficient;
        this.productionCoefficient = productionCoefficient;
        this.productName = productName;
    }
    weeklyProduction(number, productionCoefficient) {
        return number * productionCoefficient;
    }
}
//Animal Objects
const cow = new Animals("Cow", 5, 800, 3, 3, "Milk");
const sheep = new Animals("Sheep", 10, 400, 2, 2, "Wool");
const chicken = new Animals("Chicken", 20, 50, 1, 1, "Egg");
const animalList = [cow, sheep, chicken];

//Plant Class
class Plants {
    constructor(name, number, price, consumptionCoefficient, productionCoefficient, productName) {
        this.name = name;
        this.number = number;
        this.price = price;
        this.lastPrice = 0;
        this.lastLastPrice = 0;

        this.consumptionCoefficient = consumptionCoefficient;
        this.productionCoefficient = productionCoefficient;
        this.productName = productName;
    }
    weeklyProduction(number, productionCoefficient) {
        return number * productionCoefficient;
    }
}
//Plant Objects
const cotton = new Plants("Cotton", 5, 600, 2, 1, "Fabric");
const wheat = new Plants("Wheat", 10, 250, 3, 3, "Fame");
const sunflower = new Plants("Sunflower", 10, 150, 1, 3, "Oil");
const plantList = [cotton, wheat, sunflower];

//Production Class
class Productions {
    constructor(name, number, price) {
        this.name = name;
        this.number = number;
        this.price = price;
        this.lastPrice = 0;
        this.lastLastPrice = 0;
    }
}
//Production Objects
const milk = new Plants("Milk", 0, 6);
const wool = new Plants("Wool", 0, 20);
const egg = new Plants("Egg", 0, 1.5);
const fabric = new Plants("Fabric", 0, 80);
const fame = new Plants("Fame", 0, 10);
const oil = new Plants("Oil", 0, 22);
const feed = new Plants("Feed", 500, 12);
const fertilizer = new Plants("Fertilizer", 500, 80);
const productionList = [milk, wool, egg, fabric, fame, oil, feed, fertilizer];

//Product Objects List
const productList = [cow, sheep, chicken, cotton, wheat, sunflower];