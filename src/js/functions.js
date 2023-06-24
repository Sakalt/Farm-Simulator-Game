//Pricing Function
function Pricing() {
    function getRandomCoefficient(min, max) {
        return Math.random() * (max - min) + min;
    }
    for (let i of animalList) {
        i.lastLastPrice = i.lastPrice;
        i.lastPrice = i.price;
        i.price = Math.round(i.price * getRandomCoefficient(0.97, 1.03) * 100) / 100;
    }
    for (let i of plantList) {
        i.lastLastPrice = i.lastPrice;
        i.lastPrice = i.price;
        i.price = Math.round(i.price * getRandomCoefficient(0.94, 1.07) * 100) / 100;
    }
    for (let i of productionList) {
        i.lastLastPrice = i.lastPrice;
        i.lastPrice = i.price;
        i.price = Math.round(i.price * getRandomCoefficient(0.9, 1.1) * 100) / 100;
    }
}

//Production Function
function Production() {
    milk.number = milk.number + cow.number * cow.productionCoefficient;
    wool.number = wool.number + sheep.number * sheep.productionCoefficient;
    egg.number = egg.number + chicken.number * chicken.productionCoefficient;
    fabric.number = fabric.number + cotton.number * cotton.productionCoefficient;
    fame.number = fame.number + wheat.number * wheat.productionCoefficient;
    oil.number = oil.number + sunflower.number * sunflower.productionCoefficient;
}

//Weekly Consumption
function WeeklyConsumption() {
    //Feed Consumption
    for (let i of animalList) {
        feed.number = feed.number - i.consumptionCoefficient * i.number;
    }
    if (feed.number < 0) {
        alert("Animal Feed is Low. If you dont buy feed in the marketplace. Next week your animals will die.");
        alert("1 Cow, 2 Sheep and 5 Chicken is dead.");
        cow.number = cow.number - 1;
        sheep.number = sheep.number - 2;
        chicken.number = chicken.number - 5;
        feed.number = 0;
    }
    for (let i of animalList) {
        if (i.number < 0) {
            i.number = 0;
        }
    }
    weeklyFeedConsumption = Math.floor(feed.number / (cow.number * cow.consumptionCoefficient + sheep.number * sheep.consumptionCoefficient + chicken.number * chicken.consumptionCoefficient));

    //Fertilizer Consumption
    for (let i of plantList) {
        fertilizer.number = fertilizer.number - i.consumptionCoefficient * i.number;
    }
    if (fertilizer.number < 0) {
        alert("Plant Fertilizer is Low. If you dont buy fertilizer in the marketplace. Next week your plants will fade.");
        alert("1 Cotton, 2 wheat and 2 sunflower is faded.");
        cotton.number = cotton.number - 1;
        wheat.number = wheat.number - 2;
        sunflower.number = sunflower.number - 2;
        fertilizer.number = 0;
    }
    for (let i of plantList) {
        if (i.number < 0) {
            i.number = 0;
        }
    }
    weeklyFertilizerConsumption = Math.floor(fertilizer.number / (cotton.number * cotton.consumptionCoefficient + wheat.number * wheat.consumptionCoefficient + sunflower.number * sunflower.consumptionCoefficient));
}

//Marketplace Buy Function
function MarketplaceBuy() {
    if (MarketplaceBuyForm.value < 1) {
        alert("Must be bigger than zero");
    } else {
        if (Number(MarketplaceBuyForm.value) > Math.floor((myFarm.money - productList[Number(MarketplaceBuySelect.value)].price) * Number(MarketplaceBuyForm.value))) {
            alert("Money not enough.");
        } else {
            myFarm.money -= Number(MarketplaceBuyForm.value) * productList[Number(MarketplaceBuySelect.value)].price;
            productList[Number(MarketplaceBuySelect.value)].number += Number(MarketplaceBuyForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

//Marketplace Sell Function
function MarketplaceSell() {
    if (MarketplaceSellForm.value < 1) {
        alert("Must be bigger than zero");
    } else {
        if (Number(MarketplaceSellForm.value) > productList[Number(MarketplaceSellSelect.value)].number) {
            alert("Product Item not enough.");
        } else {
            myFarm.money += Number(MarketplaceSellForm.value) * productList[Number(MarketplaceSellSelect.value)].price;
            productList[Number(MarketplaceSellSelect.value)].number -= Number(MarketplaceSellForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

//Supermarket Buy Function
function SupermarketBuy() {
    if (SupermarketBuyForm.value < 1) {
        alert("Must be bigger than zero");
    } else {
        if (Number(SupermarketBuyForm.value) > Math.floor((myFarm.money - productionList[Number(SupermarketBuySelect.value)].price) * Number(SupermarketBuyForm.value))) {
            alert("Money not enough.");
        } else {
            myFarm.money -= Number(SupermarketBuyForm.value) * productionList[Number(SupermarketBuySelect.value)].price;
            productionList[Number(SupermarketBuySelect.value)].number += Number(SupermarketBuyForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

//Supermarket Sell Function
function SupermarketSell() {
    if (SupermarketSellForm.value < 1) {
        alert("Must be bigger than zero");
    } else {
        if (Number(SupermarketSellForm.value) > productionList[Number(SupermarketSellSelect.value)].number) {
            alert("Production Item not enough.");
        } else {
            myFarm.money += Number(SupermarketSellForm.value) * productList[Number(SupermarketSellSelect.value)].price;
            productionList[Number(SupermarketSellSelect.value)].number -= Number(SupermarketSellForm.value);
            ClearAllItems();
            DisplayAllItems();
        }
    }
}

//All Items Displayed to the Window
function DisplayAllItems() {
    //Weekly Production Table
    let x = 1;
    for (let i of animalList) {
        WeeklyProductionAnimal.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${x++}</th>
                <td>${i.name}</td>
                <td>${i.number}</td>
                <td>${i.weeklyProduction(i.number, i.productionCoefficient) + " " + i.productName}</td>
            </tr>`
        );
    }
    for (let i of plantList) {
        WeeklyProductionPlant.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${x++}</th>
                <td>${i.name}</td>
                <td>${i.number}</td>
                <td>${i.weeklyProduction(i.number, i.productionCoefficient) + " " + i.productName}</td>
            </tr>`
        );
    }

    //Inventory Table
    let y = 1;
    for (let i of productionList) {
        Inventory.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${y++}</th>
                <td>${i.name}</td>
                <td>${i.number}</td>
            </tr>`
        );
    }

    //Statistics Table
    myFarm.totalFarmValue = 0;
    TotalFarmValue.innerHTML = myFarm.TotalFarmValue();
    Money.innerHTML = myFarm.money;
    WeekCounter.innerText = `${week} week`;
    week++;
    FeedConsumption.innerHTML = `${weeklyFeedConsumption} week`;
    FertilizerConsumption.innerHTML = `${weeklyFertilizerConsumption} week`;

    //Prices Table
    let z = 1;
    for (let i of productList) {
        ProductionPrices.insertAdjacentHTML(
            "beforeend",
            `<tr>
                <th scope="row">${z++}</th>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>${i.lastPrice}</td>
                <td>${i.lastLastPrice}</td>
            </tr>`
        );
    }
    let k = 1;
    for (let i of productionList) {
        ProductPrices.insertAdjacentHTML(
            "beforeend",
            `<tr>
            <th scope="row">${k++}</th>
                <td>${i.name}</td>
                <td>${i.price}</td>
                <td>${i.lastPrice}</td>
                <td>${i.lastLastPrice}</td>
             </tr>`
        );
    }

    //Marketplace Table
    //Buy
    let l = 0;
    for (let i of productList) {
        MarketplaceBuySelect.insertAdjacentHTML("beforeend", `<option value="${l}">${i.name}</option>`);
        l++;
    }
    //Sell
    let m = 0;
    for (let i of productList) {
        MarketplaceSellSelect.insertAdjacentHTML("beforeend", `<option value="${m}">${i.name}</option>`);
        m++;
    }
    //Supermarket Table
    //Buy
    let n = 0;
    for (let i of productionList) {
        SupermarketBuySelect.insertAdjacentHTML("beforeend", `<option value="${n}">${i.name}</option>`);
        n++;
    }
    //Sell
    let p = 0;
    for (let i of productionList) {
        SupermarketSellSelect.insertAdjacentHTML("beforeend", `<option value="${p}">${i.name}</option>`);
        p++;
    }
}

//All Items Clearing every week before the DisplayAllItems() function.
function ClearAllItems() {
    WeeklyProductionAnimal.innerHTML = "";
    WeeklyProductionPlant.innerHTML = "";
    Inventory.innerHTML = "";
    ProductionPrices.innerHTML = "";
    ProductPrices.innerHTML = "";
    MarketplaceBuySelect.innerHTML = "";
    MarketplaceSellSelect.innerHTML = "";
    SupermarketBuySelect.innerHTML = "";
    SupermarketSellSelect.innerHTML = "";
    MarketplaceBuyForm.value = 0;
    MarketplaceSellForm.value = 0;
    SupermarketBuyForm.value = 0;
    SupermarketSellForm.value = 0;
}

//All Function is here. and Triggered by NextWeek button
function NextWeek() {
    Pricing();
    Production();
    WeeklyConsumption();
    ClearAllItems();
    DisplayAllItems();
}
NextWeek();